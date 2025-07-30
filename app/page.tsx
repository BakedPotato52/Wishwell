"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"
import { toast } from "sonner"
import { Download, MapPin, Smartphone } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog"
import { Carousel } from "@/components/ui/carousel"
import { CategoryGrid } from "@/components/category-grid"
import { adImages } from "@/lib/data"
import { categories } from "@/lib/categoryData"
// import { updateUser } from "@/lib/firebase/firestore" // Add Firebase config
// import { useAuth } from "@/contexts/auth-context"

// interface LocationData {
//   latitude: number
//   longitude: number
//   timestamp: number
//   accuracy?: number
// }

// function LocationHandler() {
//   const [locationStatus, setLocationStatus] = useState<'idle' | 'requesting' | 'success' | 'error'>('idle')
//   const { firebaseUser } = useAuth()
//   const requestLocation = async () => {
//     if (!navigator.geolocation) {
//       toast.error("Geolocation is not supported by this browser")
//       return
//     }

//     setLocationStatus('requesting')

//     navigator.geolocation.getCurrentPosition(
//       async (position) => {
//         try {
//           const locationData: LocationData = {
//             latitude: position.coords.latitude,
//             longitude: position.coords.longitude,
//             timestamp: Date.now(),
//             accuracy: position.coords.accuracy
//           }
//           let userId = firebaseUser?.uid
//           if (!userId) {
//             throw new Error("User not authenticated")
//           }
//           // Store location in Firebase
//           await updateUser(userId, {
//             address: locationData,
//             createdAt: new Date(),
//             userAgent: navigator.userAgent
//           })

//           setLocationStatus('success')
//           toast.success("Location saved successfully!")
//         } catch (error) {
//           console.error("Error saving location:", error)
//           setLocationStatus('error')
//           toast.error("Failed to save location")
//         }
//       },
//       (error) => {
//         setLocationStatus('error')
//         let errorMessage = "Location access denied"

//         switch (error.code) {
//           case error.PERMISSION_DENIED:
//             errorMessage = "Location access denied by user"
//             break
//           case error.POSITION_UNAVAILABLE:
//             errorMessage = "Location information unavailable"
//             break
//           case error.TIMEOUT:
//             errorMessage = "Location request timed out"
//             break
//         }

//         toast.error(errorMessage)
//       },
//       {
//         enableHighAccuracy: true,
//         timeout: 10000,
//         maximumAge: 60000
//       }
//     )
//   }

//   useEffect(() => {
//     // Auto-request location on component mount
//     requestLocation()
//   }, [])

//   return (
//     <div className="mb-4">
//       {locationStatus === 'requesting' && (
//         <div className="flex items-center gap-2 text-sm text-muted-foreground">
//           <MapPin className="w-4 h-4 animate-pulse" />
//           <span>Getting your location...</span>
//         </div>
//       )}

