import type { Category } from "./types"

export const categories: Category[] = [

    {
        id: "1",
        name: "Men",
        image: "/categories/man.svg?height=60&width=60",
        icon: "👔",
        subcategories: ["Jackets", "Jeans", "Hoodies & Sweatshirts", "Bottoms", "T-Shirts", "Formal Wear"],
    },
    {
        id: "2",
        name: "Women",
        image: "/categories/women.svg?height=60&width=60",
        icon: "👗",
        subcategories: ["Midi", "Cargos & Joggers", "Shirts", "Jackets", "Dresses", "Tops"],
    },

    {
        id: "3",
        name: "Kids",
        image: "/categories/kids.svg?height=60&width=60",
        icon: "👶",
        subcategories: ["Boys", "Girls", "Infants", "School Wear"],
    },
    {
        id: "4",
        name: "Beauty & Personal care",
        image: "/categories/beauty.svg?height=60&width=60",
        icon: "💄",
        subcategories: ["Skincare", "Makeup", "Hair Care", "Fragrances"],
    },
    {
        id: "5",
        name: "Accessories",
        image: "/categories/accessories.svg?height=60&width=60",
        icon: "👜",
        subcategories: ["Bags", "Jewelry", "Watches", "Sunglasses"],
    },
    {
        id: "6",
        name: "Footwear",
        image: "/categories/footwear.svg?height=60&width=60",
        icon: "👟",
        subcategories: ["Sneakers", "Formal Shoes", "Sandals", "Boots"],
    },
    {
        id: "7",
        name: "Grocery & Kitchen",
        image: "/categories/grocery.svg?height=60&width=60",
        icon: "🍎",
        subcategories: ["Fresh Produce", "Pantry", "Kitchen Tools", "Appliances"],
    },
    {
        id: "8",
        name: "Household Essentials",
        image: "/categories/households.svg?height=60&width=60",
        icon: "🏠",
        subcategories: ["Cleaning", "Storage", "Decor", "Furniture"],
    },
    {
        id: "9",
        name: "Electronics",
        image: "/categories/electronics.svg?height=60&width=60",
        icon: "📱",
        subcategories: ["Phones", "Laptops", "Audio", "Gaming"],
    },
    {
        id: "10",
        name: "Sports & Fitness",
        image: "/categories/sports.svg?height=60&width=60",
        icon: "⚽",
        subcategories: ["Gym Equipment", "Sports Wear", "Outdoor", "Yoga"],
    },
    {
        id: "11",
        name: "Books & Media",
        image: "/categories/books.svg?height=60&width=60",
        icon: "📚",
        subcategories: ["Fiction", "Non-Fiction", "Educational", "Comics"],
    },
    {
        id: "12",
        name: "Snacks & Drinks",
        image: "/categories/snacks.svg?height=60&width=60",
        icon: "🍿",
        subcategories: ["Beverages", "Snacks", "Healthy Options", "Party Packs"],
    },
]