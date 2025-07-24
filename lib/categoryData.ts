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
        subcategories: [
            "Fresh Vegetables",
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
        subsubcategories: {
            "Fresh Vegetables": ["Vegetables", "Leafy & Seasonings", "Exotic Vegetables", "Seasonal Fruits", "Cuts & Sprouts", "Pooja & Festive", "Certified Organics", "Combos", "Bouquet & Plants", "Exotic Fruits", "Cut Fruits & Juices", "Fresh Fruits", "Frozen Vegetables"],
            "Fresh Fruits": ["Fruits", "Seasonal Fruits", "Exotic Fruits", "Cut Fruits & Juices", "Pooja & Festive", "Bouquet & Plants", "Combos", "Certified Organics", "Exotic Vegetables", "Fresh Vegetables", "Leafy & Seasonings", "Cuts & Sprouts"],
            "Dairy, Bread & Eggs": ["Bread & Buns", "Milk", "Eggs", "Curd & Yogurts", "Paneer & Cream", "Cheese", "Butter", "Batters & Chutneys", "Indian Breads", "Dairy Alternatives", "Lassi & Buttermilk", "Milkshakes", "Bakery"],
            "Cereals & Breakfast": ["Muesli & Granola", "Oats", "Kids Cereals", "Flakes", "Energy Bars", "Ready Mixes", "Pancake Mixes", "Peanut Butters", "Chocolate Spreads", "Mayo & Spreads", "Instant Oats", "Seeds & Trail Mixes", "Hot Beverages", "Juices & Fruit Drinks", "Jams", "Batters", "Gourmet"],
            "Atta, Rice & Dal": ["Basmati Rice", "Atta", "Rice", "Besan", "Sooji & Maida", "Premium Brands", "Toor/Moong/Urad", "Rajma/Chola/Others", "Poha & Puffed Rice", "Ready to Cook Flour Mix", "Millets & Daliya", "Other Flours", "Soya Chunk & Badi", "Limited Time Deal"],
            "Oils & Ghee": ["Sunflower Oil", "Mustard Oil", "Ghee", "Blended Oils", "Premium Brands", "Rice Bran Oil", "Olive Oil", "Soybean Oil", "Cold - pressed", "Limited Time Deal"],
            "Masalas": ["Powdered Spices", "Salt", "Sugar & Jaggery", "Whole Spices", "Ready Masala", "Paste & Puree", "Herbs & Seasoning", "Pickles & Chutney", "Papad & Fryums", "Coconut Milk & Powder"],
            "Dry Fruits & Seeds": ["Mixed Dry Fruits", "Almonds", "Cashews", "Dates", "Pista & Walnuts", "Makhana & Seeds", "Dried Fruits", "Nuts & Seeds Mix", "Gift Packs", "Limited Time Deal"],
            "Biscuits & Cakes": ["Value Packs", "Cakes & Pies", "Cookies", "Cream Biscuits", "Marie/Digestive", "Salted/Plain", "Wafers", "Rusk", "Dessert Mixes", "Baking ingredients", "Flavouring", "Pancake Mixes", "Gift Boxes", "Healthy Snacking", "Ice Cream Cakes"],
            "Tea, Coffee & Milk Drinks": ["Tea", "Instant Coffee", "Filter/Ground Coffee", "Green/Herbal Tea", "Cold Coffee", "Drink Mixes", "Nutrition", "Milkshake & Smoothie", "Syrups & Powder", "Premixes", "Cookies", "Gourmet"],
            "Sauces & Spreads": ["Peanut Butter", "Chocolate Spread", "Honey & Cider Vinegar", "Mayo & Spreads", "Tomato Ketchup", "Asian Sauces", "Cooking Sauces", "Dips & Dressing", "Jams", "Gourmet"],
            "Meat & Seafood": ["Fresh Chicken", "Seafood", "Mutton", "Marinated", "Cold Cuts", "Eggs", "Paste & Spreads", "Frozen Food", "Leafy & Seasonings", "Masalas", "Plant - Based Meat"]
        }
    },

    {
        id: "QWGn1RFPXrVGtNmOouDT",
        name: "Snacks & Drinks",
        image: "/categories/snacks.svg?height=60&width=60",
        icon: "🍿",
        subcategories: [
            "Cold Drinks and Juices",
            "Ice Creams and Frozen Desserts",
            "Chips and Namkeens",
            "Chocolates",
            "Noodles, Pasta, Vermicelli",
            "Frozen Food",
            "Sweets",
            "Paan Corner"
        ],
        subsubcategories: {
            "Cold Drinks and Juices": ["Top Deals", "Soft Drinks", "Juices & Drinks", "Energy Drinks", "Mango Drinks", "Fresh Juice", "Soda & Mixers", "Coconut Water", "Diet Soft Drinks", "Hydration", "Water & Ice Cubes", "Non Alcoholic", "Ice Tea & Kombucha", "Drink Mixes", "Milk Drinks", "Cold Coffee"],
            "Ice Creams and Frozen Desserts": ["Rare Finds", "Tubs & Party Packs", "Cones", "Sticks", "Guilt Free", "Kulfi", "Premium", "Cups", "Cakes & Sandwiches", "Regional Favourites", "Brownies & Cakes", "Syrups"],
            "Chips and Namkeens": ["Bestseller", "Chips & Crisps", "Nachos", "Puffs & Crunchies", "Bhujia & Namkeens", "Premium Brands", "Nuts & Makhana", "Indian Snacks", "Popcorn", "Gift Hampers", "Snack Bars", "Healthy Snacking", "Party Pack"],
            "Chocolates": ["Top Deals", "Bestseller", "Dark", "Gift Boxes", "Premium", "Milk", "Shared Packs", "Imported", "Gourmet", "Wafers", "Candies", "Gums & Mint"],
            "Noodles, Pasta, Vermicelli": ["Top Deals", "Instant Noodles", "Cup Noodles", "Korean", "Hakka", "Pasta", "Vermicelli", "Soups", "Ready to Eat"],
            "Frozen Food": ["Top Deals", "Veg Frozen", "Non Veg", "Cold Cuts", "Kebabs", "Roti", "Paranthas & Sheets", "Frozen Veg", "Momos & Bao"],
            "Sweets": ["Top Deals", "Kaju Katli & Barfi", "Rasgulla", "Gulab Jamun", "Mysore Pak", "Ladoos", "Pedhas", "Chikki", "Rasmalai", "Cakes"],
            "Paan Corner": ["Regular Cigarettes", "Flavour Cigarettes", "Smoking Accessories", "Nicotine Alternatives", "Paan & Mouth Fresheners", "Cookies & Cakes", "Chips & Crisps", "Cold Drinks & Juices"]
        }
    },

    {
        id: "J5ipSdkpu2xUG0TkUApS",
        name: "Household Essentials",
        image: "/categories/households.svg?height=60&width=60",
        icon: "🏠",
        subcategories: [
            "Home & Furnishing",
            "Kitchen & Dining",
            "Cleaning Essentials",
            "Mobiles & Electronics",
            "Appliances",
            "Books & Stationery",
            "Puja Items",
            "Toys & Games",
            "Sports & Fitness",
            "Pet Supplies"
        ],
        subsubcategories: {
            "Home & Furnishing": ["Bedsheets", "Towels", "Furnishing", "Decor", "Storage", "Tissues", "Cleaning Tools", "Party Decor", "Air Freshners", "Gardening", "Bathware", "Utility", "Pooja Needs", "Appliances", "Repellants", "Sports & Gym", "Stationery"],
            "Kitchen & Dining": ["Cookware", "Plates", "Bowls", "Crockery", "Cutlery", "Jars/Containers", "Bottles/Flasks/Tiffins", "Barware", "Bakeware/BBQ", "Chopping Tools", "Kitchen Tools", "Kitchen Appliances", "Kitchen Cleaning"],
            "Cleaning Essentials": ["Detergents", "Fabric Softeners", "Brooms & Mops", "Floor Cleaner", "Utensil Cleaner", "Kitchen Cleaning", "Dustbins", "Cloth", "Disinfectant", "Toilet Cleaner", "Bathroom Cleaning", "Wipers", "Glass Cleaner", "Sink Brush", "Toxin Free"],
            "Mobiles & Electronics": ["Mobiles", "Earbuds", "Speakers", "Smart Watches", "Kitchen/Home Appliances", "Personal Care", "Health Care", "Powerbanks/Chargers", "Streaming Devices", "Lights", "Batteries", "Computer Accessories"],
            "Appliances": ["Mixer", "Blenders", "Kettles", "Choppers", "Toasters", "AirFryers", "Induction", "Irons", "Heaters", "Vacuum", "Fans", "Cameras", "Networking", "Others"],
            "Books & Stationery": ["Pens/Pencils/Highlighters", "Notebooks", "Diaries", "Stationery", "School Supplies", "Colouring", "Craft", "Bags", "Tiffins", "Bottles"],
            "Puja Items": ["Idols/Books", "Diya/Baati", "Agarbatti", "Dhoop", "Hawan", "Tika/Mala", "Kalash/Gangajal", "Camphor", "Sambrani", "Flowers/Leaves", "Ghee/Oil", "Puja Thali", "Cloth", "Decor", "Fresh Fruits", "Dry Fruits", "Sweets"],
            "Toys & Games": ["Soft Toys", "Board Games", "STEAM", "Toy Cars", "Building Blocks", "Newly Added", "Baby Toys", "Pretend Play", "Art & Crafts", "Action Figures", "Outdoor Toys", "Ride - Ons", "Pool Toys", "Musical Toys", "Dough"],
            "Sports & Fitness": ["Badminton", "Cricket", "Football", "Gym Accessories", "Yoga", "Pain & Wound", "Outdoor Toys", "Chess", "Table Tennis", "Cycling", "PickleBall"],
            "Pet Supplies": ["Cat Food", "Dog Food", "Pet Treats", "Accessories/Toys", "Grooming & Supplements"]
        },
    },

    {
        id: "lZ2d1eCsMNTx85RvyXvZ",
        name: "Gifts",
        image: "/categories/gifts.svg?height=60&width=60",
        icon: "📱",
        subcategories: [
            "Birthday Gifts",
            "Anniversary Gifts",
            "Cakes",
            "Flowers",
            "Chocolates",
            "Toys",
            "Custom Gifts",
            "Gift Hampers",
            "For Him",
            "For Her",
            "Home Decor",
            "Festive Gifts",
        ],
        subsubcategories: {
            "Birthday Gifts": ["Birthday Cakes(Designer, Bento, Photo)", "Birthday Flowers(Roses, Bouquets)", "Greeting Cards", "Balloons / Decor", "Chocolates", "Personalized Gifts(Mugs, Cushions, Photo Frames)", "Hampers", "Candles", "Return Gifts", "Party Essentials"],
            "Anniversary Gifts": ["Cakes(Heart, Premium, Bento)", "Flowers(Roses, Lilies)", "Decor & Hampers", "Chocolates / Sweets", "Personalized Gifts", "Couple Hampers", "Luxury Perfumes", "Cards & Candles", "Jewelry"],
            "Cakes": ["Designer", "Bento", "Chocolate", "Black Forest", "Red Velvet", "Fruit Cakes", "Cupcakes", "Jar Cakes", "Theme Cakes", "Eggless", "Sugar - Free", "Premium"],
            "Flowers": ["Roses", "Lilies/Orchids", "Exotic", "Mixed", "Carnations/Tulips", "Premium Baskets", "Hampers", "Indoor Plants", "Forever Roses"],
            "Chocolates": ["Dark", "Imported", "Assorted", "Handmade", "Bouquets", "Truffles", "Hampers", "Sugar-Free"],
            "Toys": ["Soft Toys", "Dolls", "Cars/Bikes", "Action Figures", "Board Games", "Educational", "Kid Sets", "Character Themed"],
            "Custom Gifts": ["Mugs", "Cushions", "Keychains", "Frames", "Custom Jewelry", "Name Plates", "Custom Phone Cases", "Hampers", "Wall Clocks", "Pens"],
            "Gift Hampers": ["Chocolate", "Gourmet", "Dry Fruit", "Luxury", "Spa/Beauty", "Festival", "Corporate", "Baby", "Wine/Beverage"],
            "For Him": ["Wallets & Belts", "Perfumes & Deos", "Watches", "Gadgets", "Grooming Kits", "Eyewear", "Personalized", "Keychains", "Office Gifts", "Choco Combos"],
            "For Her": ["Jewelry", "Handbags/Wallets", "Perfumes/Body Mists", "Makeup Kits", "Hair Accessories", "Personalized Gifts", "Watches", "Choco/Flower Combos", "Luxury Hampers"],
            "Home Decor": ["Lamps & Candles", "Frames/Paintings", "Plants & Pots", "Table Decor", "Showpieces", "Diffusers", "Clocks", "Home Gift Sets"],
            "Festive Gifts": ["Diwali Hampers", "Rakhi & Gifts", "Karwa Chauth", "Eid Hampers", "Holi Hampers", "New Year Hampers", "Christmas", "Pooja Essentials", "Ganesh Gifts"]
        }
    }

]