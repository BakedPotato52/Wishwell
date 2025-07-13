"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"
import { toast } from "sonner"
import { Download, Smartphone } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog"
import { Carousel } from "@/components/ui/carousel"
import { CategoryGrid } from "@/components/category-grid"
import { adImages } from "@/lib/data"
import { categories } from "@/lib/categoryData"

function InstallPrompt() {
  const [isIOS, setIsIOS] = useState(false)
  const [isStandalone, setIsStandalone] = useState(false)
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null)
  const [isInstallable, setIsInstallable] = useState(false)
  const [hasReloaded, setHasReloaded] = useState(false)

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
      if (!hasReloaded) {
        setHasReloaded(true)
        window.location.reload()
      }
    }

    window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt)
    window.addEventListener("appinstalled", handleAppInstalled)

    return () => {
      window.removeEventListener("beforeinstallprompt", handleBeforeInstallPrompt)
      window.removeEventListener("appinstalled", handleAppInstalled)
    }
  }, [hasReloaded])

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
    return null
  }

  return (
    <div>
      <Dialog open={isInstallable} onOpenChange={setIsInstallable}>
        <DialogTitle asChild>
          <span className="sr-only">Install App</span>
        </DialogTitle>
        <DialogContent className="max-w-sm">
          <div className="flex items-center gap-2 mb-3">
            <Smartphone className="w-4 h-4" />
            <h3 className="font-semibold">Install App</h3>
          </div>
          <div className="space-y-3"></div>
          <p className="text-sm text-muted-foreground">
            Install our app for a better experience. You can access it directly from your home screen, just like a
            native app.
          </p>
          <Button onClick={handleInstallClick} size="sm" className="w-full" variant="default">
            <Download className="w-4 h-4 mr-2" />
            {isIOS && !deferredPrompt ? "Add to Home Screen" : "Install App"}
          </Button>
          {isIOS && !deferredPrompt && (
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
        </DialogContent>
      </Dialog>
    </div>
  )
}

export default function HomePage() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const category = categories.find((c) => c.name === "Grocery & Kitchen")

  useEffect(() => {
    if (adImages.length <= 1) return
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % adImages.length)
    }, 5000)
    return () => clearInterval(interval)
  }, [adImages.length])

  // Create slug from subcategory name
  const createSlug = (name: string) => {
    return name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "")
  }

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="min-h-screen">
      {/* PWA Components */}
      <div className="container mx-auto px-4 pt-4">
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

      {/* Grocery & Kitchen Subcategories */}
      {category && (
        <section className="container mx-auto px-4 py-6">
          <h2 className="text-xl md:text-2xl font-bold mb-4">{category.name}</h2>
          <div className="grid grid-cols-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-2 md:gap-4">
            {category.subcategories?.map((subcategory) => {
              const slug = createSlug(subcategory)
              return (
                <Link key={subcategory} href={`/subcategory/${slug}`}>
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="p-2 md:p-4 bg-white rounded-lg shadow hover:shadow-lg transition-all duration-200 cursor-pointer group"
                  >
                    <div className="flex flex-col items-center text-center">
                      <div className="relative mb-2 md:mb-3 overflow-hidden rounded-lg">
                        <Image
                          src={category.image || "/placeholder.svg"}
                          alt={subcategory}
                          width={70}
                          height={70}
                          className="w-12 h-12 md:w-16 md:h-16 object-cover bg-sky-300 rounded-lg group-hover:scale-110 transition-transform duration-200"
                        />
                      </div>
                      <h3 className="text-xs md:text-sm font-semibold leading-tight line-clamp-2 group-hover:text-blue-600 transition-colors">
                        {subcategory}
                      </h3>
                    </div>
                  </motion.div>
                </Link>
              )
            })}
          </div>
        </section>
      )}
    </motion.div>
  )
}
