"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import Image from "next/image"
import Link from "next/link"
import { Package, Clock, CheckCircle, Truck } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { useAuth } from "@/contexts/auth-context"
import { getUserOrders } from "@/lib/firebase/firestore"

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
    total: number
    status: "confirmed" | "preparing" | "shipped" | "out_for_delivery" | "delivered" | "cancelled"
    createdAt: Date
    estimatedDelivery: Date
}

const statusConfig = {
    confirmed: { label: "Order Confirmed", color: "bg-blue-500", icon: CheckCircle },
    preparing: { label: "Preparing", color: "bg-yellow-500", icon: Package },
    shipped: { label: "Shipped", color: "bg-purple-500", icon: Truck },
    out_for_delivery: { label: "Out for Delivery", color: "bg-orange-500", icon: Truck },
    delivered: { label: "Delivered", color: "bg-green-500", icon: CheckCircle },
    cancelled: { label: "Cancelled", color: "bg-red-500", icon: Clock },
}

export default function OrdersPage() {
    const { state: authState } = useAuth()
    const [orders, setOrders] = useState<Order[]>([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchOrders = async () => {
            if (!authState.user) {
                setLoading(false)
                return
            }

            try {
                const userOrders = await getUserOrders(authState.user.uid)
                setOrders(userOrders as Order[])
            } catch (error) {
                console.error("Error fetching orders:", error)
            } finally {
                setLoading(false)
            }
        }

        fetchOrders()
    }, [authState.user])

    if (loading) {
        return (
            <div className="container mx-auto px-4 py-8">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600 mx-auto"></div>
                    <p className="mt-4 text-gray-600">Loading your orders...</p>
                </div>
            </div>
        )
    }

    if (!authState.user) {
        return (
            <div className="container mx-auto px-4 py-8">
                <div className="text-center">
                    <h1 className="text-2xl font-bold mb-4">Please Log In</h1>
                    <p className="text-gray-600 mb-4">You need to be logged in to view your orders.</p>
                    <Link href="/login">
                        <Button>Log In</Button>
                    </Link>
                </div>
            </div>
        )
    }

    if (orders.length === 0) {
        return (
            <div className="container mx-auto px-4 py-8">
                <div className="text-center">
                    <Package className="h-24 w-24 text-gray-400 mx-auto mb-4" />
                    <h1 className="text-2xl font-bold mb-4">No Orders Yet</h1>
                    <p className="text-gray-600 mb-4">You haven't placed any orders yet.</p>
                    <Link href="/">
                        <Button>Start Shopping</Button>
                    </Link>
                </div>
            </div>
        )
    }

    return (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="container mx-auto px-4 py-6">
            <div className="mb-6">
                <h1 className="text-3xl font-bold">Your Orders</h1>
                <p className="text-gray-600 mt-2">Track and manage your orders</p>
            </div>

            <div className="space-y-6">
                {orders.map((order) => {
                    const StatusIcon = statusConfig[order.status]?.icon || Clock

                    return (
                        <motion.div
                            key={order.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            whileHover={{ scale: 1.02 }}
                            transition={{ duration: 0.2 }}
                        >
                            <Card className="hover:shadow-lg transition-shadow cursor-pointer">
                                <Link href={`/orders/${order.id}`}>
                                    <CardHeader>
                                        <div className="flex items-center justify-between">
                                            <div>
                                                <CardTitle className="text-lg">Order #{order.id.slice(-8)}</CardTitle>
                                                <p className="text-gray-600 text-sm">
                                                    Placed on {new Date(order.createdAt).toLocaleDateString()}
                                                </p>
                                            </div>
                                            <Badge className={`${statusConfig[order.status]?.color} text-white`}>
                                                <StatusIcon className="h-4 w-4 mr-1" />
                                                {statusConfig[order.status]?.label}
                                            </Badge>
                                        </div>
                                    </CardHeader>
                                    <CardContent>
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center space-x-4">
                                                {order.items.slice(0, 3).map((item, index) => (
                                                    <Image
                                                        key={item.id}
                                                        src={item.product.image || "/placeholder.svg?height=50&width=50"}
                                                        alt={item.product.name}
                                                        width={50}
                                                        height={50}
                                                        className="rounded-lg object-cover"
                                                    />
                                                ))}
                                                {order.items.length > 3 && (
                                                    <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center text-sm font-medium">
                                                        +{order.items.length - 3}
                                                    </div>
                                                )}
                                            </div>
                                            <div className="text-right">
                                                <p className="font-bold text-lg">₹{order.total}</p>
                                                <p className="text-sm text-gray-600">
                                                    {order.items.reduce((sum, item) => sum + item.quantity, 0)} items
                                                </p>
                                            </div>
                                        </div>

                                        {order.status !== "delivered" && order.status !== "cancelled" && (
                                            <div className="mt-4 pt-4 border-t">
                                                <div className="flex items-center text-sm text-gray-600">
                                                    <Clock className="h-4 w-4 mr-2" />
                                                    Expected delivery: {new Date(order.estimatedDelivery).toLocaleDateString()}
                                                </div>
                                            </div>
                                        )}
                                    </CardContent>
                                </Link>
                            </Card>
                        </motion.div>
                    )
                })}
            </div>
        </motion.div>
    )
}
