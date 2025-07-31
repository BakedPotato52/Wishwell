"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { ArrowLeft, MapPin, X, CreditCard } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { useToast } from "@/hooks/use-toast"
import { useCart } from "@/contexts/cart-context"
import { useAuth } from "@/contexts/auth-context"
import { createOrder } from "@/lib/firebase/firestore"
import { useLocation } from "@/hooks/use-location"

const getAddressFromCoordinates = async (latitude: number, longitude: number): Promise<string> => {
  try {
    const response = await fetch(
      `https://api.opencagedata.com/geocode/v1/json?q=${latitude}+${longitude}&key=${process.env.NEXT_PUBLIC_OPENCAGE_API_KEY}`,
    )
    if (!response.ok) {
      throw new Error("Geocoding failed")
    }
    const data = await response.json()
    if (data.results && data.results.length > 0) {
      return data.results[0].formatted
    }
    throw new Error("No address found")
  } catch (error) {
    // Fallback: try with a free service (less accurate)
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}&zoom=18&addressdetails=1`,
      )
      if (!response.ok) {
        throw new Error("Fallback geocoding failed")
      }
      const data = await response.json()
      if (data.display_name) {
        return data.display_name
      }
      throw new Error("No address found in fallback")
    } catch (fallbackError) {
      throw new Error("Unable to get address from location")
    }
  }
}

export default function CheckoutPage() {
  const { state: cartState, dispatch: cartDispatch } = useCart()
  const { state: authState } = useAuth()
  const { toast } = useToast()
  const router = useRouter()

  const [step, setStep] = useState(1)
  const [deliveryAddress, setDeliveryAddress] = useState("")
  const [isAddressDialogOpen, setIsAddressDialogOpen] = useState(false)
  const [paymentMethod, setPaymentMethod] = useState("card")
  const [isProcessing, setIsProcessing] = useState(false)
  const [newAddress, setNewAddress] = useState({
    name: "",
    address: "",
    phone: "",
  })

  // Remove the old location state and functions, replace with:
  const {
    address: currentLocationAddress,
    isLoading: isGettingLocation,
    error: locationError,
    getCurrentAddress,
    clearError: clearLocationError,
    isSupported: isLocationSupported,
  } = useLocation()

  const additionalFees = 50
  const orderTotal = cartState.total + additionalFees

  const handleAddressSubmit = () => {
    setDeliveryAddress(`${newAddress.name}, ${newAddress.address}, ${newAddress.phone}`)
    setIsAddressDialogOpen(false)
    setNewAddress({ name: "", address: "", phone: "" })
  }

  // Update the getCurrentLocation function to use the hook:
  const handleGetCurrentLocation = async () => {
    try {
      await getCurrentAddress()
      if (currentLocationAddress) {
        setNewAddress((prev) => ({
          ...prev,
          address: currentLocationAddress,
        }))
        toast({
          title: "Location Found",
          description: "Your current address has been automatically filled.",
        })
      }
    } catch (error) {
      toast({
        title: "Location Error",
        description: "Unable to get address from your location. Please enter manually.",
        variant: "destructive",
      })
    }
  }

  const handlePlaceOrder = async () => {
    if (!authState.user) {
      toast({
        title: "Authentication Required",
        description: "Please log in to place an order.",
        variant: "destructive",
      })
      return
    }

    setIsProcessing(true)

    try {
      const orderData = {
        userId: authState.user.uid,
        items: cartState.items,
        deliveryAddress,
        paymentMethod,
        total: orderTotal,
        subtotal: cartState.total,
        additionalFees,
        status: "confirmed" as const,
        estimatedDelivery: new Date(Date.now() + 24 * 60 * 60 * 1000), // 24 hours from now
        createdAt: new Date(),
        updatedAt: new Date(),
        trackingSteps: [
          {
            status: "confirmed" as const,
            timestamp: new Date(),
            description: "Order confirmed and payment received",
          },
        ],
      }

      const orderId = await createOrder(authState.user.uid, orderData)

      // Clear cart after successful order
      cartDispatch({ type: "CLEAR_CART" })

      toast({
        title: "Order Placed Successfully!",
        description: `Your order #${orderId.slice(-8)} has been confirmed.`,
      })

      // Redirect to order tracking page
      router.push(`/orders/${orderId}`)
    } catch (error) {
      console.error("Error placing order:", error)
      toast({
        title: "Order Failed",
        description: "There was an error placing your order. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsProcessing(false)
    }
  }

  if (cartState.items.length === 0) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">No items to checkout</h1>
          <Link href="/">
            <Button>Continue Shopping</Button>
          </Link>
        </div>
      </div>
    )
  }

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="container mx-auto px-4 py-6">
      <div className="flex items-center mb-6">
        <Link href="/cart">
          <Button variant="ghost" size="sm">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Review Your order
          </Button>
        </Link>
      </div>

      {/* Progress Steps */}
      <div className="flex items-center justify-center mb-8">
        <div className="flex items-center space-x-4">
          <div
            className={`flex items-center justify-center w-8 h-8 rounded-full ${step >= 1 ? "bg-blue-600 text-white" : "bg-gray-200"}`}
          >
            1
          </div>
          <span className="text-sm">Review</span>
          <div className="w-16 h-0.5 bg-gray-300"></div>
          <div
            className={`flex items-center justify-center w-8 h-8 rounded-full ${step >= 2 ? "bg-blue-600 text-white" : "bg-gray-200"}`}
          >
            2
          </div>
          <span className="text-sm">Payment</span>
        </div>
      </div>

      {/* Order Items */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Order Items</CardTitle>
        </CardHeader>
        <CardContent>
          {cartState.items.map((item) => (
            <div key={item.id} className="flex items-center space-x-4 mb-4 last:mb-0">
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
        </CardContent>
      </Card>

      {/* Delivery Address */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="flex items-center">
            <MapPin className="h-5 w-5 mr-2" />
            Delivery Address
          </CardTitle>
        </CardHeader>
        <CardContent>
          {deliveryAddress ? (
            <div className="p-4 bg-gray-50 rounded-lg">
              <p>{deliveryAddress}</p>
              <Button
                variant="outline"
                size="sm"
                className="mt-2 bg-transparent"
                onClick={() => setIsAddressDialogOpen(true)}
              >
                Change Address
              </Button>
            </div>
          ) : (
            <div className="space-y-4">
              {authState.user?.address && (
                <div className="p-4 bg-blue-50 rounded-lg border">
                  <h4 className="font-semibold mb-2">Your Saved Address</h4>
                  <p className="text-sm text-gray-700 mb-3">{authState.user.address}</p>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      setDeliveryAddress(authState?.user?.address || "")
                      setIsAddressDialogOpen(false)
                    }}
                  >
                    Use This Address
                  </Button>
                </div>
              )}

              <Dialog open={isAddressDialogOpen} onOpenChange={setIsAddressDialogOpen}>
                <DialogTrigger asChild>
                  <Button className="w-full">
                    {authState.user?.address ? "Add New Address" : "Select Delivery Address"}
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle className="flex items-center justify-between">
                      Select Delivery Address
                      <Button variant="ghost" size="sm" onClick={() => setIsAddressDialogOpen(false)}>
                        <X className="h-4 w-4" />
                      </Button>
                    </DialogTitle>
                  </DialogHeader>

                  <div className="space-y-4">
                    <div className="text-sm font-medium">+ ADD NEW DELIVERY ADDRESS</div>

                    {/* Add this button for current location */}
                    <Button
                      type="button"
                      variant="outline"
                      className="w-full bg-transparent"
                      onClick={handleGetCurrentLocation}
                      disabled={isGettingLocation || !isLocationSupported}
                    >
                      {isGettingLocation ? (
                        <>
                          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600 mr-2"></div>
                          Getting Location...
                        </>
                      ) : (
                        <>
                          <MapPin className="h-4 w-4 mr-2" />
                          {isLocationSupported ? "Use Current Location" : "Location Not Supported"}
                        </>
                      )}
                    </Button>

                    {locationError && <div className="text-sm text-red-600 bg-red-50 p-2 rounded">{locationError}</div>}

                    <div className="space-y-3">
                      <div>
                        <Label htmlFor="name">Customer Name</Label>
                        <Input
                          id="name"
                          value={newAddress.name}
                          onChange={(e) => setNewAddress({ ...newAddress, name: e.target.value })}
                          placeholder="Enter your name"
                        />
                      </div>

                      <div>
                        <Label htmlFor="address">Full Address</Label>
                        <Input
                          id="address"
                          value={newAddress.address}
                          onChange={(e) => setNewAddress({ ...newAddress, address: e.target.value })}
                          placeholder="Enter your full address"
                        />
                      </div>

                      <div>
                        <Label htmlFor="phone">Phone Number</Label>
                        <Input
                          id="phone"
                          value={newAddress.phone}
                          onChange={(e) => setNewAddress({ ...newAddress, phone: e.target.value })}
                          placeholder="Enter your phone number"
                        />
                      </div>

                      <Button onClick={handleAddressSubmit} className="w-full">
                        Deliver to this Address
                      </Button>
                    </div>
                  </div>
                </DialogContent>
              </Dialog>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Payment Method */}
      {step === 2 && (
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex items-center">
              <CreditCard className="h-5 w-5 mr-2" />
              Payment Method
            </CardTitle>
          </CardHeader>
          <CardContent>
            <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod}>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="card" id="card" />
                <Label htmlFor="card">Credit/Debit Card</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="upi" id="upi" />
                <Label htmlFor="upi">UPI</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="cod" id="cod" />
                <Label htmlFor="cod">Cash on Delivery</Label>
              </div>
            </RadioGroup>
          </CardContent>
        </Card>
      )}

      {/* Price Details */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Price Details</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span>Total Product Price</span>
              <span>₹{cartState.total}</span>
            </div>
            <div className="flex justify-between">
              <span>Additional Fees</span>
              <span>₹{additionalFees}</span>
            </div>
            <hr />
            <div className="flex justify-between font-bold text-lg">
              <span>Order Total</span>
              <span>₹{orderTotal}</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Action Buttons */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t p-4 md:relative md:border-0 md:p-0">
        <div className="container mx-auto">
          {step === 1 ? (
            <Button
              size="lg"
              className="w-full bg-blue-600 hover:bg-blue-700"
              onClick={() => setStep(2)}
              disabled={!deliveryAddress}
            >
              Proceed to Payment
            </Button>
          ) : (
            <Button
              size="lg"
              className="w-full bg-green-600 hover:bg-green-700"
              onClick={handlePlaceOrder}
              disabled={isProcessing}
            >
              {isProcessing ? "Processing..." : "Place Order"}
            </Button>
          )}
        </div>
      </div>
    </motion.div>
  )
}
