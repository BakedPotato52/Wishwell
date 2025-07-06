import type { Category } from "./types"

export const categories: Category[] = [
    {
        id: "1",
        name: "Men",
        image: "/categories/man.svg?height=60&width=60",
        icon: "👔",
        subcategories: [
            { name: "Jackets", image: "/categories/subcategories/men/jackets.svg" },
            { name: "Jeans", image: "/categories/subcategories/men/jeans.svg" },
            { name: "Hoodies & Sweatshirts", image: "/categories/subcategories/men/hoodies.svg" },
            { name: "Bottoms", image: "/categories/subcategories/men/bottoms.svg" },
            { name: "T-Shirts", image: "/categories/subcategories/men/tshirts.svg" },
            { name: "Formal Wear", image: "/categories/subcategories/men/formal.svg" }
        ],
    },
    {
        id: "2",
        name: "Women",
        image: "/categories/women.svg?height=60&width=60",
        icon: "👗",
        subcategories: [
            { name: "Midi", image: "/categories/women/midi.svg" },
            { name: "Cargos & Joggers", image: "/categories/subcategories/women/cargos.svg" },
            { name: "Shirts", image: "/categories/subcategories/women/shirts.svg" },
            { name: "Jackets", image: "/categories/subcategories/women/jackets.svg" },
            { name: "Dresses", image: "/categories/subcategories/women/dresses.svg" },
            { name: "Tops", image: "/categories/subcategories/women/tops.svg" }
        ],
    },
    {
        id: "3",
        name: "Kids",
        image: "/categories/kids.svg?height=60&width=60",
        icon: "👶",
        subcategories: [
            { name: "Boys", image: "/categories/subcategories/kids/boys.svg" },
            { name: "Girls", image: "/categories/subcategories/kids/girls.svg" },
            { name: "Infants", image: "/categories/subcategories/kids/infants.svg" },
            { name: "School Wear", image: "/categories/subcategories/kids/school.svg" }
        ],
    },
    {
        id: "4",
        name: "Beauty & Personal care",
        image: "/categories/beauty.svg?height=60&width=60",
        icon: "💄",
        subcategories: [
            { name: "Skincare", image: "/categories/subcategories/beauty/skincare.svg" },
            { name: "Makeup", image: "/categories/subcategories/beauty/makeup.svg" },
            { name: "Hair Care", image: "/categories/subcategories/beauty/haircare.svg" },
            { name: "Fragrances", image: "/categories/subcategories/beauty/fragrances.svg" }
        ],
    },
    {
        id: "5",
        name: "Accessories",
        image: "/categories/accessories.svg?height=60&width=60",
        icon: "👜",
        subcategories: [
            { name: "Bags", image: "/categories/subcategories/accessories/bags.svg" },
            { name: "Jewelry", image: "/categories/subcategories/accessories/jewelry.svg" },
            { name: "Watches", image: "/categories/subcategories/accessories/watches.svg" },
            { name: "Sunglasses", image: "/categories/subcategories/accessories/sunglasses.svg" }
        ],
    },
    {
        id: "6",
        name: "Footwear",
        image: "/categories/footwear.svg?height=60&width=60",
        icon: "👟",
        subcategories: [
            { name: "Sneakers", image: "/categories/subcategories/footwear/sneakers.svg" },
            { name: "Formal Shoes", image: "/categories/subcategories/footwear/formal.svg" },
            { name: "Sandals", image: "/categories/subcategories/footwear/sandals.svg" },
            { name: "Boots", image: "/categories/subcategories/footwear/boots.svg" }
        ],
    },
    {
        id: "7",
        name: "Grocery & Kitchen",
        image: "/categories/grocery.svg?height=60&width=60",
        icon: "🍎",
        subcategories: [
            { name: "Fresh Produce", image: "/categories/subcategories/grocery/produce.svg" },
            { name: "Pantry", image: "/categories/subcategories/grocery/pantry.svg" },
            { name: "Kitchen Tools", image: "/categories/subcategories/grocery/tools.svg" },
            { name: "Appliances", image: "/categories/subcategories/grocery/appliances.svg" }
        ],
    },
    {
        id: "8",
        name: "Household Essentials",
        image: "/categories/households.svg?height=60&width=60",
        icon: "🏠",
        subcategories: [
            { name: "Cleaning", image: "/categories/subcategories/household/cleaning.svg" },
            { name: "Storage", image: "/categories/subcategories/household/storage.svg" },
            { name: "Decor", image: "/categories/subcategories/household/decor.svg" },
            { name: "Furniture", image: "/categories/subcategories/household/furniture.svg" }
        ],
    },
    {
        id: "9",
        name: "Electronics",
        image: "/categories/electronics.svg?height=60&width=60",
        icon: "📱",
        subcategories: [
            { name: "Phones", image: "/categories/subcategories/electronics/phones.svg" },
            { name: "Laptops", image: "/categories/subcategories/electronics/laptops.svg" },
            { name: "Audio", image: "/categories/subcategories/electronics/audio.svg" },
            { name: "Gaming", image: "/categories/subcategories/electronics/gaming.svg" }
        ],
    },
    {
        id: "10",
        name: "Sports & Fitness",
        image: "/categories/sports.svg?height=60&width=60",
        icon: "⚽",
        subcategories: [
            { name: "Gym Equipment", image: "/categories/subcategories/sports/gym.svg" },
            { name: "Sports Wear", image: "/categories/subcategories/sports/wear.svg" },
            { name: "Outdoor", image: "/categories/subcategories/sports/outdoor.svg" },
            { name: "Yoga", image: "/categories/subcategories/sports/yoga.svg" }
        ],
    },
    {
        id: "11",
        name: "Books & Media",
        image: "/categories/books.svg?height=60&width=60",
        icon: "📚",
        subcategories: [
            { name: "Fiction", image: "/categories/subcategories/books/fiction.svg" },
            { name: "Non-Fiction", image: "/categories/subcategories/books/nonfiction.svg" },
            { name: "Educational", image: "/categories/subcategories/books/educational.svg" },
            { name: "Comics", image: "/categories/subcategories/books/comics.svg" }
        ],
    },
    {
        id: "12",
        name: "Snacks & Drinks",
        image: "/categories/snacks.svg?height=60&width=60",
        icon: "🍿",
        subcategories: [
            { name: "Beverages", image: "/categories/subcategories/snacks/beverages.svg" },
            { name: "Snacks", image: "/categories/subcategories/snacks/snacks.svg" },
            { name: "Healthy Options", image: "/categories/subcategories/snacks/healthy.svg" },
            { name: "Party Packs", image: "/categories/subcategories/snacks/party.svg" }
        ],
    },
]