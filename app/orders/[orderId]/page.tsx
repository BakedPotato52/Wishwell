"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import Image from "next/image"
import Link from "next/link"
import { useParams } from "next/navigation"
import { ArrowLeft, Package, Truck, CheckCircle, Clock, MapPin } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Progress } from "@/components/ui/progress"
import { useToast } from "@/hooks/use-toast"
import { doc, onSnapshot } from "firebase/firestore"
import { db } from "@/lib/firebase/config"
import { useRouter } from "next/navigation"
import { formatTimestamp } from "../page"

interface TrackingStep {
    status: string
    timestamp: Date
    description: string
    location?: string
}

interface Order {
    id: string
    items: Array<{
        id: string
        product: {
            id: string
            name: string
            price: number
            image?: string
        }
        quantity: number
    }>
    deliveryAddress: string
    paymentMethod: string
    total: number
    subtotal: number
    additionalFees: number
    status: "confirmed" | "preparing" | "shipped" | "out_for_delivery" | "delivered" | "cancelled"
    estimatedDelivery: Date
    trackingSteps: TrackingStep[]
    createdAt: Date
    updatedAt: Date
}

const statusConfig = {
    confirmed: { label: "Order Confirmed", color: "bg-blue-500", icon: CheckCircle },
    preparing: { label: "Preparing", color: "bg-yellow-500", icon: Package },
    shipped: { label: "Shipped", color: "bg-purple-500", icon: Truck },
    out_for_delivery: { label: "Out for Delivery", color: "bg-orange-500", icon: Truck },
    delivered: { label: "Delivered", color: "bg-green-500", icon: CheckCircle },
    cancelled: { label: "Cancelled", color: "bg-red-500", icon: Clock },
}

