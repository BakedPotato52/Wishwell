"use client"

import { useState } from "react"
import { Heart, Share2, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { useWishlist } from "@/contexts/wishlist-context"
import { WishlistItemCard } from "@/components/wishlist-item-card"
import { toast } from "sonner"

export default function WishlistPage() {
    const { items, loading, clearAll, shareWishlist, itemCount } = useWishlist()
    const [shareDialogOpen, setShareDialogOpen] = useState(false)
    const [shareForm, setShareForm] = useState({
        name: "",
        description: "",
        isPublic: false,
    })

    const handleShare = async () => {
        try {
            const shareToken = await shareWishlist(shareForm.name, shareForm.description, shareForm.isPublic)

            const shareUrl = `${window.location.origin}/wishlist/shared/${shareToken}`

            if (navigator.share) {
                await navigator.share({
                    title: shareForm.name,
                    text: shareForm.description,
                    url: shareUrl,
                })
            } else {
                await navigator.clipboard.writeText(shareUrl)
                toast.success("Share link copied to clipboard!")
            }

            setShareDialogOpen(false)
            setShareForm({ name: "", description: "", isPublic: false })
        } catch (error) {
            console.error("Error sharing wishlist:", error)
        }
    }

    const handleClearAll = async () => {
        if (window.confirm("Are you sure you want to clear your entire wishlist?")) {
            await clearAll()
        }
    }

    if (loading) {
        return (
            <div className="container mx-auto px-4 py-8">
                <div className="flex items-center justify-center h-64">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
                </div>
            </div>
        )
    }

    return (
        <div className="container mx-auto px-4 py-8">
            {/* Header */}
            <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-3">
                    <Heart className="h-8 w-8 text-red-500" />
                    <div>
                        <h1 className="text-3xl font-bold">My Wishlist</h1>
                        <p className="text-muted-foreground">
                            {itemCount} {itemCount === 1 ? "item" : "items"} saved for later
                        </p>
                    </div>
                </div>

                {itemCount > 0 && (
                    <div className="flex flex-col gap-2">
                        <Dialog open={shareDialogOpen} onOpenChange={setShareDialogOpen}>
                            <DialogTrigger asChild>
                                <Button variant="outline">
                                    <Share2 className="h-4 w-4 mr-2" />
                                    Share
                                </Button>
                            </DialogTrigger>
                            <DialogContent>
                                <DialogHeader>
                                    <DialogTitle>Share Your Wishlist</DialogTitle>
                                </DialogHeader>
                                <div className="space-y-4">
                                    <div>
                                        <Label htmlFor="name">Wishlist Name</Label>
                                        <Input
                                            id="name"
                                            value={shareForm.name}
                                            onChange={(e) => setShareForm({ ...shareForm, name: e.target.value })}
                                            placeholder="My Awesome Wishlist"
                                        />
                                    </div>
                                    <div>
                                        <Label htmlFor="description">Description (Optional)</Label>
                                        <Textarea
                                            id="description"
                                            value={shareForm.description}
                                            onChange={(e) => setShareForm({ ...shareForm, description: e.target.value })}
                                            placeholder="Items I'm hoping to get..."
                                            rows={3}
                                        />
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        <Switch
                                            id="public"
                                            checked={shareForm.isPublic}
                                            onCheckedChange={(checked) => setShareForm({ ...shareForm, isPublic: checked })}
                                        />
                                        <Label htmlFor="public">Make this wishlist public</Label>
                                    </div>
                                    <Button onClick={handleShare} className="w-full" disabled={!shareForm.name}>
                                        Share Wishlist
                                    </Button>
                                </div>
                            </DialogContent>
                        </Dialog>

                        <Button variant="outline" onClick={handleClearAll}>
                            <Trash2 className="h-4 w-4 mr-2" />
                            Clear All
                        </Button>
                    </div>
                )}
            </div>

            {/* Wishlist Items */}
            {itemCount === 0 ? (
                <Card>
                    <CardContent className="flex flex-col items-center justify-center py-16">
                        <Heart className="h-16 w-16 text-muted-foreground mb-4" />
                        <h2 className="text-xl font-semibold mb-2">Your wishlist is empty</h2>
                        <p className="text-muted-foreground text-center mb-6">
                            Start adding items you love to keep track of them for later
                        </p>
                        <Button asChild>
                            <a href="/">Continue Shopping</a>
                        </Button>
                    </CardContent>
                </Card>
            ) : (
                <div className="grid gap-4">
                    {items.map((item) => (
                        <WishlistItemCard key={item.id} item={item} />
                    ))}
                </div>
            )}
        </div>
    )
}
