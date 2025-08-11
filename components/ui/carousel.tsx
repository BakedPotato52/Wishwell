"use client"

import { useState, useEffect, useRef } from "react"
import Image from "next/image"
import { bannerImages } from "@/lib/data"
import { motion, useMotionValue, useTransform, PanInfo } from "framer-motion"

export function Carousel() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isDragging, setIsDragging] = useState(false)
  const autoPlayRef = useRef<NodeJS.Timeout>()
  const x = useMotionValue(0)
  const xInput = [-100, 0, 100]
  const background = useTransform(x, xInput, [
    `linear-gradient(90deg, #ff008c 0%, #ffcd1e 100%)`,
    `linear-gradient(90deg, #21d4fd 0%, #b721ff 100%)`,
    `linear-gradient(90deg, #fcff9e 0%, #c67700 100%)`
  ])

  const startAutoPlay = () => {
    if (bannerImages.length <= 1) return
    autoPlayRef.current = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % bannerImages.length)
    }, 5000)
  }

  const stopAutoPlay = () => {
    if (autoPlayRef.current) {
      clearInterval(autoPlayRef.current)
    }
  }

  useEffect(() => {
    startAutoPlay()
    return () => stopAutoPlay()
  }, [bannerImages.length])

  const handleDragStart = () => {
    setIsDragging(true)
    stopAutoPlay()
  }

  const handleDragEnd = (event: any, info: PanInfo) => {
    setIsDragging(false)

    const threshold = 50
    if (info.offset.x > threshold && currentSlide > 0) {
      setCurrentSlide(currentSlide - 1)
    } else if (info.offset.x < -threshold && currentSlide < bannerImages.length - 1) {
      setCurrentSlide(currentSlide + 1)
    } else if (info.offset.x < -threshold && currentSlide === bannerImages.length - 1) {
      setCurrentSlide(0)
    } else if (info.offset.x > threshold && currentSlide === 0) {
      setCurrentSlide(bannerImages.length - 1)
    }

    setTimeout(() => {
      startAutoPlay()
    }, 500)
  }

  const goToSlide = (index: number) => {
    setCurrentSlide(index)
    stopAutoPlay()
    setTimeout(() => {
      startAutoPlay()
    }, 500)
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.4 }}
      className="relative w-full aspect-[16/9] rounded-2xl overflow-hidden shadow-2xl border-4 border-white cursor-grab active:cursor-grabbing"
      drag="x"
      dragConstraints={{ left: 0, right: 0 }}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      style={{ x }}
    >
      {bannerImages.map((slide, index) => (
        <div
          key={slide.id}
          className={`absolute ${background} inset-0 transition-all duration-500 ${index === currentSlide ? "opacity-100 scale-100" : "opacity-0 scale-105"
            }`}

        >
          <Image
            src={slide.image || "/placeholder.svg"}
            alt={slide.alt}
            fill
            className="object-cover pointer-events-none"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent pointer-events-none" />
        </div>
      ))}

      {bannerImages.length > 1 && (
        <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2 pointer-events-none">
          {bannerImages.map((_, index) => (
            <button
              key={index}
              className={`w-2 h-2 rounded-full transition-all duration-300 pointer-events-auto ${index === currentSlide ? "bg-white scale-125" : "bg-white/50 hover:bg-white/75"
                }`}
              onClick={() => goToSlide(index)}
            />
          ))}
        </div>
      )}
    </motion.div>
  )
}
