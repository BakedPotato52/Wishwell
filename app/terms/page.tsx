"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ArrowLeft, Shield, CreditCard, Truck, Scale } from "lucide-react"

const fadeInUp = {
    initial: { opacity: 0, y: 60 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6, ease: "easeOut" },
}

const staggerContainer = {
    animate: {
        transition: {
            staggerChildren: 0.1,
        },
    },
}

const iconVariants = {
    initial: { scale: 0, rotate: -180 },
    animate: { scale: 1, rotate: 0 },
    transition: { duration: 0.5, ease: "easeOut" },
}

export default function TermsOfService() {
    const sections = [
        {
            icon: Shield,
            title: "User Responsibilities",
            content: [
                "You must provide accurate and complete information when creating an account",
                "You are responsible for maintaining the confidentiality of your account credentials",
                "You must not use our platform for any illegal or unauthorized purposes",
                "You agree to comply with all applicable laws and regulations",
                "You must not interfere with or disrupt our services or servers",
            ],
        },
        {
            icon: CreditCard,
            title: "Payment Terms",
            content: [
                "All prices are displayed in USD and include applicable taxes",
                "Payment is due at the time of purchase unless otherwise specified",
                "We accept major credit cards, PayPal, and other approved payment methods",
                "Refunds will be processed according to our return policy",
                "You authorize us to charge your payment method for all purchases",
            ],
        },
        {
            icon: Truck,
            title: "Shipping Policies",
            content: [
                "Standard shipping takes 3-7 business days within the continental US",
                "Express shipping options are available for an additional fee",
                "International shipping may take 7-21 business days",
                "Shipping costs are calculated based on weight, size, and destination",
                "Risk of loss passes to you upon delivery to the carrier",
            ],
        },
        {
            icon: Scale,
            title: "Dispute Resolution",
            content: [
                "Any disputes will be resolved through binding arbitration",
                "You waive your right to participate in class action lawsuits",
                "Arbitration will be conducted under the rules of the American Arbitration Association",
                "The arbitration will take place in [Your State/Country]",
                "Each party will bear their own costs and attorney fees",
            ],
        },
    ]

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
                className="container mx-auto px-4 py-8 max-w-4xl"
            >
                {/* Header */}
                <motion.div className="mb-8">
                    <Button variant="ghost" asChild className="mb-4">
                        <Link href="/" className="flex items-center gap-2">
                            <ArrowLeft className="w-4 h-4" />
                            Back to Home
                        </Link>
                    </Button>
                    <h1 className="text-4xl font-bold text-slate-900 mb-4">Terms of Service</h1>
                    <p className="text-lg text-slate-600">Last updated: January 1, 2024</p>
                </motion.div>

                {/* Introduction */}
                <motion.div {...fadeInUp} transition={{ delay: 0.2, duration: 0.6 }} className="mb-12">
                    <Card>
                        <CardContent className="p-6">
                            <p className="text-slate-700 leading-relaxed">
                                Welcome to our e-commerce platform. These Terms of Service ("Terms") govern your use of our website and
                                services. By accessing or using our platform, you agree to be bound by these Terms. If you do not agree
                                to these Terms, please do not use our services.
                            </p>
                        </CardContent>
                    </Card>
                </motion.div>

                {/* Sections */}
                <motion.div variants={staggerContainer} initial="initial" animate="animate" className="space-y-8">
                    {sections.map((section, index) => (
                        <motion.div
                            key={section.title}
                            variants={fadeInUp}
                            whileHover={{ scale: 1.02 }}
                            transition={{ duration: 0.2 }}
                        >
                            <Card className="overflow-hidden">
                                <CardContent className="p-6">
                                    <div className="flex items-center gap-4 mb-4">
                                        <motion.div variants={iconVariants} className="p-3 bg-slate-100 rounded-lg">
                                            <section.icon className="w-6 h-6 text-slate-700" />
                                        </motion.div>
                                        <h2 className="text-2xl font-semibold text-slate-900">{section.title}</h2>
                                    </div>
                                    <ul className="space-y-3">
                                        {section.content.map((item, itemIndex) => (
                                            <motion.li
                                                key={itemIndex}
                                                initial={{ opacity: 0, x: -20 }}
                                                animate={{ opacity: 1, x: 0 }}
                                                transition={{ delay: index * 0.1 + itemIndex * 0.05 }}
                                                className="flex items-start gap-3 text-slate-700"
                                            >
                                                <div className="w-2 h-2 bg-slate-400 rounded-full mt-2 flex-shrink-0" />
                                                {item}
                                            </motion.li>
                                        ))}
                                    </ul>
                                </CardContent>
                            </Card>
                        </motion.div>
                    ))}
                </motion.div>

                {/* Additional Terms */}
                <motion.div {...fadeInUp} transition={{ delay: 0.8, duration: 0.6 }} className="mt-12">
                    <Card>
                        <CardContent className="p-6">
                            <h2 className="text-2xl font-semibold text-slate-900 mb-4">Additional Terms</h2>
                            <div className="space-y-4 text-slate-700">
                                <p>
                                    <strong>Limitation of Liability:</strong> Our liability is limited to the maximum extent permitted by
                                    law. We are not liable for any indirect, incidental, or consequential damages.
                                </p>
                                <p>
                                    <strong>Modifications:</strong> We reserve the right to modify these Terms at any time. Changes will
                                    be effective immediately upon posting on our website.
                                </p>
                                <p>
                                    <strong>Contact Information:</strong> If you have questions about these Terms, please contact us at
                                    legal@example.com or call (555) 123-4567.
                                </p>
                            </div>
                        </CardContent>
                    </Card>
                </motion.div>

                {/* Footer Navigation */}
                <motion.div {...fadeInUp} transition={{ delay: 1.0, duration: 0.6 }} className="mt-12 flex justify-center">
                    <Button asChild>
                        <Link href="/privacy">View Privacy Policy</Link>
                    </Button>
                </motion.div>
            </motion.div>
        </div>
    )
}