//       {locationStatus === 'error' && (
//         <Button
//           onClick={requestLocation}
//           size="sm"
//           variant="outline"
//           className="flex items-center gap-2"
//         >
//           <MapPin className="w-4 h-4" />
//           Enable Location
//         </Button>
//       )}
//     </div>
//   )
// }

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
  const homeCategory = categories.find((c) => c.name === "Household Essentials")
  const snacksCategory = categories.find((c) => c.name === "Snacks & Drinks")


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
        <section className="container mx-auto px-4 py-8">
          <h1 className="text-3xl md:text-4xl font-semibold text-gray-800 mb-8 tracking-tight">{category.name}</h1>
          <div className="grid grid-cols-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-2 md:gap-4">
            {category.subcategories?.map((subcategory) => {
              const slug = createSlug(subcategory)
              return (
                <Link key={subcategory} href={`/subcategory/${slug}`}>
                  <motion.div
                    whileHover={{
                      scale: 1.03,
                      boxShadow: "0 8px 25px rgba(0, 0, 0, 0.1)",
                    }}
                    whileTap={{ scale: 0.97 }}
                    transition={{
                      duration: 0.2,
                      ease: "easeInOut",
                    }}
                    className=" rounded-xl p-2 cursor-pointer shadow-sm hover:shadow-md transition-all duration-200 aspect-square flex flex-col"
                  >
                    <div className="flex flex-col items-center text-center">
                      <div className="relative mb-2 md:mb-3 overflow-hidden rounded-lg">
                        <Image
                          src={category.image || "/placeholder.svg"}
                          alt={subcategory}
                          width={70}
                          height={70}
                          className="w-12 h-12 md:w-16 md:h-16 object-cover bg-[#F4F0E6] rounded-lg group-hover:scale-110 transition-transform duration-200"
                        />
                      </div>

                    </div>
                    <div className="text-center overflow-hidden">
                      <h3 className="text-sm md:text-base font-medium text-gray-700 leading-tight px-1">
                        {subcategory.slice(0, 14)}{subcategory.length > 14 ? "..." : ""}
                      </h3>
                    </div>
                  </motion.div>
                </Link>
              )
            })}
          </div>
        </section>
      )}

      {homeCategory && (
        <section className="container mx-auto px-4 py-8">
          <h1 className="text-3xl md:text-4xl font-semibold text-gray-800 mb-8 tracking-tight">{homeCategory.name}</h1>
          <div className="grid grid-cols-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-2 md:gap-4">
            {homeCategory.subcategories?.map((subcategory) => {
              const slug = createSlug(subcategory)
              return (
                <Link key={subcategory} href={`/subcategory/${slug}`}>
                  <motion.div
                    whileHover={{
                      scale: 1.03,
                      boxShadow: "0 8px 25px rgba(0, 0, 0, 0.1)",
                    }}
                    whileTap={{ scale: 0.97 }}
                    transition={{
                      duration: 0.2,
                      ease: "easeInOut",
                    }}
                    className=" rounded-xl p-2 cursor-pointer shadow-sm hover:shadow-md transition-all duration-200 aspect-square flex flex-col"
                  >
                    <div className="flex flex-col items-center text-center">
                      <div className="relative mb-2 md:mb-3 overflow-hidden rounded-lg">
                        <Image
                          src={homeCategory.image || "/placeholder.svg"}
                          alt={subcategory}
                          width={70}
                          height={70}
                          className="w-12 h-12 md:w-16 md:h-16 object-cover bg-[#F4F0E6] rounded-lg group-hover:scale-110 transition-transform duration-200"
                        />
                      </div>

                    </div>
                    <div className="text-center">
                      <h3 className="text-sm md:text-base font-medium text-gray-700 leading-tight px-1">
                        {subcategory.slice(0, 14)}{subcategory.length > 14 ? "..." : ""}
                      </h3>
                    </div>
                  </motion.div>
                </Link>
              )
            })}
          </div>
        </section>
      )}

      {snacksCategory && (
        <section className="container mx-auto px-4 py-4">
          <h1 className="text-3xl md:text-4xl font-semibold text-gray-800 mb-6 tracking-tight">{snacksCategory.name}</h1>
          <div className="grid grid-cols-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-2 ">
            {snacksCategory.subcategories?.map((subcategory) => {
              const slug = createSlug(subcategory)
              return (
                <Link key={subcategory} href={`/subcategory/${slug}`}>
                  <motion.div
                    whileHover={{
                      scale: 1.03,
                      boxShadow: "0 8px 25px rgba(0, 0, 0, 0.1)",
                    }}
                    whileTap={{ scale: 0.97 }}
                    transition={{
                      duration: 0.2,
                      ease: "easeInOut",
                    }}
                    className=" rounded-xl p-2 md:p-4 cursor-pointer shadow-sm hover:shadow-md transition-all duration-200 aspect-square flex flex-col"
                  >
                    <div className="flex-1 flex items-center justify-center mb-2 md:mb-4 relative">
                      <div className="relative w-full h-full flex items-center justify-center">
                        <Image
                          src={snacksCategory.image || "/placeholder.svg"}
                          alt={subcategory}
                          width={70}
                          height={70}
                          className="w-12 h-12 md:w-16 md:h-16 object-cover bg-[#F4F0E6] rounded-lg group-hover:scale-110 transition-transform duration-200"
                        />
                      </div>
                    </div>
                    <div className="text-center">
                      <h4 className="text-sm md:text-base font-medium text-gray-700 leading-tight px-1">
                        {subcategory.slice(0, 14)}{subcategory.length > 14 ? "..." : ""}
                      </h4>
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