export default function OrderTrackingPage() {
    const params = useParams()
    const orderId = params.orderId as string
    const { toast } = useToast()
    const router = useRouter()

    const [order, setOrder] = useState<Order | null>(null)
    const [loading, setLoading] = useState(true)
    const [deliveryProgress, setDeliveryProgress] = useState(0)

    useEffect(() => {
        if (!orderId) return

        const orderRef = doc(db, "orders", orderId)

        const unsubscribe = onSnapshot(
            orderRef,
            (doc) => {
                if (doc.exists()) {
                    const orderData = { id: doc.id, ...doc.data() } as Order
                    setOrder(orderData)

                    // Calculate delivery progress
                    const statusOrder = ["confirmed", "preparing", "shipped", "out_for_delivery", "delivered"]
                    const currentIndex = statusOrder.indexOf(orderData.status)
                    setDeliveryProgress(((currentIndex + 1) / statusOrder.length) * 100)

                    setLoading(false)
                } else {
                    toast({
                        title: "Order Not Found",
                        description: "The order you're looking for doesn't exist.",
                        variant: "destructive",
                    })
                    setLoading(false)
                }
            },
            (error) => {
                console.error("Error fetching order:", error)
                toast({
                    title: "Error",
                    description: "Failed to load order details.",
                    variant: "destructive",
                })
                setLoading(false)
            },
        )

        return () => unsubscribe()
    }, [orderId, toast])

    if (loading) {
        return (
            <div className="container mx-auto px-4 py-8">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600 mx-auto"></div>
                    <p className="mt-4 text-gray-600">Loading order details...</p>
                </div>
            </div>
        )
    }

    if (!order) {
        return (
            <div className="container mx-auto px-4 py-8">
                <div className="text-center">
                    <h1 className="text-2xl font-bold mb-4">Order Not Found</h1>
                    <Link href="/orders">
                        <Button>View All Orders</Button>
                    </Link>
                </div>
            </div>
        )
    }

    const StatusIcon = statusConfig[order.status]?.icon || Clock

    return (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="container mx-auto px-4 py-6">
            <div className="flex items-center mb-6">
                <Link href="/orders">
                    <Button variant="ghost" size="sm">
                        <ArrowLeft className="h-4 w-4 mr-2" />
                        Back to Orders
                    </Button>
                </Link>
            </div>

            {/* Order Header */}
            <Card className="mb-6">
                <CardHeader>
                    <div className="flex items-center justify-between">
                        <div>
                            <CardTitle className="text-2xl">Order #{order.id.slice(-8)}</CardTitle>
                            <p className="text-gray-600 mt-1">Placed on {formatTimestamp(order.createdAt)}</p>
                        </div>
                        <Badge className={`${statusConfig[order.status]?.color} text-white`}>
                            <StatusIcon className="h-4 w-4 mr-1" />
                            {statusConfig[order.status]?.label}
                        </Badge>
                    </div>
                </CardHeader>
                <CardContent>
                    <div className="space-y-4">
                        <div>
                            <div className="flex justify-between items-center mb-2">
                                <span className="text-sm font-medium">Delivery Progress</span>
                                <span className="text-sm text-gray-600">{Math.round(deliveryProgress)}%</span>
                            </div>
                            <Progress value={deliveryProgress} className="h-2" />
                        </div>

                        {order.status !== "delivered" && order.status !== "cancelled" && (
                            <div className="flex items-center text-sm text-gray-600">
                                <Clock className="h-4 w-4 mr-2" />
                                Estimated delivery: {formatTimestamp(order.estimatedDelivery)}
                            </div>
                        )}
                    </div>
                </CardContent>
            </Card>

            <div className="grid md:grid-cols-2 gap-6">
                {/* Order Items */}
                <Card>
                    <CardHeader>
                        <CardTitle>Order Items</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            {order.items.map((item) => (
                                <div key={item.id} className="flex items-center space-x-4">
                                    <Image
                                        src={item.product.image || "/placeholder.svg?height=60&width=60"}
                                        alt={item.product.name}
                                        width={60}
                                        height={60}
                                        className="rounded-lg object-cover"
                                    />
                                    <div className="flex-1">
                                        <h4 className="font-semibold">{item.product.name}</h4>
                                        <p className="text-blue-600 font-bold">₹{item.product.price}</p>
                                        <p className="text-sm text-gray-600">Quantity: {item.quantity}</p>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <Separator className="my-4" />

                        <div className="space-y-2">
                            <div className="flex justify-between">
                                <span>Subtotal</span>
                                <span>₹{order.subtotal}</span>
                            </div>
                            <div className="flex justify-between">
                                <span>Additional Fees</span>
                                <span>₹{order.additionalFees}</span>
                            </div>
                            <div className="flex justify-between font-bold text-lg">
                                <span>Total</span>
                                <span>₹{order.total}</span>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Delivery & Payment Info */}
                <div className="space-y-6">
                    {/* Delivery Address */}
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center">
                                <MapPin className="h-5 w-5 mr-2" />
                                Delivery Address
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-gray-700">{order.deliveryAddress}</p>
                        </CardContent>
                    </Card>

                    {/* Payment Method */}
                    <Card>
                        <CardHeader>
                            <CardTitle>Payment Method</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="capitalize">{order.paymentMethod.replace("_", " ")}</p>
                        </CardContent>
                    </Card>
                </div>
            </div>

            {/* Tracking Timeline */}
            <Card className="mt-6">
                <CardHeader>
                    <CardTitle>Order Tracking</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="space-y-4">
                        {order.trackingSteps.map((step, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: index * 0.1 }}
                                className="flex items-start space-x-4"
                            >
                                <div
                                    className={`w-3 h-3 rounded-full mt-2 ${step.status === order.status ? "bg-blue-600" : "bg-gray-300"
                                        }`}
                                />
                                <div className="flex-1">
                                    <div className="flex items-center justify-between">
                                        <h4 className="font-semibold capitalize">{step.status.replace("_", " ")}</h4>
                                        <span className="text-sm text-gray-600">{formatTimestamp(step.timestamp)}</span>
                                    </div>
                                    <p className="text-gray-600 text-sm mt-1">{step.description}</p>
                                    {step.location && <p className="text-gray-500 text-xs mt-1">📍 {step.location}</p>}
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </CardContent>
            </Card>

            {/* Action Buttons */}
            <div className="mt-6 flex justify-center gap-4">
                {order.status === "delivered" && <Button variant="outline">Rate & Review</Button>}
                {order.status !== "delivered" && order.status !== "cancelled" && (
                    <Button variant="outline" className="text-red-600 border-red-600 hover:bg-red-50 bg-transparent">
                        Cancel Order
                    </Button>
                )}
                <Button onClick={() => router.push('/help')} variant="outline">Contact Support</Button>
            </div>
        </motion.div>
    )
}
