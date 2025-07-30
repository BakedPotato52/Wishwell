"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ArrowLeft, Database, Eye, Lock, UserCheck, Globe, Bell } from "lucide-react"

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

const slideInLeft = {
    initial: { opacity: 0, x: -50 },
    animate: { opacity: 1, x: 0 },
    transition: { duration: 0.5, ease: "easeOut" },
}

export default function PrivacyPolicy() {
    const sections = [
        {
            icon: Database,
            title: "Information We Collect",
            content: [
                "Personal information you provide (name, email, address, phone number)",
                "Payment information (credit card details, billing address)",
                "Account information (username, password, preferences)",
                "Usage data (pages visited, time spent, click patterns)",
                "Device information (IP address, browser type, operating system)",
                "Location data (with your consent for shipping and local services)",
            ],
        },
        {
            icon: Eye,
            title: "How We Use Your Information",
            content: [
                "Process and fulfill your orders and transactions",
                "Provide customer support and respond to inquiries",
                "Send order confirmations, shipping updates, and receipts",
                "Improve our products, services, and user experience",
                "Personalize content and product recommendations",
                "Comply with legal obligations and prevent fraud",
            ],
        },
        {
            icon: Lock,
            title: "Data Protection & Security",
            content: [
                "We use industry-standard encryption (SSL/TLS) for data transmission",
                "Payment information is processed through PCI-compliant systems",
                "Regular security audits and vulnerability assessments",
                "Access controls and authentication for internal systems",
                "Data backup and disaster recovery procedures",
                "Employee training on data protection and privacy practices",
            ],
        },
        {
            icon: UserCheck,
            title: "Your Rights & Choices",
            content: [
                "Access and review your personal information",
                "Request correction of inaccurate or incomplete data",
                "Delete your account and associated personal data",
                "Opt-out of marketing communications at any time",
                "Request data portability in machine-readable format",
                "Object to processing based on legitimate interests",
            ],
        },
        {
            icon: Globe,
            title: "Data Sharing & Third Parties",
            content: [
                "We do not sell your personal information to third parties",
                "Trusted service providers (payment processors, shipping companies)",
                "Legal compliance (court orders, government requests)",
                "Business transfers (mergers, acquisitions, asset sales)",
                "Analytics providers (Google Analytics, with anonymized data)",
                "Marketing partners (only with explicit consent)",
            ],
        },
        {
            icon: Bell,
            title: "Cookies & Tracking",
            content: [
                "Essential cookies for website functionality and security",
                "Analytics cookies to understand user behavior and improve services",
                "Marketing cookies for personalized advertising (with consent)",
                "You can manage cookie preferences in your browser settings",
                "Third-party cookies from integrated services (social media, analytics)",
                "We respect Do Not Track signals where technically feasible",
            ],
        },
    ]

    return (
        <div className="min-h-screen">
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
                    <h1 className="text-4xl font-bold text-slate-900 mb-4">Privacy Policy</h1>
                    <p className="text-lg text-slate-600">Last updated: January 1, 2024</p>
                </motion.div>

                {/* Introduction */}
                <motion.div {...slideInLeft} transition={{ delay: 0.2 }} className="mb-12">
                    <Card className="border-blue-200 bg-blue-50/50">
                        <CardContent className="p-6">
                            <p className="text-slate-700 leading-relaxed">
                                Your privacy is important to us. This Privacy Policy explains how we collect, use, disclose, and
                                safeguard your information when you visit our e-commerce platform. We are committed to protecting your
                                personal data and complying with applicable privacy regulations including GDPR, CCPA, and other relevant
                                laws.
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
                            whileHover={{ scale: 1.01, boxShadow: "0 10px 25px rgba(0,0,0,0.1)" }}
                            transition={{ duration: 0.2 }}
                        >
                            <Card className="overflow-hidden">
                                <CardContent className="p-6">
                                    <div className="flex items-center gap-4 mb-4">
                                        <motion.div
                                            initial={{ scale: 0, rotate: -180 }}
                                            animate={{ scale: 1, rotate: 0 }}
                                            transition={{ delay: index * 0.1, duration: 0.5 }}
                                            className="p-3 bg-blue-100 rounded-lg"
                                        >
                                            <section.icon className="w-6 h-6 text-blue-700" />
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
                                                <div className="w-2 h-2 bg-blue-400 rounded-full mt-2 flex-shrink-0" />
                                                {item}
                                            </motion.li>
                                        ))}
                                    </ul>
                                </CardContent>
                            </Card>
                        </motion.div>
                    ))}
                </motion.div>

                {/* Data Retention */}
                <motion.div {...fadeInUp} transition={{ delay: 0.8, duration: 0.6 }} className="mt-12">
                    <Card className="border-amber-200 bg-amber-50/50">
                        <CardContent className="p-6">
                            <h2 className="text-2xl font-semibold text-slate-900 mb-4">Data Retention</h2>
                            <div className="space-y-4 text-slate-700">
                                <p>
                                    We retain your personal information only as long as necessary to fulfill the purposes outlined in this
                                    Privacy Policy, comply with legal obligations, resolve disputes, and enforce our agreements.
                                </p>
                                <ul className="space-y-2 ml-4">
                                    <li>• Account information: Until account deletion or 3 years of inactivity</li>
                                    <li>• Transaction records: 7 years for tax and legal compliance</li>
                                    <li>• Marketing data: Until you opt-out or 2 years of inactivity</li>
                                    <li>• Support communications: 3 years after resolution</li>
                                </ul>
                            </div>
                        </CardContent>
                    </Card>
                </motion.div>

                {/* Contact Information */}
                <motion.div {...fadeInUp} transition={{ delay: 1.0, duration: 0.6 }} className="mt-12">
                    <Card className="border-green-200 bg-green-50/50">
                        <CardContent className="p-6">
                            <h2 className="text-2xl font-semibold text-slate-900 mb-4">Contact Us</h2>
                            <div className="space-y-4 text-slate-700">
                                <p>If you have questions about this Privacy Policy or our data practices, please contact us:</p>
                                <div className="grid md:grid-cols-2 gap-4">
                                    <div>
                                        <p>
                                            <strong>Email:</strong> privacy@example.com
                                        </p>
                                        <p>
                                            <strong>Phone:</strong> (555) 123-4567
                                        </p>
                                    </div>
                                    <div>
                                        <p>
                                            <strong>Mail:</strong>
                                        </p>
                                        <p>
                                            Privacy Officer
                                            <br />
                                            123 Commerce Street
                                            <br />
                                            Business City, BC 12345
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </motion.div>

                {/* Footer Navigation */}
                <motion.div {...fadeInUp} transition={{ delay: 1.2, duration: 0.6 }} className="mt-12 flex justify-center">
                    <Button asChild>
                        <Link href="/terms-of-service">View Terms of Service</Link>
                    </Button>
                </motion.div>
            </motion.div>
        </div>
    )
}
