"use client"

import { useEffect, useState } from "react"
import { Bell, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { useWishlist } from "@/contexts/wishlist-context"
import { getCurrentPrice, getStockStatus } from "@/utils/product-migration"

export function WishlistNotification() {
    const { items } = useWishlist()
    const [notifications, setNotifications] = useState<
        Array<{
            id: string
            type: "price_drop" | "back_in_stock" | "reminder"
            message: string
            productId: string
        }>
    >([])
    const [dismissed, setDismissed] = useState<Set<string>>(new Set())

    useEffect(() => {
        // Check for price drops and stock changes
        const checkNotifications = () => {
            const newNotifications: typeof notifications = []

            items.forEach((item) => {
                const currentPrice = getCurrentPrice(item.product, item.selectedAttributes || {})
                const stockStatus = getStockStatus(item.product, item.selectedAttributes || {})

                // Check if item is back in stock
                if (stockStatus.inStock && !item.product.inStock) {
                    newNotifications.push({
                        id: `stock_${item.id}`,
                        type: "back_in_stock",
                        message: `${item.product.name} is back in stock!`,
                        productId: item.product.id,
                    })
                }

                // Simulate price drop detection (you'd implement actual price tracking)
                // This is just for demonstration
                if (Math.random() > 0.9) {
                    newNotifications.push({
                        id: `price_${item.id}`,
                        type: "price_drop",
                        message: `Price dropped for ${item.product.name}!`,
                        productId: item.product.id,
                    })
                }
            })

            // Add reminder notifications for items added more than 7 days ago
            const weekAgo = Date.now() - 7 * 24 * 60 * 60 * 1000
            items.forEach((item) => {
                const addedAt = item.addedAt?.toDate?.() || new Date(item.addedAt)
                if (addedAt.getTime() < weekAgo && Math.random() > 0.8) {
                    newNotifications.push({
                        id: `reminder_${item.id}`,
                        type: "reminder",
                        message: `Don't forget about ${item.product.name} in your wishlist!`,
                        productId: item.product.id,
                    })
                }
            })

            setNotifications(newNotifications.filter((n) => !dismissed.has(n.id)))
        }

        if (items.length > 0) {
            checkNotifications()
            // Check every hour
            const interval = setInterval(checkNotifications, 60 * 60 * 1000)
            return () => clearInterval(interval)
        }
    }, [items, dismissed])

    const dismissNotification = (id: string) => {
        setDismissed((prev) => new Set([...prev, id]))
        setNotifications((prev) => prev.filter((n) => n.id !== id))
    }

    if (notifications.length === 0) return null

    return (
        <div className="fixed bottom-4 right-4 z-50 space-y-2 max-w-sm">
            {notifications.slice(0, 3).map((notification) => (
                <Card key={notification.id} className="shadow-lg border-l-4 border-l-primary">
                    <CardContent className="p-4">
                        <div className="flex items-start gap-3">
                            <Bell className="h-5 w-5 text-primary mt-0.5" />
                            <div className="flex-1">
                                <p className="text-sm font-medium">{notification.message}</p>
                                <Button variant="link" size="sm" className="p-0 h-auto text-xs" asChild>
                                    <a href={`/products/${notification.productId}`}>View Product</a>
                                </Button>
                            </div>
                            <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => dismissNotification(notification.id)}
                                className="p-1 h-auto"
                            >
                                <X className="h-4 w-4" />
                            </Button>
                        </div>
                    </CardContent>
                </Card>
            ))}
        </div>
    )
}
