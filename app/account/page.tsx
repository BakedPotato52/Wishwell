"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import Link from "next/link"
import { ArrowLeft, Camera, Edit, LogOut } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useAuth } from "@/contexts/auth-context"

export default function AccountPage() {
  const { state: authState, updateUser, logout } = useAuth()
  const [isEditing, setIsEditing] = useState(false)
  const [formData, setFormData] = useState({
    name: authState.user?.name || "ABC",
    phone: authState.user?.phone || "+9153652365",
    whatsapp: authState.user?.whatsapp || "+917632467",
    gender: authState.user?.gender || "Men",
    address: authState.user?.address || "North Duragamar, khowai",
    landmark: "near ABC school",
  })

  const handleSave = async () => {
    try {
      await updateUser(formData)
      setIsEditing(false)
    } catch (error) {
      console.error("Error updating profile:", error)
    }
  }

  const handleLogout = async () => {
    try {
      await logout()
    } catch (error) {
      console.error("Error logging out:", error)
    }
  }

  if (!authState.isAuthenticated) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Please Login</h1>
          <Link href="/login">
            <Button>Login</Button>
          </Link>
        </div>
      </div>
    )
  }

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="container mx-auto px-4 py-6">
      <div className="flex items-center justify-between mb-6">
        <Link href="/">
          <Button variant="ghost" size="sm">
            <ArrowLeft className="h-4 w-4 mr-2" />
            My Account
          </Button>
        </Link>

        <div className="flex space-x-2">
          <Button variant="outline" size="sm" onClick={() => setIsEditing(!isEditing)}>
            <Edit className="h-4 w-4 mr-1" />
            {isEditing ? "Cancel" : "Edit Profile"}
          </Button>
          <Button variant="outline" size="sm" onClick={handleLogout}>
            <LogOut className="h-4 w-4 mr-1" />
            Logout
          </Button>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Profile Information</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Profile Photo */}
          <div className="flex flex-col items-center space-y-2">
            <Avatar className="w-24 h-24">
              <AvatarImage src="/placeholder-user.jpg" />
              <AvatarFallback className="text-2xl">{formData.name.charAt(0)}</AvatarFallback>
            </Avatar>
            {isEditing && (
              <Button variant="outline" size="sm">
                <Camera className="h-4 w-4 mr-1" />
                Edit Photo
              </Button>
            )}
          </div>

          {/* Form Fields */}
          <div className="space-y-4">
            <div>
              <Label htmlFor="name">Full Name</Label>
              {isEditing ? (
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                />
              ) : (
                <p className="mt-1 text-lg">{formData.name}</p>
              )}
            </div>

            <div>
              <Label htmlFor="phone">Phone No</Label>
              {isEditing ? (
                <Input
                  id="phone"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                />
              ) : (
                <p className="mt-1 text-lg">{formData.phone}</p>
              )}
            </div>

            <div>
              <Label htmlFor="whatsapp">WhatsApp No</Label>
              {isEditing ? (
                <div className="space-y-2">
                  <Input
                    id="whatsapp"
                    value={formData.whatsapp}
                    onChange={(e) => setFormData({ ...formData, whatsapp: e.target.value })}
                  />
                  <Button variant="outline" size="sm">
                    Verify
                  </Button>
                </div>
              ) : (
                <p className="mt-1 text-lg">{formData.whatsapp}</p>
              )}
            </div>

            <div>
              <Label>Gender</Label>
              {isEditing ? (
                <RadioGroup
                  value={formData.gender}
                  onValueChange={(value) => setFormData({ ...formData, gender: value as "Men" | "Women" })}
                  className="flex space-x-4 mt-2"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="Men" id="men" />
                    <Label htmlFor="men">Men</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="Women" id="women" />
                    <Label htmlFor="women">Women</Label>
                  </div>
                </RadioGroup>
              ) : (
                <p className="mt-1 text-lg">{formData.gender}</p>
              )}
            </div>

            <div>
              <Label htmlFor="address">Address</Label>
              {isEditing ? (
                <Input
                  id="address"
                  value={formData.address}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                />
              ) : (
                <p className="mt-1 text-lg">{formData.address}</p>
              )}
            </div>

            <div>
              <Label htmlFor="landmark">Landmark</Label>
              {isEditing ? (
                <Input
                  id="landmark"
                  value={formData.landmark}
                  onChange={(e) => setFormData({ ...formData, landmark: e.target.value })}
                />
              ) : (
                <p className="mt-1 text-lg">{formData.landmark}</p>
              )}
            </div>
          </div>

          {isEditing && (
            <Button onClick={handleSave} className="w-full">
              Save Changes
            </Button>
          )}
        </CardContent>
      </Card>
    </motion.div>
  )
}
