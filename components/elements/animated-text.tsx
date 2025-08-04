"use client"

import type React from "react"

import { motion } from "framer-motion"
import { cn } from "@/lib/utils"
import { Pacifico } from "next/font/google"
import { Michroma } from "next/font/google"
import { Zain } from "next/font/google"

const pacifico = Pacifico({
    subsets: ["latin"],
    weight: ["400"],
    variable: "--font-pacifico",
})

const michroma = Michroma({
    subsets: ["latin"],
    weight: ["400"],
    variable: "--font-michroma",
})

const zain = Zain({
    subsets: ["latin"],
    weight: ["400"],
    variable: "--font-zain",
})

export const fadeUpVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: (i: number) => ({
        opacity: 1,
        y: 0,
        transition: {
            duration: 1,
            delay: 0.5 + i * 0.2,
            ease: [0.25, 0.1, 0.25, 1],
        },
    }),
}

export function AnimatedHeading({
    children,
    className,
    index = 0,
    gradient
}: {
    children: React.ReactNode
    className?: string
    index?: number
    gradient?: string
}) {
    return (
        <motion.h2
            custom={index}
            initial="hidden"
            animate="visible"
            className={cn(
                `text-3xl md:text-4xl font-bold ${gradient} bg-clip-text text-transparent`,
                className,
            )}
        >
            {children}
        </motion.h2>
    )
}

export function AnimatedText({
    children,
    className,
    index = 0,
}: {
    children: React.ReactNode
    className?: string
    index?: number
}) {
    return (
        <motion.p
            custom={index}
            initial="hidden"
            animate="visible"
            className={cn("text-lg text-white/60", className)}
        >
            {children}
        </motion.p>
    )
}

export function StylizedText({
    children,
    className,
}: {
    children: React.ReactNode
    className?: string
}) {
    return (
        <span
            className={cn(
                "bg-clip-text text-transparent bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600",
                pacifico.className,
                className,
            )}
        >
            {children}
        </span>
    )
}

export function PlaywriteStylizedText({
    children,
    className,
}: {
    children: React.ReactNode
    className?: string
}) {
    return (
        <span
            className={cn(
                "bg-clip-text text-transparent ",
                michroma.className,
                className,
            )}
        >
            {children}
        </span>
    )
}

export function ParagraphText({
    children,
    className,
}: {
    children: React.ReactNode
    className?: string
}) {
    return (
        <p className={cn("text-base text-white/60", zain.className, className)}>
            {children}
        </p>
    )
}
