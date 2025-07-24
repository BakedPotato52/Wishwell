import type { Category } from "./types"

export const categories: Category[] = [
    {
        id: "vKvRUECQh9cC5XxYcDZR",
        name: "Men",
        image: "/categories/man.svg?height=60&width=60",
        icon: "👔",
        subcategories: [
            "Topwear",
            "Bottomwear",
            "Athleisure",
            "Ethnic & Fusion Wear",
            "Sleepwear",
            "Innerwear",
            "Co-ords",

        ],
        subsubcategories: {
            "Topwear": ["T-Shirts", "Jackets", "Hoodies & Sweatshirts", "Sweaters", "Shirts", "Formal Shirts"],
            "Bottomwear": ["Pants & Trousers", "Shorts", "Jeans", "Cargos & Joggers", "Sweatpants", "Formal Pants"],
            "Athleisure": ["T-Shirts", "Bottoms", "Tops"],
            "Ethnic & Fusion Wear": ["Sherwanis", "Bottoms", "Nehru Jackets", "Kurta", "Kurta Sets"],
            "Sleepwear": ["Bottoms", "Sets"],
            "Innerwear": ["Briefs & Trunks", "Boxers", "Vests"],
            "Co-ords": ["Pants Sets", "Shorts Sets"],
        },

    },
    {
        id: "YSXF9pgW3DZU2bSSIUnQ",
        name: "Women",
        image: "/categories/women.svg?height=60&width=60",
        icon: "👗",
        subcategories: [
            "Top wear",
            "Bottom wear",
            "Dresses",
            "Ethnic & Fusion Wear",
            "Lingerie",
            "Athleisure",
            "Sleepwear",
            "Innerwear",
            "Co-ords",
            "Jumpsuits",
        ],
        subsubcategories: {
            "Top wear": ["Tops", "T-Shirts", "Shirts", "Sweaters", "Hoodies & Sweatshirts", "Cardigans & Shrugs", "Blazers & Waistcoats"],
            "Bottom wear": ["Shorts", "Jeans", "Pants & Trousers", "Skirts", "Skorts", "Sweatpants", "Cargos & Joggers"],
            "Dresses": ["Midi", "Mini", "Maxi"],
            "Ethnic & Fusion Wear": ["Sarees", "Tops & Tunics", "Blouses", "Bottoms", "Kurtas", "Kurta Sets", "Co-ords"],
            "Lingerie": ["Accessories", "Night Dress & Sets", "Swimwear"],
            "Athleisure": ["Tops", "Bottoms", "Playsuits"],
            "Sleepwear": ["Tops", "Bottoms", "Night Dresses", "Sets"],
            "Innerwear": ["Shapewear", "Briefs & Panties", "Bras & Camisoles", "Sets"],
            "Co-ords": ["Pants Sets", "Shorts Sets", "Skirt Sets", "Night Dress Sets"],
            "Jumpsuits": ["Western", "Ethnic"],
        }
    },

    {
        id: "E4pNgzjp1mMFalyRfTjc",
        name: "Kids",
        image: "/categories/kids.svg?height=60&width=60",
        icon: "👶",
        subcategories: [
            "Boys Clothing",
            "Boys Footwear",
            "Girls Clothing",
            "Girls Footwear",
            "Infants",
            "Bags & Accessories",
            "Toys",
            "Shop By Age",
        ],
        subsubcategories: {
            "Boys Clothing": ["T-Shirts", "Shirts", "Jeans & Trousers", "Shorts & Capris", "Clothing Sets", "Innerwear", "Ethnicwear", "Nightwear"],
            "Boys Footwear": ["Casual Shoes", "Sandals", "Sports Shoes", "Flip Flops & Slippers"],
            "Girls Clothing": ["Dresses", "Frocks & Jumpsuits", "Tops", "T-Shirts & Shirts", "Skirts & Shorts", "Clothing Sets", "Innerwear", "Ethnicwear", "Nightwear"],
            "Girls Footwear": ["Flats & Casual Shoes", "Flip Flops", "Sports Shoes"],
            "Infants": ["Rompers & Onesies", "Clothing Sets", "Tops & T-Shirts", "Bottomwear", "Dresses & Frocks", "Nightwear", "Innerwear"],
            "Bags & Accessories": ["Bags & Bagpacks", "Watches", "Sunglasses & Frames", "Sports Accessories & Equipment"],
            "Toys": ["Action Figures", "Dolls", "Puzzles", "Board Games"],
            "Shop By Age": ["0-2 Years", "2-5 Years", "5-8 Years", "8-12 Years", "12+ Years"]
        }
    },

    {
        id: "TuaQdrS7gWIJpjN4Ycax",
        name: "Beauty & Personal care",
        image: "/categories/beauty.svg?height=60&width=60",
        icon: "💄",
        subcategories: [
            "Skincare",
            "Makeup",
            "Hair Care",
            "Fragrances",
            "Bath & Body",
            "Oral Care",
            "Grooming",
            "Baby Care",
            "Protein & Supplements",
            "Feminine Hygiene",
            "Sexual Wellness",
            "Health & Pharma"
        ],
        subsubcategories: {
            "Skincare": ["Facewash & scrubs", "Masks & Cleansers", "Serums & Toners", "Creams & Moisturizers", "Sunscreen", "Body Lotions", "Beauty Supplements"],
            "Makeup": ["Lips", "Eyes", "Face", "Nails", "Tools & Brushes"],
            "Hair Care": ["Hair Oils & Serums", "Shampoo", "Conditioners & Masks", "Hair Colour", "Premium Brands", "Hair Styling Gels & Creams", "Combs & Brushes", "Hair Dryers and Stylers", "Hair Supplements"],
            "Fragrances": ["Men's Perfume", "Women's Perfume", "Men's Deo", "Women's Deo", "Premium Brands", "Roll On", "Talc"],
            "Bath & Body": ["Soaps", "Shower Gels & Body Wash", "Body Lotion", "Body Scrub", "Premium Brands", "Baby Bathing", "Talcs", "Hand wash & Sanitizers", "Face Wash & Scrubs", "Shampoo", "Conditioner & Mask", "Bath Accessories", "Kits/Gifts"],
            "Oral Care": ["Toothpaste", "Toothbrushes", "Mouthwash", "Oral Care Accessories", "Kids Toothbrush", "Kids Toothpaste"],
            "Grooming": ["Shaving Cartridges", "Men's Razor", "Shaving Foam & Creams", "Brush & kit", "After shave", "Men's Hair removal", "Hair styling", "Beard Styling", "Women's Hair removal cream", "Women’s Razor", "Women’s Waxing", "Trimmers/Shavers", "Epilators", "Multi Groomers"],
            "Baby Care": ["Diapers", "Food & Formula", "Bathing", "Wipes", "Cream & Lotions", "Oral Care", "Oil & Talc", "Pharma", "Feeding & Teething", "Books/Toys", "Baby Hygiene", "Mom Care", "Travel/Baby Gear", "Clothes / Accessories"],
            "Protein & Supplements": ["Protein & Nutrition", "Immunity & Energy Boosters", "Multivitamins", "Ayurvedic", "Gummies", "Bone & Joint Supplements", "Hair/Nail/Skin Supplements", "Sleep Supplements", "Bars", "Superfoods", "Weight Management"],
            "Feminine Hygiene": ["Pads", "Panties & Liners", "Hair Removal", "Menstrual Cups & Tampons", "Intimate Wipes & Wash", "Disposal Bags", "Cramp Relief"],
            "Sexual Wellness": ["Condoms", "Lubricants", "Massagers", "Enhancers", "Gift Kits", "Contraceptives"],
            "Health & Pharma": ["Cough Cold/Fever", "Stomach", "Calcium/Vitamin D", "Wound/Pain Relief", "Oral/Dental", "Derma", "ENT", "Digestives", "Masks/Sanitizers", "Pregnancy Kit", "Medical Devices", "Adult Diapers", "Handwash", "Wellness", "Protein", "Boosters", "Sexual enhancers", "Nutritional Supplements"]
        }
    },
    {
        id: "kCxJLwMwO86hlBK6gvrV",
        name: "Accessories",
        image: "/categories/accessories.svg?height=60&width=60",
        icon: "👜",
        subcategories: [
            "Womems Jwellery",
            "Men's Jewellery",
            "Men's Accessories",
            "Women's Accessories",
        ],
        subsubcategories: {
            "Womems Jwellery": ["Pendants", "Necklace & Chains", "Rings", "Bracelets", "Waist Chains", "Anklets", "Chains & Charms", "Earrings", "Bangles", "Jewellery Sets"],
            "Men's Jewellery": ["Rings", "Chains & Pendants", "Bracelets", "Earrings"],
            "Men's Accessories": ["Watches", "Wallets", "Belts", "Perfumes", "Caps & Hats", "Socks", "Tie & Brooches", "Eyewear"],
            "Women's Accessories": ["Belts", "Handbags & Wallets", "Caps & Hats", "Watches", "Perfumes", "Stockings", "Charms Brooches & Pins", "Hair Accessories", "Wallets", "Socks", "Eyewear"]
        }

    },
    {
        id: "XOI5U08K2tpZiqM94Snd",
        name: "Footwear",
        image: "/categories/footwear.svg?height=60&width=60",
        icon: "👟",
        subcategories: [
            "Women's Footwear",
            "Men's Footwear",
        ],
        subsubcategories: {
            "Women's Footwear": ["Heels", "Casual Shoes", "Flip Flops", "Flats & Sandals"],
            "Men's Footwear": ["Flats & Sandals", "Flip Flops", "Ethnic", "Casual Shoes", "Formals"],
        }
    },
    {
        id: "XUa310B6lLXC8HgqFgWl",
        name: "Grocery & Kitchen",
        image: "/categories/grocery.svg?height=60&width=60",
        icon: "🍎",
        subcategories: ["Fresh Vegetables",
            "Fresh Fruits",
            "Dairy, Bread & Eggs",
            "Cereals & Breakfast",
            "Atta, Rice & Dal",
            "Oils & Ghee",
            "Masalas",
            "Dry Fruits & Seeds",
            "Biscuits & Cakes",
            "Tea, Coffee & Milk Drinks",
            "Sauces & Spreads",
            "Meat & Seafood"
        ],
    },
    {
        id: "J5ipSdkpu2xUG0TkUApS",
        name: "Household Essentials",
        image: "/categories/households.svg?height=60&width=60",
        icon: "🏠",
        subcategories: ["Home & Furnishing",
            "Kitchen & Dining",
            "Cleaning Essentials",
            "Clothing",
            "Mobiles & Electronics",
            "Appliances",
            "Books & Stationery",
            "Jewellery & Accessories",
            "Puja Items",
            "Toys & Games",
            "Sports & Fitness",
            "Pet Supplies"
        ],
    },

    {
        id: "QWGn1RFPXrVGtNmOouDT",
        name: "Snacks & Drinks",
        image: "/categories/snacks.svg?height=60&width=60",
        icon: "🍿",
        subcategories: ["Cold Drinks and Juices",
            "Ice Creams and Frozen Desserts",
            "Chips and Namkeens",
            "Chocolates",
            "Noodles, Pasta, Vermicelli",
            "Frozen Food",
            "Sweets",
            "Paan Corner"
        ],
    },
    {
        id: "lZ2d1eCsMNTx85RvyXvZ",
        name: "Gifts",
        image: "/categories/gifts.svg?height=60&width=60",
        icon: "📱",
        subcategories: [
            "Birthday Gifts",
            "Anniversary Gifts",
            "Wedding Gifts",
            "Cake Delivery",
            "Flower Delivery",
            "Personalized Gifts",
            "Chocolate Gifts",
            "Toy Gifts",
            "Home Decor Gifts",
            "Festive Gifts",
        ],
    }

]