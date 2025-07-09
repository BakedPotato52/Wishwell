"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { motion } from "framer-motion"
import { toast } from "sonner"
import { Bell, BellOff, Download, Smartphone } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Carousel } from "@/components/ui/carousel"
import { CategoryGrid } from "@/components/category-grid"
import { ProductGrid } from "@/components/product-grid"
import { products } from "@/lib/productData"
import { adImages } from "@/lib/data"
import { subscribeUser, unsubscribeUser, sendNotification } from "./actions"

function urlBase64ToUint8Array(base64String: string) {
  const padding = "=".repeat((4 - (base64String.length % 4)) % 4)
  const base64 = (base64String + padding).replace(/-/g, "+").replace(/_/g, "/")
  const rawData = window.atob(base64)
  const outputArray = new Uint8Array(rawData.length)
  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i)
  }
  return outputArray
}

function PushNotificationManager() {
  const [isSupported, setIsSupported] = useState(false)
  const [subscription, setSubscription] = useState<PushSubscription | null>(null)
  const [message, setMessage] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    if ("serviceWorker" in navigator && "PushManager" in window) {
      setIsSupported(true)
      registerServiceWorker()
    }
  }, [])

  async function registerServiceWorker() {
    try {
      const registration = await navigator.serviceWorker.register("/sw.js", {
        scope: "/",
        updateViaCache: "none",
      })
      const sub = await registration.pushManager.getSubscription()
      setSubscription(sub)
    } catch (error) {
      console.error("Service worker registration failed:", error)
      toast.error("Failed to register service worker")
    }
  }

  async function subscribeToPush() {
    setIsLoading(true)
    try {
      const registration = await navigator.serviceWorker.ready
      const sub = await registration.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: urlBase64ToUint8Array(process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY!),
      })
      setSubscription(sub)
      const serializedSub = JSON.parse(JSON.stringify(sub))
      await subscribeUser(serializedSub)
      toast.success("Successfully subscribed to notifications!")
    } catch (error) {
      console.error("Push subscription failed:", error)
      toast.error("Failed to subscribe to notifications")
    } finally {
      setIsLoading(false)
    }
  }

  async function unsubscribeFromPush() {
    setIsLoading(true)
    try {
      await subscription?.unsubscribe()
      setSubscription(null)
      await unsubscribeUser()
      toast.success("Successfully unsubscribed from notifications")
    } catch (error) {
      console.error("Unsubscribe failed:", error)
      toast.error("Failed to unsubscribe from notifications")
    } finally {
      setIsLoading(false)
    }
  }

  async function sendTestNotification() {
    if (!message.trim()) {
      toast.error("Please enter a message")
      return
    }

    setIsLoading(true)
    try {
      await sendNotification(message)
      toast.success("Test notification sent!")
      setMessage("")
    } catch (error) {
      console.error("Send notification failed:", error)
      toast.error("Failed to send notification")
    } finally {
      setIsLoading(false)
    }
  }

  if (!isSupported) {
    return null
  }

  return (
    <Card className="mb-4">
      <CardContent className="p-4">
        <div className="flex items-center gap-2 mb-3">
          <Bell className="w-4 h-4" />
          <h3 className="font-semibold">Push Notifications</h3>
        </div>

        {subscription ? (
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-sm text-green-600">
              <Bell className="w-4 h-4" />
              <span>You're subscribed to notifications</span>
            </div>

            <div className="flex gap-2">
              <Input
                type="text"
                placeholder="Enter test message..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="flex-1"
              />
              <Button onClick={sendTestNotification} disabled={isLoading} size="sm">
                Send Test
              </Button>
            </div>

            <Button
              variant="outline"
              onClick={unsubscribeFromPush}
              disabled={isLoading}
              size="sm"
              className="w-full bg-transparent"
            >
              <BellOff className="w-4 h-4 mr-2" />
              Unsubscribe
            </Button>
          </div>
        ) : (
          <div className="space-y-3">
            <p className="text-sm text-muted-foreground">Get notified about new products and offers</p>
            <Button onClick={subscribeToPush} disabled={isLoading} size="sm" className="w-full">
              <Bell className="w-4 h-4 mr-2" />
              Subscribe to Notifications
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  )
}

function InstallPrompt() {
  const [isIOS, setIsIOS] = useState(false)
  const [isStandalone, setIsStandalone] = useState(false)
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null)
  const [isInstallable, setIsInstallable] = useState(false)

  useEffect(() => {
    setIsIOS(/iPad|iPhone|iPod/.test(navigator.userAgent) && !(window as any).MSStream)
    setIsStandalone(window.matchMedia("(display-mode: standalone)").matches)

    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault()
      setDeferredPrompt(e)
      setIsInstallable(true)
    }

    const handleAppInstalled = () => {
      setDeferredPrompt(null)
      setIsInstallable(false)
      toast.success("App installed successfully!")
    }

    window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt)
    window.addEventListener("appinstalled", handleAppInstalled)

    return () => {
      window.removeEventListener("beforeinstallprompt", handleBeforeInstallPrompt)
      window.removeEventListener("appinstalled", handleAppInstalled)
    }
  }, [])

  const handleInstallClick = async () => {
    if (!deferredPrompt) {
      if (isIOS) {
        toast.info("To install: Tap Share → Add to Home Screen", {
          duration: 5000,
        })
      } else {
        toast.error("Install prompt not available")
      }
      return
    }

    try {
      deferredPrompt.prompt()
      const { outcome } = await deferredPrompt.userChoice

      if (outcome === "accepted") {
        toast.success("App will be installed!")
      } else {
        toast.info("Installation cancelled")
      }

      setDeferredPrompt(null)
      setIsInstallable(false)
    } catch (error) {
      console.error("Install failed:", error)
      toast.error("Installation failed")
    }
  }

  if (isStandalone) {
    return null // Don't show install button if already installed
  }

  return (
    <Card className="mb-4">
      <CardContent className="p-4">
        <div className="flex items-center gap-2 mb-3">
          <Smartphone className="w-4 h-4" />
          <h3 className="font-semibold">Install App</h3>
        </div>

        <div className="space-y-3">
          <p className="text-sm text-muted-foreground">
            Install our app for a better experience with offline access and push notifications
          </p>

          <Button
            onClick={handleInstallClick}
            size="sm"
            className="w-full"
            variant={isInstallable ? "default" : "outline"}
          >
            <Download className="w-4 h-4 mr-2" />
            {isInstallable ? "Install App" : "Add to Home Screen"}
          </Button>

          {isIOS && !isInstallable && (
            <div className="text-xs text-muted-foreground bg-muted p-2 rounded">
              <p className="font-medium mb-1">iOS Installation:</p>
              <p>
                1. Tap the Share button <span className="font-mono">⎋</span>
              </p>
              <p>
                2. Select "Add to Home Screen" <span className="font-mono">➕</span>
              </p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}

export default function HomePage() {
  const [currentSlide, setCurrentSlide] = useState(0)

  useEffect(() => {
    if (adImages.length <= 1) return
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % adImages.length)
    }, 5000)
    return () => clearInterval(interval)
  }, [adImages.length])

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="min-h-screen">
      {/* PWA Components */}
      <div className="container mx-auto px-4 pt-4">
        <PushNotificationManager />
        <InstallPrompt />
      </div>

      {/* Hero Carousel */}
      <section className="container mx-auto px-4 pb-2">
        <div className="rounded-lg overflow-hidden">
          <Carousel />
        </div>
      </section>

      {/* Advertisement Section */}
      <section className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative w-full h-24 md:h-28 lg:h-32 rounded-xl overflow-hidden shadow"
        >
          {adImages.map((slide, index) => (
            <div
              key={slide.id}
              className={`absolute inset-0 transition-opacity duration-1000 ${index === currentSlide ? "opacity-100" : "opacity-0"
                }`}
            >
              <Image src={slide.image || "/placeholder.svg"} alt={slide.alt} fill className="object-cover" priority />
            </div>
          ))}
          {adImages.length > 1 && (
            <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2">
              {adImages.map((_, index) => (
                <button
                  key={index}
                  className={`w-2 h-2 rounded-full transition-colors ${index === currentSlide ? "bg-white" : "bg-white/50"
                    }`}
                  onClick={() => setCurrentSlide(index)}
                />
              ))}
            </div>
          )}
        </motion.div>
      </section>

      {/* Categories - Desktop only, mobile has horizontal nav */}
      <CategoryGrid />

      {/* Featured Products */}
      <ProductGrid products={products.slice(0, 8)} title="Featured Products" />
    </motion.div>
  )
}
