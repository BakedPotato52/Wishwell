"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { User, Phone, MapPin, Edit3, Save, X, LogOut, Package, Calendar, CreditCard, Truck } from "lucide-react"
import { useAuth } from "@/contexts/auth-context"
import { Order } from "@/lib/types"
import { getUserOrders } from "@/lib/firebase/firestore"
import { motion, AnimatePresence } from "framer-motion"
import Link from "next/link"

// Animation variants
const containerVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      staggerChildren: 0.1,
    },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4 },
  },
}

const cardVariants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.4 },
  },
}

const orderItemVariants = {
  hidden: { opacity: 0, x: -20 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.3 },
  },
}

export default function ProfilePage() {
  const { state: authState, updateUser, logout } = useAuth()
  const [isEditing, setIsEditing] = useState(false)
  const [activeTab, setActiveTab] = useState("profile")
  const [formData, setFormData] = useState({
    name: authState.user?.name,
    phone: authState.user?.phone || "9876543210",
    gender: authState.user?.gender || "Men",
    address: authState.user?.address || "address",
  })
  const [orders, setOrders] = useState<Order[]>([])
  const [ordersLoading, setOrdersLoading] = useState(true)
  const [ordersError, setOrdersError] = useState<string | null>(null)

  useEffect(() => {
    const fetchOrders = async () => {
      if (authState.user?.uid) {
        setOrdersLoading(true)
        setOrdersError(null)
        try {
          const userOrders = await getUserOrders(authState.user.uid)
          setOrders(userOrders)
        } catch (error) {
          setOrdersError("Failed to load orders")
          console.error("Error fetching orders:", error)
        } finally {
          setOrdersLoading(false)
        }
      }
    }
    fetchOrders()
  }, [authState.user?.uid])

  const handleSave = () => {
    updateUser(formData)
    setIsEditing(false)
  }

  const handleCancel = () => {
    setFormData({
      name: authState.user?.name,
      phone: authState.user?.phone || "9876543210",
      gender: authState.user?.gender || "Men",
      address: authState.user?.address || "address",
    })
    setIsEditing(false)
  }

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "delivered":
        return "bg-green-100 text-green-800 border-green-200"
      case "shipped":
        return "bg-blue-100 text-blue-800 border-blue-200"
      case "processing":
        return "bg-yellow-100 text-yellow-800 border-yellow-200"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
  }

  return (
    <motion.div
      className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-4 sm:py-8"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <div className="max-w-4xl mx-auto px-2 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div className="mb-6 sm:mb-8" variants={itemVariants}>
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between space-y-4 sm:space-y-0 sm:space-x-6">
            <div className="flex items-center space-x-3 sm:space-x-4 w-full sm:w-auto">
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Avatar className="h-12 w-12 sm:h-16 sm:w-16 ring-2 ring-white shadow-lg">
                  <AvatarImage src="/placeholder.svg?height=64&width=64" />
                  <AvatarFallback className="text-sm sm:text-lg font-semibold bg-gradient-to-br from-blue-500 to-purple-600 text-white">
                    {getInitials(authState.user?.name || "User")}
                  </AvatarFallback>
                </Avatar>
              </motion.div>
              <div className="min-w-0 flex-1">
                <h1 className="text-xl sm:text-2xl font-bold text-gray-900 truncate">{authState.user?.name}</h1>
                <p className="text-sm sm:text-base text-gray-600 truncate">{authState.user?.email}</p>
              </div>
            </div>
            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
              <Button
                variant="outline"
                onClick={logout}
                className="flex items-center space-x-2 bg-white hover:bg-gray-50 border-gray-200 w-full sm:w-auto justify-center"
              >
                <LogOut className="h-4 w-4" />
                <span>Logout</span>
              </Button>
            </motion.div>
          </div>
        </motion.div>

        <motion.div variants={itemVariants}>
          <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
            <TabsList className="grid w-full grid-cols-2 bg-white shadow-sm border">
              <TabsTrigger value="profile" className="data-[state=active]:bg-blue-50 data-[state=active]:text-blue-700">
                <User className="h-4 w-4 mr-2" />
                <span className="hidden sm:inline">Profile Information</span>
                <span className="sm:hidden">Profile</span>
              </TabsTrigger>
              <TabsTrigger value="orders" className="data-[state=active]:bg-blue-50 data-[state=active]:text-blue-700">
                <Package className="h-4 w-4 mr-2" />
                <span className="hidden sm:inline">Order History</span>
                <span className="sm:hidden">Orders</span>
              </TabsTrigger>
            </TabsList>

            {/* Profile Information Tab */}
            <AnimatePresence mode="wait">
              {activeTab === "profile" && (
                <TabsContent value="profile" asChild>
                  <motion.div key="profile" variants={cardVariants} initial="hidden" animate="visible" exit="hidden">
                    <Card className="shadow-lg border-0 bg-white">
                      <CardHeader className="pb-4">
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between space-y-3 sm:space-y-0">
                          <div>
                            <CardTitle className="text-lg sm:text-xl">Account Information</CardTitle>
                            <CardDescription className="text-sm">
                              Manage your personal information and preferences
                            </CardDescription>
                          </div>
                          <AnimatePresence mode="wait">
                            {!isEditing ? (
                              <motion.div
                                key="edit-button"
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.8 }}
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                              >
                                <Button
                                  variant="outline"
                                  onClick={() => setIsEditing(true)}
                                  className="flex items-center space-x-2 w-full sm:w-auto justify-center"
                                >
                                  <Edit3 className="h-4 w-4" />
                                  <span>Edit</span>
                                </Button>
                              </motion.div>
                            ) : (
                              <motion.div
                                key="action-buttons"
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.8 }}
                                className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2 w-full sm:w-auto"
                              >
                                <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                                  <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={handleCancel}
                                    className="flex items-center space-x-1 bg-white hover:bg-gray-50 w-full sm:w-auto justify-center"
                                  >
                                    <X className="h-4 w-4" />
                                    <span>Cancel</span>
                                  </Button>
                                </motion.div>
                                <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                                  <Button
                                    size="sm"
                                    onClick={handleSave}
                                    className="flex items-center space-x-1 w-full sm:w-auto justify-center"
                                  >
                                    <Save className="h-4 w-4" />
                                    <span>Save</span>
                                  </Button>
                                </motion.div>
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </div>
                      </CardHeader>
                      <CardContent className="space-y-6">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
                          <motion.div className="space-y-2" variants={itemVariants}>
                            <Label htmlFor="name" className="flex items-center space-x-2 text-sm font-medium">
                              <User className="h-4 w-4 text-gray-500" />
                              <span>Full Name</span>
                            </Label>
                            <AnimatePresence mode="wait">
                              {isEditing ? (
                                <motion.div
                                  key="name-input"
                                  initial={{ opacity: 0, y: 10 }}
                                  animate={{ opacity: 1, y: 0 }}
                                  exit={{ opacity: 0, y: -10 }}
                                >
                                  <Input
                                    id="name"
                                    value={formData.name}
                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                    placeholder="Enter your full name"
                                    className="transition-all duration-200 focus:ring-2 focus:ring-blue-500"
                                  />
                                </motion.div>
                              ) : (
                                <motion.p
                                  key="name-display"
                                  initial={{ opacity: 0, y: 10 }}
                                  animate={{ opacity: 1, y: 0 }}
                                  exit={{ opacity: 0, y: -10 }}
                                  className="text-sm text-gray-900 bg-gray-50 p-3 rounded-md border"
                                >
                                  {formData.name}
                                </motion.p>
                              )}
                            </AnimatePresence>
                          </motion.div>

                          <motion.div className="space-y-2" variants={itemVariants}>
                            <Label htmlFor="phone" className="flex items-center space-x-2 text-sm font-medium">
                              <Phone className="h-4 w-4 text-gray-500" />
                              <span>Phone Number</span>
                            </Label>
                            <AnimatePresence mode="wait">
                              {isEditing ? (
                                <motion.div
                                  key="phone-input"
                                  initial={{ opacity: 0, y: 10 }}
                                  animate={{ opacity: 1, y: 0 }}
                                  exit={{ opacity: 0, y: -10 }}
                                >
                                  <Input
                                    id="phone"
                                    value={formData.phone}
                                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                    placeholder="Enter your phone number"
                                    className="transition-all duration-200 focus:ring-2 focus:ring-blue-500"
                                  />
                                </motion.div>
                              ) : (
                                <motion.p
                                  key="phone-display"
                                  initial={{ opacity: 0, y: 10 }}
                                  animate={{ opacity: 1, y: 0 }}
                                  exit={{ opacity: 0, y: -10 }}
                                  className="text-sm text-gray-900 bg-gray-50 p-3 rounded-md border"
                                >
                                  {formData.phone}
                                </motion.p>
                              )}
                            </AnimatePresence>
                          </motion.div>

                          <motion.div className="space-y-2" variants={itemVariants}>
                            <Label htmlFor="gender" className="text-sm font-medium">
                              Gender
                            </Label>
                            <AnimatePresence mode="wait">
                              {isEditing ? (
                                <motion.div
                                  key="gender-select"
                                  initial={{ opacity: 0, y: 10 }}
                                  animate={{ opacity: 1, y: 0 }}
                                  exit={{ opacity: 0, y: -10 }}
                                >
                                  <Select
                                    value={formData.gender}
                                    onValueChange={(value) =>
                                      setFormData({
                                        ...formData,
                                        gender: value as "Men" | "Women" | "Other" | "Prefer not to say",
                                      })
                                    }
                                  >
                                    <SelectTrigger className="transition-all duration-200 focus:ring-2 focus:ring-blue-500">
                                      <SelectValue placeholder="Select gender" />
                                    </SelectTrigger>
                                    <SelectContent>
                                      <SelectItem value="Men">Men</SelectItem>
                                      <SelectItem value="Women">Women</SelectItem>
                                      <SelectItem value="Other">Other</SelectItem>
                                      <SelectItem value="Prefer not to say">Prefer not to say</SelectItem>
                                    </SelectContent>
                                  </Select>
                                </motion.div>
                              ) : (
                                <motion.p
                                  key="gender-display"
                                  initial={{ opacity: 0, y: 10 }}
                                  animate={{ opacity: 1, y: 0 }}
                                  exit={{ opacity: 0, y: -10 }}
                                  className="text-sm text-gray-900 bg-gray-50 p-3 rounded-md border"
                                >
                                  {formData.gender}
                                </motion.p>
                              )}
                            </AnimatePresence>
                          </motion.div>

                          <motion.div className="space-y-2" variants={itemVariants}>
                            <Label htmlFor="email" className="text-sm font-medium">
                              Email Address
                            </Label>
                            <p className="text-sm text-gray-900 bg-gray-50 p-3 rounded-md border">
                              {authState.user?.email}
                            </p>
                            <p className="text-xs text-gray-500">Email cannot be changed</p>
                          </motion.div>
                        </div>

                        <motion.div className="space-y-2" variants={itemVariants}>
                          <Label htmlFor="address" className="flex items-center space-x-2 text-sm font-medium">
                            <MapPin className="h-4 w-4 text-gray-500" />
                            <span>Address</span>
                          </Label>
                          <AnimatePresence mode="wait">
                            {isEditing ? (
                              <motion.div
                                key="address-input"
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -10 }}
                              >
                                <Textarea
                                  id="address"
                                  value={formData.address}
                                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                                  placeholder="Enter your address"
                                  rows={3}
                                  className="transition-all duration-200 focus:ring-2 focus:ring-blue-500 resize-none"
                                />
                              </motion.div>
                            ) : (
                              <motion.p
                                key="address-display"
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -10 }}
                                className="text-sm text-gray-900 bg-gray-50 p-3 rounded-md border min-h-[80px] flex items-start"
                              >
                                {formData.address}
                              </motion.p>
                            )}
                          </AnimatePresence>
                        </motion.div>
                      </CardContent>
                    </Card>
                  </motion.div>
                </TabsContent>
              )}
            </AnimatePresence>

            {/* Order History Tab */}
            <AnimatePresence mode="wait">
              {activeTab === "orders" && (
                <TabsContent value="orders" asChild>
                  <motion.div key="orders" variants={cardVariants} initial="hidden" animate="visible" exit="hidden">
                    <Card className="shadow-lg border-0 bg-white">
                      <CardHeader>
                        <CardTitle className="flex items-center space-x-2 text-lg sm:text-xl">
                          <Package className="h-5 w-5 text-blue-600" />
                          <span>Order History</span>
                        </CardTitle>
                        <CardDescription className="text-sm">View and track your recent orders</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-6">
                          <AnimatePresence mode="wait">
                            {ordersLoading ? (
                              <motion.div
                                key="loading"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                className="flex items-center justify-center py-12"
                              >
                                <div className="flex items-center space-x-3">
                                  <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600"></div>
                                  <span className="text-gray-600">Loading orders...</span>
                                </div>
                              </motion.div>
                            ) : ordersError ? (
                              <motion.div
                                key="error"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -20 }}
                                className="text-center py-12"
                              >
                                <div className="text-red-500 mb-4">
                                  <Package className="h-12 w-12 mx-auto mb-2 opacity-50" />
                                  <p>{ordersError}</p>
                                </div>
                                <Button
                                  variant="outline"
                                  onClick={() => window.location.reload()}
                                  className="hover:bg-gray-50"
                                >
                                  Try Again
                                </Button>
                              </motion.div>
                            ) : orders.length === 0 ? (
                              <motion.div
                                key="empty"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -20 }}
                                className="text-center py-12"
                              >
                                <Package className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                                <p className="text-gray-600 text-lg">No orders found</p>
                                <p className="text-gray-500 text-sm mt-2">Your order history will appear here</p>
                              </motion.div>
                            ) : (
                              <motion.div
                                key="orders-list"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                              >
                                {orders.map((order, index) => (
                                  <motion.div
                                    key={order.id}
                                    variants={orderItemVariants}
                                    initial="hidden"
                                    animate="visible"
                                    transition={{ delay: index * 0.1 }}
                                    className="group"
                                  >
                                    <motion.div
                                      whileHover={{ scale: 1.01 }}
                                      className="bg-gradient-to-r from-white to-gray-50 rounded-lg border border-gray-200 p-4 sm:p-6 transition-all duration-200 hover:shadow-md"
                                    >
                                      <Link href={`/orders/${order.id}`}>
                                        <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4 space-y-3 sm:space-y-0">
                                          <div className="flex items-start space-x-3">
                                            <div className="bg-blue-100 p-2 rounded-lg">
                                              <Package className="h-5 w-5 text-blue-600" />
                                            </div>
                                            <div className="min-w-0 flex-1">
                                              <h3 className="font-semibold text-base sm:text-lg text-gray-900">
                                                Order {order.id.slice(11, 17)}
                                              </h3>
                                              <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-4 space-y-1 sm:space-y-0 text-sm text-gray-600 mt-1">
                                                <span className="flex items-center space-x-1">
                                                  <Calendar className="h-4 w-4" />
                                                  <span>
                                                    {order.createdAt && typeof order.createdAt === 'object' && 'toDate' in order.createdAt
                                                      ? order.createdAt.toDate().toLocaleDateString()
                                                      : order.createdAt instanceof Date
                                                        ? order.createdAt.toLocaleDateString()
                                                        : typeof order.createdAt === 'string' || typeof order.createdAt === 'number'
                                                          ? new Date(order.createdAt).toLocaleDateString()
                                                          : 'N/A'}
                                                  </span>
                                                </span>
                                                <span className="flex items-center space-x-1">
                                                  <CreditCard className="h-4 w-4" />
                                                  <span className="font-semibold">₹{order.total.toFixed(2)}</span>
                                                </span>
                                              </div>
                                            </div>
                                          </div>
                                          <motion.div
                                            whileHover={{ scale: 1.05 }}
                                            className="flex items-center space-x-3 self-start sm:self-center"
                                          >
                                            <Badge
                                              className={`${getStatusColor(order.status)} border font-medium px-3 py-1`}
                                            >
                                              <Truck className="h-3 w-3 mr-1" />
                                              {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                                            </Badge>
                                          </motion.div>
                                        </div>

                                        <div className="bg-white rounded-lg border border-gray-100 ">
                                          <h4 className="font-medium mb-3 text-gray-900">Items Ordered:</h4>
                                          <div className="space-y-3">
                                            {order.items.map((item, itemIndex) => (
                                              <motion.div
                                                key={itemIndex}
                                                initial={{ opacity: 0, x: -10 }}
                                                animate={{ opacity: 1, x: 0 }}
                                                transition={{ delay: index * 0.1 + itemIndex * 0.05 }}
                                                className="flex justify-between items-center py-2 flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-4 border-b border-gray-200 last:border-b-0"
                                              >
                                                <div className="flex items-center space-x-3">
                                                  <div className="w-12 h-12 bg-gradient-to-br from-gray-100 to-gray-200 rounded-md flex items-center justify-center">
                                                    {item.product.image ? (
                                                      <img
                                                        src={item.product.image}
                                                        alt={item.product.name}
                                                        className="w-full h-full object-cover rounded-md"
                                                      />
                                                    ) : (
                                                      <Package className="h-5 w-5 sm:h-6 sm:w-6 text-gray-500" />
                                                    )}
                                                  </div>
                                                  <div className=" flex-1">
                                                    <p className="font-medium text-gray-900 text-sm sm:text-base truncate">
                                                      {item.product.name}
                                                    </p>
                                                    <p className="text-xs sm:text-sm text-gray-600">
                                                      Qty: {item.quantity}
                                                    </p>
                                                  </div>
                                                </div>
                                                <p className="font-semibold text-gray-900 text-sm sm:text-base">
                                                  ₹{item.product.price.toFixed(2)}
                                                </p>
                                              </motion.div>
                                            ))}
                                          </div>
                                        </div>
                                      </Link>
                                    </motion.div>
                                    {index < orders.length - 1 && <Separator className="mt-6 bg-gray-200" />}
                                  </motion.div>
                                ))}
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                </TabsContent>
              )}
            </AnimatePresence>
          </Tabs>
        </motion.div>
      </div>
    </motion.div>
  )
}