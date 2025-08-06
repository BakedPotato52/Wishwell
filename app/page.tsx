"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"
import { toast } from "sonner"
import { Download, Smartphone, Star, TrendingUp, Zap, Gift, ShoppingBag, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { Carousel } from "@/components/ui/carousel"
import { CategoryGrid } from "@/components/category-grid"
import { adImages } from "@/lib/data"
import { categories } from "@/lib/categoryData"
import CategoryCarousel from "@/components/category-carousel"
import { ParagraphText, PlaywriteStylizedText } from "@/components/elements/animated-text"
import { getSubcategoryImage } from "@/lib/subcategoryImages"
import AccessoriesCategory from "@/components/accessories-category"

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
        <DialogContent className="max-w-sm radius-lg p-6 bg-white shadow-lg">
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
  const men = categories.find((c) => c.name === "Men")
  const women = categories.find((c) => c.name === "Women")
  const category = categories.find((c) => c.name === "Grocery & Kitchen")
  const homeCategory = categories.find((c) => c.name === "Household Essentials")
  const snacksCategory = categories.find((c) => c.name === "Snacks & Drinks")
  const beautyCategory = categories.find((cat) => cat.name === "Beauty & Personal care")

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
      .replace(/&/g, "and")
      .replace(/,/g, "")
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "")
  }


  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen bg-gradient-to-b from-blue-50/30 to-white"
    >
      {/* PWA Components */}
      <div className="container mx-auto px-4 pt-4">
        <InstallPrompt />
      </div>

      {/* Hero Carousel */}
      <section className="container mx-auto px-4 pb-2">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
          className="rounded-2xl overflow-hidden shadow-xl"
        >
          <Carousel />
        </motion.div>
      </section>

      {/* Enhanced Advertisement Section */}
      <section className="container mx-auto px-4 py-2">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="relative w-full h-32 md:h-36 lg:h-40 rounded-2xl overflow-hidden shadow-2xl border-4 border-white"
        >
          {adImages.map((slide, index) => (
            <div
              key={slide.id}
              className={`absolute inset-0 transition-all duration-1000 ${index === currentSlide ? "opacity-100 scale-100" : "opacity-0 scale-105"
                }`}
            >
              <Image src={slide.image || "/placeholder.svg"} alt={slide.alt} fill className="object-cover" priority />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
            </div>
          ))}
          {adImages.length > 1 && (
            <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2">
              {adImages.map((_, index) => (
                <button
                  key={index}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${index === currentSlide ? "bg-white scale-125" : "bg-white/50 hover:bg-white/75"
                    }`}
                  onClick={() => setCurrentSlide(index)}
                />
              ))}
            </div>
          )}
        </motion.div>
      </section>

      {/* Categories with enhanced styling */}
      <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}>
        <CategoryGrid />
      </motion.div>

      {/* Trending Badge */}
      <section className="container mx-auto px-4 py-2 select-none">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.6 }}
          className="flex items-center justify-center gap-2 mb-4"
        >
          <Badge
            variant="secondary"
            className="bg-gradient-to-r from-green-500 to-emerald-500 text-white px-4 py-2 text-sm font-semibold"
          >
            <TrendingUp className="w-4 h-4 mr-2" />
            Trending Categories
          </Badge>
        </motion.div>
      </section>

      {/* Category Carousel Women */}
      <section className="container mx-auto px-4 py-2">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
        >
          <CategoryCarousel category={women} />
        </motion.div>
      </section>

      {/* Category Carousel Men */}
      <section className="container mx-auto px-4 py-2">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
        >
          <CategoryCarousel category={men} />
        </motion.div>
      </section>

      <section className="container mx-auto px-4 py-2">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
        >
          <AccessoriesCategory />
        </motion.div>
      </section>

      {/* Enhanced Beauty Category Section */}
      {beautyCategory && (
        <section className="container mx-auto px-4 py-4">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 1.3 }}
            className="flex items-center justify-between mb-2"
          >
            <div>
              <PlaywriteStylizedText className="text-2xl md:text-3xl font-bold bg-gradient-to-r  from-blue-600 via-sky-400 to-cyan-600 mb-2">
                {beautyCategory.name}
              </PlaywriteStylizedText> <br />
              <PlaywriteStylizedText className="text-gray-600 text-sm">Satisfy your cravings anytime</PlaywriteStylizedText>
            </div>
            <Button variant="outline" size="sm" className="hidden md:flex bg-transparent">
              View All
              <ArrowRight className="w-4 h-4 ml-1" />
            </Button>
          </motion.div>

          <div className="grid grid-cols-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
            {beautyCategory.subcategories?.map((subcategory, index) => {
              const slug = createSlug(subcategory)
              const imageUrl = getSubcategoryImage(subcategory, beautyCategory.name)
              return (
                <motion.div
                  key={subcategory}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.4 + index * 0.05 }}
                >
                  <Link href={`/subcategory/${slug}`}>
                    <motion.div
                      whileHover={{ scale: 1.05, y: -5 }}
                      whileTap={{ scale: 0.95 }}
                      transition={{ duration: 0.2, ease: "easeInOut" }}
                      className="bg-white rounded-2xl p-4 flex flex-col items-center justify-center transition-all duration-300  group"
                    >
                      <div className="w-16 h-16 flex items-center justify-center bg-gradient-to-br from-purple-100 to-pink-100 rounded-xl mb-3 group-hover:from-purple-200 group-hover:to-pink-200 transition-all duration-300">
                        <Image
                          src={imageUrl || "/placeholder.svg"}
                          alt={subcategory}
                          width={64}
                          height={64}
                          className="object-contain w-16 h-16 group-hover:scale-110 transition-transform duration-300"
                        />
                      </div>
                    </motion.div>
                    <ParagraphText className="text-center text-base font-medium text-gray-800 leading-snug group-hover:text-purple-700 transition-colors">
                      {subcategory.length > 20 ? `${subcategory.slice(0, 20)}...` : subcategory}
                    </ParagraphText>
                  </Link>
                </motion.div>
              )
            })}
          </div>
        </section>
      )}

      {/* Enhanced Grocery & Kitchen Section */}
      {category && (
        <section className="container mx-auto px-4 py-4">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 1.3 }}
            className="flex items-center justify-between mb-2"
          >
            <div>
              <PlaywriteStylizedText className="text-2xl md:text-3xl font-bold bg-gradient-to-r  from-blue-600 via-sky-400 to-cyan-600 mb-2">
                {category.name}
              </PlaywriteStylizedText> <br />
              <PlaywriteStylizedText className="text-gray-600 text-sm">Satisfy your cravings anytime</PlaywriteStylizedText>
            </div>
            <Button variant="outline" size="sm" className="hidden md:flex bg-transparent">
              View All
              <ArrowRight className="w-4 h-4 ml-1" />
            </Button>
          </motion.div>

          <div className="grid grid-cols-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
            {category.subcategories?.map((subcategory, index) => {
              const slug = createSlug(subcategory)
              const imageUrl = getSubcategoryImage(subcategory, category.name)
              return (
                <motion.div
                  key={subcategory}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.4 + index * 0.05 }}
                >
                  <Link href={`/subcategory/${slug}`}>
                    <motion.div
                      whileHover={{ scale: 1.05, y: -5 }}
                      whileTap={{ scale: 0.95 }}
                      transition={{ duration: 0.2, ease: "easeInOut" }}
                      className="bg-white rounded-2xl p-4 flex flex-col items-center justify-center transition-all duration-300  group"
                    >
                      <div className="w-16 h-16 flex items-center justify-center bg-gradient-to-br from-green-100 to-emerald-100 rounded-xl mb-3 group-hover:from-green-200 group-hover:to-emerald-200 transition-all duration-300">
                        <Image
                          src={imageUrl || "/placeholder.svg"}
                          alt={subcategory}
                          width={64}
                          height={64}
                          className="object-contain w-16 h-16 group-hover:scale-110 transition-transform duration-300"
                        />
                      </div>
                    </motion.div>
                    <ParagraphText className="text-center text-base font-medium text-gray-800 leading-snug group-hover:text-green-700 transition-colors">
                      {subcategory.length > 20 ? `${subcategory.slice(0, 20)}...` : subcategory}
                    </ParagraphText>
                  </Link>
                </motion.div>
              )
            })}
          </div>
        </section>
      )}

      {/* Enhanced Snacks & Drinks Section */}
      {snacksCategory && (
        <section className="container mx-auto px-4 py-4">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 1.3 }}
            className="flex items-center justify-between mb-2"
          >
            <div>
              <PlaywriteStylizedText className="text-2xl md:text-3xl font-bold bg-gradient-to-r  from-blue-600 via-sky-400 to-cyan-600 mb-2">
                {snacksCategory.name}
              </PlaywriteStylizedText> <br />
              <PlaywriteStylizedText className="text-gray-600 text-sm">Satisfy your cravings anytime</PlaywriteStylizedText>
            </div>
            <Button variant="outline" size="sm" className="hidden md:flex bg-transparent">
              View All
              <ArrowRight className="w-4 h-4 ml-1" />
            </Button>
          </motion.div>

          <div className="grid grid-cols-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
            {snacksCategory.subcategories?.map((subcategory, index) => {
              const slug = createSlug(subcategory)
              const imageUrl = getSubcategoryImage(subcategory, snacksCategory.name)
              return (
                <motion.div
                  key={subcategory}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.4 + index * 0.05 }}
                >
                  <Link href={`/subcategory/${slug}`}>
                    <motion.div
                      whileHover={{ scale: 1.05, y: -5 }}
                      whileTap={{ scale: 0.95 }}
                      transition={{ duration: 0.2, ease: "easeInOut" }}
                      className="bg-white rounded-2xl p-4 flex flex-col items-center justify-center transition-all duration-300  group"
                    >
                      <div className="w-16 h-16 flex items-center justify-center bg-gradient-to-br from-purple-100 to-pink-100 rounded-xl mb-3 group-hover:from-purple-200 group-hover:to-pink-200 transition-all duration-300">
                        <Image
                          src={imageUrl || "/placeholder.svg"}
                          alt={subcategory}
                          width={64}
                          height={64}
                          className="object-contain w-16 h-16 group-hover:scale-110 transition-transform duration-300"
                        />
                      </div>
                    </motion.div>
                    <ParagraphText className="text-center text-base font-medium text-gray-800 leading-snug group-hover:text-purple-700 transition-colors">
                      {subcategory.length > 20 ? `${subcategory.slice(0, 20)}...` : subcategory}
                    </ParagraphText>
                  </Link>
                </motion.div>
              )
            })}
          </div>
        </section>
      )}

      {/* Enhanced Household Essentials Section */}
      {homeCategory && (
        <section className="container mx-auto px-4 py-4 ">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 1.8 }}
            className="flex items-center justify-between mb-2"
          >
            <div>
              <PlaywriteStylizedText className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-blue-600 via-sky-400 to-cyan-600 mb-2">
                {homeCategory.name}
              </PlaywriteStylizedText> <br />
              <PlaywriteStylizedText className="text-gray-600 text-sm">Everything you need for your home</PlaywriteStylizedText>
            </div>
            <Button variant="outline" size="sm" className="hidden md:flex bg-transparent">
              View All
              <ArrowRight className="w-4 h-4 ml-1" />
            </Button>
          </motion.div>

          <div className="grid grid-cols-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
            {homeCategory.subcategories?.map((subcategory, index) => {
              const slug = createSlug(subcategory)
              const imageUrl = getSubcategoryImage(subcategory, homeCategory.name)
              return (
                <motion.div
                  key={subcategory}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.9 + index * 0.05 }}
                >
                  <Link href={`/subcategory/${slug}`}>
                    <motion.div
                      whileHover={{ scale: 1.05, y: -5 }}
                      whileTap={{ scale: 0.95 }}
                      transition={{ duration: 0.2, ease: "easeInOut" }}
                      className="bg-white rounded-2xl p-4 flex flex-col items-center justify-center transition-all duration-300 group"
                    >
                      <div className="w-16 h-16 flex items-center justify-center bg-gradient-to-br from-blue-100 to-cyan-100 rounded-xl mb-3 group-hover:from-blue-200 group-hover:to-cyan-200 transition-all duration-300">
                        <Image
                          src={imageUrl || "/placeholder.svg"}
                          alt={subcategory}
                          width={64}
                          height={64}
                          className="object-contain w-16 h-16 group-hover:scale-110 transition-transform duration-300"
                        />
                      </div>
                    </motion.div>
                    <ParagraphText className="text-center text-base font-medium text-gray-800 leading-snug group-hover:text-blue-700 transition-colors">
                      {subcategory.length > 20 ? `${subcategory.slice(0, 20)}...` : subcategory}
                    </ParagraphText>
                  </Link>
                </motion.div>
              )
            })}
          </div>
        </section>
      )}

      {/* Bottom CTA Section */}
      <section className="container mx-auto px-4 py-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2.2 }}
          className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 rounded-2xl p-8 text-center text-white shadow-2xl"
        >
          <h3 className="text-2xl font-bold mb-3">Ready to Start Shopping?</h3>
          <p className="text-lg opacity-90 mb-6">Join thousands of happy customers and discover amazing deals</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" variant="secondary" className="bg-white text-purple-600 hover:bg-gray-100 font-semibold">
              <ShoppingBag className="w-5 h-5 mr-2" />
              Browse All Categories
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-white text-white hover:bg-white hover:text-purple-600 bg-transparent"
              onClick={() => {
                toast.info("To install the app, look for the install prompt or check your browser's menu for 'Install App' option.")
              }}
            >
              Download App
              <Download className="w-5 h-5 ml-2" />
            </Button>
          </div>
        </motion.div>
      </section>
    </motion.div>
  )
}

