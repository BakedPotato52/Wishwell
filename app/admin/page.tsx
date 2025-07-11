"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from "recharts"
import { TrendingUp, ShoppingCart, Package, DollarSign, Filter } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { AdminLayout } from "@/components/admin/admin-layout"
import { format, subDays } from "date-fns"

interface AnalyticsData {
    totalRevenue: number
    totalOrders: number
    averageOrderValue: number
    categoryStats: Record<string, { revenue: number; orders: number; items: number }>
    topProducts: Array<{ id: string; name: string; quantity: number; revenue: number }>
    dailySales: Record<string, number>
}

export default function AdminDashboard() {
    const [analytics, setAnalytics] = useState<AnalyticsData | null>(null)
    const [loading, setLoading] = useState(true)
    const [dateRange, setDateRange] = useState({
        start: format(subDays(new Date(), 30), "yyyy-MM-dd"),
        end: format(new Date(), "yyyy-MM-dd"),
    })

    const fetchAnalytics = async () => {
        try {
            setLoading(true)
            const response = await fetch(`/api/admin/analytics?startDate=${dateRange.start}&endDate=${dateRange.end}`, {
                headers: {
                    Authorization: `Bearer ${process.env.NEXT_PUBLIC_ADMIN_SECRET_TOKEN}`,
                },
            })

            if (response.ok) {
                const data = await response.json()
                setAnalytics(data)
            }
        } catch (error) {
            console.error("Error fetching analytics:", error)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchAnalytics()
    }, [dateRange])

    const dailySalesData = analytics?.dailySales
        ? Object.entries(analytics.dailySales).map(([date, sales]) => ({
            date: format(new Date(date), "MMM dd"),
            sales,
        }))
        : []

    const categoryData = analytics?.categoryStats
        ? Object.entries(analytics.categoryStats).map(([category, stats]) => ({
            category,
            revenue: stats.revenue,
            orders: stats.orders,
        }))
        : []

    const COLORS = ["#2563eb", "#7c3aed", "#dc2626", "#ea580c", "#65a30d", "#0891b2"]

    if (loading) {
        return (
            <AdminLayout>
                <div className="flex items-center justify-center h-64">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                </div>
            </AdminLayout>
        )
    }

    return (
        <AdminLayout>
            <div className="space-y-6">
                {/* Header */}
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold">Dashboard</h1>
                        <p className="text-gray-600">Welcome to your admin dashboard</p>
                    </div>

                    {/* Date Range Filter */}
                    <div className="flex items-center space-x-4">
                        <div>
                            <Label htmlFor="start-date">Start Date</Label>
                            <Input
                                id="start-date"
                                type="date"
                                value={dateRange.start}
                                onChange={(e) => setDateRange({ ...dateRange, start: e.target.value })}
                                className="w-40"
                            />
                        </div>
                        <div>
                            <Label htmlFor="end-date">End Date</Label>
                            <Input
                                id="end-date"
                                type="date"
                                value={dateRange.end}
                                onChange={(e) => setDateRange({ ...dateRange, end: e.target.value })}
                                className="w-40"
                            />
                        </div>
                        <Button onClick={fetchAnalytics} className="mt-6">
                            <Filter className="h-4 w-4 mr-2" />
                            Apply
                        </Button>
                    </div>
                </div>

                {/* Key Metrics */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
                        <Card>
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
                                <DollarSign className="h-4 w-4 text-muted-foreground" />
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold">₹{analytics?.totalRevenue?.toLocaleString() || 0}</div>
                                <p className="text-xs text-muted-foreground">+20.1% from last month</p>
                            </CardContent>
                        </Card>
                    </motion.div>

                    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
                        <Card>
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <CardTitle className="text-sm font-medium">Total Orders</CardTitle>
                                <ShoppingCart className="h-4 w-4 text-muted-foreground" />
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold">{analytics?.totalOrders || 0}</div>
                                <p className="text-xs text-muted-foreground">+15% from last month</p>
                            </CardContent>
                        </Card>
                    </motion.div>

                    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
                        <Card>
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <CardTitle className="text-sm font-medium">Average Order Value</CardTitle>
                                <TrendingUp className="h-4 w-4 text-muted-foreground" />
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold">₹{Math.round(analytics?.averageOrderValue || 0)}</div>
                                <p className="text-xs text-muted-foreground">+5.2% from last month</p>
                            </CardContent>
                        </Card>
                    </motion.div>

                    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
                        <Card>
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <CardTitle className="text-sm font-medium">Top Products</CardTitle>
                                <Package className="h-4 w-4 text-muted-foreground" />
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold">{analytics?.topProducts?.length || 0}</div>
                                <p className="text-xs text-muted-foreground">Products sold this period</p>
                            </CardContent>
                        </Card>
                    </motion.div>
                </div>

                {/* Charts */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* Daily Sales Chart */}
                    <Card>
                        <CardHeader>
                            <CardTitle>Daily Sales</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <ResponsiveContainer width="100%" height={300}>
                                <LineChart data={dailySalesData}>
                                    <CartesianGrid strokeDasharray="3 3" />
                                    <XAxis dataKey="date" />
                                    <YAxis />
                                    <Tooltip formatter={(value) => [`₹${value}`, "Sales"]} />
                                    <Line type="monotone" dataKey="sales" stroke="#2563eb" strokeWidth={2} />
                                </LineChart>
                            </ResponsiveContainer>
                        </CardContent>
                    </Card>

                    {/* Category Performance */}
                    <Card>
                        <CardHeader>
                            <CardTitle>Category Performance</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <ResponsiveContainer width="100%" height={300}>
                                <BarChart data={categoryData}>
                                    <CartesianGrid strokeDasharray="3 3" />
                                    <XAxis dataKey="category" />
                                    <YAxis />
                                    <Tooltip formatter={(value) => [`₹${value}`, "Revenue"]} />
                                    <Bar dataKey="revenue" fill="#2563eb" />
                                </BarChart>
                            </ResponsiveContainer>
                        </CardContent>
                    </Card>
                </div>

                {/* Top Products Table */}
                <Card>
                    <CardHeader>
                        <CardTitle>Top Selling Products</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead>
                                    <tr className="border-b">
                                        <th className="text-left py-2">Product Name</th>
                                        <th className="text-left py-2">Quantity Sold</th>
                                        <th className="text-left py-2">Revenue</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {analytics?.topProducts?.slice(0, 10).map((product, index) => (
                                        <tr key={product.id} className="border-b">
                                            <td className="py-2">{product.name}</td>
                                            <td className="py-2">{product.quantity}</td>
                                            <td className="py-2">₹{product.revenue.toLocaleString()}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </AdminLayout>
    )
}
