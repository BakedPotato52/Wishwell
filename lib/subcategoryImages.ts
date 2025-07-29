// Enhanced mapping that supports context-aware image retrieval
export interface SubcategoryImageConfig {
    // Default image for when no context is provided
    default: string
    // Context-specific images: parentCategory -> image
    contexts?: Record<string, string>
}

// Enhanced subcategory images with context support
export const subcategoryImages: Record<string, string | SubcategoryImageConfig> = {
    // Default fallback
    default: "/placeholder.svg?height=64&width=64",

    // All categories
    All: "/categories/subcategory/shirts.png",

    // Men's subcategories - these are unique so keep as strings
    Topwear: "https://res.cloudinary.com/wishwell/image/upload/v1753591719/Top_Wear_ogu0pi.png?height=64&width=64",
    Bottomwear: "https://res.cloudinary.com/wishwell/image/upload/v1753592132/Bottom_Wear_njaneq.png?height=64&width=64",
    Sweaters: "https://res.cloudinary.com/wishwell/image/upload/v1753591718/Sweaters_hcbbbf.png?height=64&width=64",
    "Formal Shirts":
        "https://res.cloudinary.com/wishwell/image/upload/v1753591718/Formals_Shirts_wclfcs.jpg?height=64&width=64",
    "Formal Pants":
        "https://res.cloudinary.com/wishwell/image/upload/v1753592133/Formals_Pants_weagmj.jpg?height=64&width=64",
    "Ethnic & Fusion Wear":
        "https://res.cloudinary.com/wishwell/image/upload/v1753592625/Ethnic_fusion_wear_tuphzl.png?height=64&width=64",
    "Sherwanis": "https://res.cloudinary.com/wishwell/image/upload/v1753592631/Sherwani_kqy8tl.png?height=64&width=64",
    "Nehru Jackets": "https://res.cloudinary.com/wishwell/image/upload/v1753592626/Nehru_Jackets_g2yahq.png?height=64&width=64",
    "Briefs & Trunks": "https://res.cloudinary.com/wishwell/image/upload/v1753592925/Briefs_Trunks_so7vjy.png?height=64&width=64",
    "Boxers": "https://res.cloudinary.com/wishwell/image/upload/v1753592925/Boxers_slla9f.png?height=64&width=64",
    "Vests": "https://res.cloudinary.com/wishwell/image/upload/v1753592926/Vests_ddhtpd.png?height=64&width=64",


    // Women's subcategories
    "Top wear": "https://res.cloudinary.com/wishwell/image/upload/v1753772909/Top_Wear_dfzz6v.png?height=64&width=64",
    "Bottom wear": "https://res.cloudinary.com/wishwell/image/upload/v1753773914/Bottom_Wear_bdifga.png?height=64&width=64",
    "Sleep wear": "https://res.cloudinary.com/wishwell/image/upload/v1753777361/Sleepwear_ogbrzj.png?height=64&width=64",
    "Inner wear": "https://res.cloudinary.com/wishwell/image/upload/v1753777671/Innerwear_h9i6ul.png?height=64&width=64",
    "Co ords": "https://res.cloudinary.com/wishwell/image/upload/v1753777898/Co-ords_ubqyv3.png?height=64&width=64",
    "Cardigans & Shrugs": "https://res.cloudinary.com/wishwell/image/upload/v1753772905/Cardigans_Shrugs_lyu05f.png?height=64&width=64",
    "Blazers & Waistcoats": "https://res.cloudinary.com/wishwell/image/upload/v1753772905/Blazers_Waistcoats_lhu4r0.png?height=64&width=64",
    "Skirts": "https://res.cloudinary.com/wishwell/image/upload/v1753773921/Skirts_xeupmu.png?height=64&width=64",
    "Skorts": "https://res.cloudinary.com/wishwell/image/upload/v1753773924/Skorts_cm2voa.png?height=64&width=64",
    Dresses: "https://res.cloudinary.com/wishwell/image/upload/v1753774476/Dresses_eii8ji.png?height=64&width=64",
    "Midi": "https://res.cloudinary.com/wishwell/image/upload/v1753774477/Midi_kivkya.png?height=64&width=64",
    "Mini": "https://res.cloudinary.com/wishwell/image/upload/v1753774480/Mini_dyenx8.png?height=64&width=64",
    "Maxi": "https://res.cloudinary.com/wishwell/image/upload/v1753774476/Maxi_w4q2te.png?height=64&width=64",
    "Sarees": "https://res.cloudinary.com/wishwell/image/upload/v1753774649/Sarees_ntoe0p.png?height=64&width=64",
    "Tops & Tunics": "https://res.cloudinary.com/wishwell/image/upload/v1753774650/Tops_Tunics_dwp782.png?height=64&width=64",
    "Blouses": "https://res.cloudinary.com/wishwell/image/upload/v1753774640/Blouses_wm7dkc.png?height=64&width=64",
    "Ethnic & Fusion-Wear": "https://res.cloudinary.com/wishwell/image/upload/v1753774645/Ethnic_fusion_wear_q6ap6e.png?height=64&width=64",
    "Lingerie": "https://res.cloudinary.com/wishwell/image/upload/v1753776724/Lingerie_eecgjt.png?height=64&width=64",
    "Accessories": "https://res.cloudinary.com/wishwell/image/upload/v1753776724/Accessories_hyeug5.png?height=64&width=64",
    "Night Dress & Sets": "https://res.cloudinary.com/wishwell/image/upload/v1753776725/Night_Dress_Sets_hzmcrp.png?height=64&width=64",
    "Swimwear": "https://res.cloudinary.com/wishwell/image/upload/v1753776729/Swimwear_vq3jsd.png?height=64&width=64",
    "Playsuits": "https://res.cloudinary.com/wishwell/image/upload/v1753776812/Playsuits_ppxf02.png?height=64&width=64",
    "Night Dresses": "https://res.cloudinary.com/wishwell/image/upload/v1753777357/Night_Dresses_tg38pu.png?height=64&width=64",
    "Shapewear": "https://res.cloudinary.com/wishwell/image/upload/v1753777676/Shapewears_hfpwpl.png?height=64&width=64",
    "Briefs & Panties": "https://res.cloudinary.com/wishwell/image/upload/v1753777668/Bottoms_Panties_gxc3br.png?height=64&width=64",
    "Bras & Camisoles": "https://res.cloudinary.com/wishwell/image/upload/v1753777668/Bras_Camisoles_khvn5h.png?height=64&width=64",

    "Skirt Sets": "https://res.cloudinary.com/wishwell/image/upload/v1753777905/Skirt_Sets_qi5az4.png?height=64&width=64",
    "Night Dress Sets": "https://res.cloudinary.com/wishwell/image/upload/v1753777898/Night_Dresses_Pant_Sets__sxbpxm.png?height=64&width=64",
    "Jumpsuits": "https://res.cloudinary.com/wishwell/image/upload/v1753778120/Jumpsuits_ma3lvx.png?height=64&width=64",
    "Western": "https://res.cloudinary.com/wishwell/image/upload/v1753778123/Western_Jumpsuits_zpkkxm.png?height=64&width=64",
    "Ethnic": "https://res.cloudinary.com/wishwell/image/upload/v1753778119/Ethnic_Jumpsuits_mmyive.png?height=64&width=64",
    // Context-aware subcategories that appear in multiple categories
    Tops: {
        default: "https://res.cloudinary.com/wishwell/image/upload/v1753772910/Tops_qisl6t.png?height=64&width=64",
        contexts: {
            "Men-Athleisure":
                "https://res.cloudinary.com/wishwell/image/upload/v1753592373/Tops_sajpn0.png?height=64&width=64",
            "Women-Top wear":
                "https://res.cloudinary.com/wishwell/image/upload/v1753772910/Tops_qisl6t.png?height=64&width=64",
            "Women-Athleisures": "https://res.cloudinary.com/wishwell/image/upload/v1753776815/Tops_ene74n.png?height=64&width=64",
            "Women-Sleep wear": "https://res.cloudinary.com/wishwell/image/upload/v1753777364/Tops_x6iyql.png?height=64&width=64",
        },
    },


    Bottoms: {
        contexts: {
            "Men-Athleisure":
                "https://res.cloudinary.com/wishwell/image/upload/v1753592302/Bottoms_iq23y4.png?height=64&width=64",
            "Men-Ethnic & Fusion Wear": "https://res.cloudinary.com/wishwell/image/upload/v1753592624/Bottoms_vk8lqe.png?height=64&width=64",
            "Men-Sleepwear": "https://res.cloudinary.com/wishwell/image/upload/v1753592781/Bottoms_qax48e.png?height=64&width=64",
            "Women-Athleisures": "https://res.cloudinary.com/wishwell/image/upload/v1753776811/Bottoms_eqtpti.png?height=64&width=64",
            "Women-Sleep wear": "https://res.cloudinary.com/wishwell/image/upload/v1753777357/Bottoms_pef4s3.png",
            "Women-Ethnic & Fusion-Wear": "https://res.cloudinary.com/wishwell/image/upload/v1753774640/Bottoms_k4tg0g.png",
        },
    },

    Sets: {
        contexts: {
            "Men-Sleepwear":
                "https://res.cloudinary.com/wishwell/image/upload/v1753592782/Sets_k2ybjn.png?height=64&width=64",
            "Women-Sleep wear": "https://res.cloudinary.com/wishwell/image/upload/v1753777359/Sets_sbc6jr.png?height=64&width=64",
            "Women-Inner wear": "https://res.cloudinary.com/wishwell/image/upload/v1753777673/Sets_n16wjl.png?height=64&width=64",
        },
    },

    Sleepwear: {
        default: "https://res.cloudinary.com/wishwell/image/upload/v1753592782/Sleepwear_irnvbc.png?height=64&width=64",
        contexts: {
            "Men-Sleepwear":
                "https://res.cloudinary.com/wishwell/image/upload/v1753592782/Sleepwear_irnvbc.png?height=64&width=64",
            "Women-Sleep wear": "https://res.cloudinary.com/wishwell/image/upload/v1753777361/Sleepwear_ogbrzj.png?height=64&width=64",
        },
    },

    Athleisure: "https://res.cloudinary.com/wishwell/image/upload/v1753592302/Athleisure_w20tdn.png?height=64&width=64",
    Athleisures: "https://res.cloudinary.com/wishwell/image/upload/v1753776810/Athleisure_r9yvst.png?height=64&width=64",

    Innerwear: {
        default: "https://res.cloudinary.com/wishwell/image/upload/v1753592925/Innerwear_mi0xap.png?height=64&width=64",
        contexts: {
            "Men-Innerwear":
                "https://res.cloudinary.com/wishwell/image/upload/v1753592925/Innerwear_mi0xap.png?height=64&width=64",
            "Women-Inner wear": "/categories/subcategory/women-innerwear.png",
        },
    },

    "Kurtas": {
        default: "https://res.cloudinary.com/wishwell/image/upload/v1753592626/kurta_ghzecf.png?height=64&width=64",
        contexts: {
            "Men-Ethnic & Fusion Wear":
                "https://res.cloudinary.com/wishwell/image/upload/v1753592626/kurta_ghzecf.png?height=64&width=64",
            "Women-Ethnic & Fusion-Wear":
                "https://res.cloudinary.com/wishwell/image/upload/v1753774646/Kurta_c3lj51.png?height=64&width=64"
        },
    },

    "Kurta Sets": {
        default: "https://res.cloudinary.com/wishwell/image/upload/v1753592625/Kurta_Sets_bwvf7s.png?height=64&width=64",
        contexts: {
            "Men-Ethnic & Fusion Wear":
                "https://res.cloudinary.com/wishwell/image/upload/v1753592625/Kurta_Sets_bwvf7s.png?height=64&width=64",
            "Women-Ethnic & Fusion-Wear":
                "https://res.cloudinary.com/wishwell/image/upload/v1753774646/Kurta_Sets_yekgve.png?height=64&width=64"
        },
    },

    "Pants Sets": {
        default: "https://res.cloudinary.com/wishwell/image/upload/v1753593068/Pant_Sets_n5nu3s.png?height=64&width=64",
        contexts: {
            "Men-Pants Sets": "https://res.cloudinary.com/wishwell/image/upload/v1753593068/Pant_Sets_n5nu3s.png?height=64&width=64",
            "Women-Pants Sets": "https://res.cloudinary.com/wishwell/image/upload/v1753777900/Pant_Sets_dvyxq1.png?height=64&width=64",
        },
    },

    "Shorts Sets": {
        default: "https://res.cloudinary.com/wishwell/image/upload/v1753593069/Short_Sets_dayzzi.png?height=64&width=64",
        contexts: {
            "Men-Shorts Sets": "https://res.cloudinary.com/wishwell/image/upload/v1753593069/Short_Sets_dayzzi.png?height=64&width=64",
            "Women-Shorts Sets": "https://res.cloudinary.com/wishwell/image/upload/v1753777904/Short_Sets_yuhzxz.png?height=64&width=64",
        },
    },



    "Co-ords": {
        default: "https://res.cloudinary.com/wishwell/image/upload/v1753593068/Co-ords_c6k72q.png?height=64&width=64",
        contexts: {
            "Men-Co-ords":
                "https://res.cloudinary.com/wishwell/image/upload/v1753593068/Co-ords_c6k72q.png?height=64&width=64",
            "Women-Co ords":
                "https://res.cloudinary.com/wishwell/image/upload/v1753592302/Co-ords_Sets_women.png?height=64&width=64",
            "Women-Ethnic & Fusion-Wear":
                "https://res.cloudinary.com/wishwell/image/upload/v1753774641/co-ords_u5gobk.png?height=64&width=64"
        },
    },

    "T-Shirts": {
        default: "https://res.cloudinary.com/wishwell/image/upload/v1753591719/T-Shirts_zyy3fv.png?height=64&width=64",
        contexts: {
            "Men-Topwear":
                "https://res.cloudinary.com/wishwell/image/upload/v1753591719/T-Shirts_zyy3fv.png?height=64&width=64",
            "Women-Top wear": "https://res.cloudinary.com/wishwell/image/upload/v1753772911/T-Shirts_nyj6js.png?height=64&width=64",
        },
    },

    "Shirts": {
        default: "https://res.cloudinary.com/wishwell/image/upload/v1753591719/shirts_g2vxrv.jpg?height=64&width=64",
        contexts: {
            "Men-Topwear":
                "https://res.cloudinary.com/wishwell/image/upload/v1753591719/shirts_g2vxrv.jpg?height=64&width=64",
            "Women-Top wear": "https://res.cloudinary.com/wishwell/image/upload/v1753772907/Shirts_aci0hv.png?height=64&width=64",
        },
    },

    Jackets: {
        default: "https://res.cloudinary.com/wishwell/image/upload/v1753591718/Jackets_ayghrc.png?height=64&width=64",
        contexts: {
            "Men-Topwear":
                "https://res.cloudinary.com/wishwell/image/upload/v1753591718/Jackets_ayghrc.png?height=64&width=64",
            "Women-Top wear":
                "https://res.cloudinary.com/wishwell/image/upload/v1753772906/Jackets_tszkpk.png?height=64&width=64",
        },
    },

    "Hoodies & Sweatshirts": {
        default: "https://res.cloudinary.com/wishwell/image/upload/v1753591718/Hoodies_Sweatshirts_ac5sqg.png?height=64&width=64",
        contexts: {
            "Men-Topwear":
                "https://res.cloudinary.com/wishwell/image/upload/v1753591718/Hoodies_Sweatshirts_ac5sqg.png?height=64&width=64",
            "Women-Top wear":
                "https://res.cloudinary.com/wishwell/image/upload/v1753772906/Hoodies_Sweatshirts_lo4ql8.png?height=64&width=64",
        },
    },

    "Shorts": {
        default: "https://res.cloudinary.com/wishwell/image/upload/v1753592133/Shorts_t6jy3u.png?height=64&width=64",
        contexts: {
            "Men-Bottomwear":
                "https://res.cloudinary.com/wishwell/image/upload/v1753592133/Shorts_t6jy3u.png?height=64&width=64",
            "Women-Bottom wear":
                "https://res.cloudinary.com/wishwell/image/upload/v1753773919/Shorts_icxinx.png?height=64&width=64",
        },
    },

    Jeans: {
        default: "https://res.cloudinary.com/wishwell/image/upload/v1753592133/Jeans_hmrdjc.png?height=64&width=64",
        contexts: {
            "Men-Bottomwear":
                "https://res.cloudinary.com/wishwell/image/upload/v1753592133/Jeans_hmrdjc.png?height=64&width=64",
            "Women-Bottom wear":
                "https://res.cloudinary.com/wishwell/image/upload/v1753773915/Jeans_ykrwvb.png?height=64&width=64",
        },
    },

    "Pants & Trousers": {
        default: "https://res.cloudinary.com/wishwell/image/upload/v1753592133/Pants_Trousers_r12mey.png?height=64&width=64",
        contexts: {
            "Men-Bottomwear":
                "https://res.cloudinary.com/wishwell/image/upload/v1753592133/Pants_Trousers_r12mey.png?height=64&width=64",
            "Women-Bottom wear":
                "https://res.cloudinary.com/wishwell/image/upload/v1753773917/Pants_Trousers_kpdtyl.png?height=64&width=64",
        },
    },

    Sweatpants: {
        default: "https://res.cloudinary.com/wishwell/image/upload/v1753592134/Sweatpants_k3yai7.png?height=64&width=64",
        contexts: {
            "Men-Bottomwear":
                "https://res.cloudinary.com/wishwell/image/upload/v1753592134/Sweatpants_k3yai7.png?height=64&width=64",
            "Women-Bottom wear":
                "https://res.cloudinary.com/wishwell/image/upload/v1753773925/Sweatpants_vc2iua.png?height=64&width=64",
        },
    },

    "Cargos & Joggers": {
        default: "https://res.cloudinary.com/wishwell/image/upload/v1753592132/Cargos_Joggers_Sweatpants__kdelzg.png?height=64&width=64",
        contexts: {
            "Men-Bottomwear":
                "https://res.cloudinary.com/wishwell/image/upload/v1753592132/Cargos_Joggers_Sweatpants__kdelzg.png?height=64&width=64",
            "Women-Bottom wear":
                "https://res.cloudinary.com/wishwell/image/upload/v1753773914/Cargos_Joggers_llxca1.png?height=64&width=64",
        },
    },

    // Unique subcategories continue as strings


    // Continue with all other unique subcategories...




    // Kids subcategories
    Boys: "/categories/subcategory/kids-boys.png",
    Girls: "/categories/subcategory/kids-girls.png",
    Infants: "/categories/subcategory/kids-infants.png",
    Ethnicwear: "/categories/subcategory/kids-ethnic.png",
    Partywear: "/categories/subcategory/kids-party.png",
    Toys: "/categories/subcategory/toys.png",
    "Character Shop": "/categories/subcategory/character.png",

    // Beauty subcategories
    "Bath & Body": "/categories/subcategory/bath-body.png",
    "Hair Care": "/categories/subcategory/hair-care.png",
    Skincare: "/categories/subcategory/skincare.png",
    Makeup: "/categories/subcategory/makeup.png",
    "Oral Care": "/categories/subcategory/oral-care.png",
    Grooming: "/categories/subcategory/grooming.png",
    "Baby Care": "/categories/subcategory/baby-care.png",
    Fragrances: "/categories/subcategory/fragrances.png",
    "Protein & Supplements": "/categories/subcategory/supplements.png",
    "Feminine Hygiene": "/categories/subcategory/feminine.png",
    "Sexual Wellness": "/categories/subcategory/wellness.png",
    "Health & Pharma": "/categories/subcategory/health.png",

    // Accessories subcategories
    "For Him": "/categories/subcategory/accessories-him.png",
    "For Her": "/categories/subcategory/accessories-her.png",

    // Sub-subcategories for Accessories - For Him
    Necklaces: "/categories/subcategory/necklaces.png",
    Bracelets: "/categories/subcategory/bracelets.png",
    Sunglasses: "/categories/subcategory/sunglasses.png",
    Watches: "/categories/subcategory/watches.png",
    Earrings: "/categories/subcategory/earrings.png",
    Wallets: "/categories/subcategory/wallets.png",
    Belts: "/categories/subcategory/belts.png",
    Ties: "/categories/subcategory/ties.png",

    // Sub-subcategories for Accessories - For Her
    "Necklace and Chains": "/categories/subcategory/necklace-chains.png",
    "Jewellery Sets": "/categories/subcategory/jewellery-sets.png",
    "Handbags & Wallets": "/categories/subcategory/handbags.png",
    Rings: "/categories/subcategory/rings.png",

    // Sub-subcategories for Footwear
    "Casual Shoes": "/categories/subcategory/casual-shoes.png",
    "Formal Shoes": "/categories/subcategory/formal-shoes.png",
    "Sandals and Floaters": "/categories/subcategory/sandals.png",
    "Flip Flops & Slippers": "/categories/subcategory/flip-flops.png",
    Heels: "/categories/subcategory/heels.png",
    Flats: "/categories/subcategory/flats.png",

    // Grocery subcategories
    "Fresh Vegetables": "/categories/subcategory/vegetables.png",
    "Fresh Fruits": "/categories/subcategory/fruits.png",
    "Dairy, Bread & Eggs": "/categories/subcategory/dairy.png",
    "Cereals & Breakfast": "/categories/subcategory/cereals.png",
    "Atta, Rice & Dal": "/categories/subcategory/grains.png",
    "Oils & Ghee": "/categories/subcategory/oils.png",
    Masalas: "/categories/subcategory/spices.png",
    "Dry Fruits & Seeds": "/categories/subcategory/dry-fruits.png",
    "Biscuits & Cakes": "/categories/subcategory/biscuits.png",
    "Tea, Coffee & Milk Drinks": "/categories/subcategory/beverages.png",
    "Sauces & Spreads": "/categories/subcategory/sauces.png",
    "Meat & Seafood": "/categories/subcategory/meat.png",

    // Household subcategories
    "Home & Furnishing": "/categories/subcategory/home-furnishing.png",
    "Kitchen & Dining": "/categories/subcategory/kitchen.png",
    "Cleaning Essentials": "/categories/subcategory/cleaning.png",
    Clothing: "/categories/subcategory/clothing.png",
    "Mobiles & Electronics": "/categories/subcategory/electronics.png",
    Appliances: "/categories/subcategory/appliances.png",
    "Books & Stationery": "/categories/subcategory/books.png",
    "Puja Items": "/categories/subcategory/puja.png",
    "Sports & Fitness": "/categories/subcategory/sports.png",
    "Pet Supplies": "/categories/subcategory/pets.png",

    // Snacks subcategories
    "Cold Drinks and Juices": "/categories/subcategory/cold-drinks.png",
    "Ice Creams and Frozen Desserts": "/categories/subcategory/ice-cream.png",
    "Chips and Namkeens": "/categories/subcategory/chips.png",
    Chocolates: "/categories/subcategory/chocolates.png",
    "Noodles, Pasta, Vermicelli": "/categories/subcategory/noodles.png",
    "Frozen Food": "/categories/subcategory/frozen.png",
    Sweets: "/categories/subcategory/sweets.png",
    "Paan Corner": "/categories/subcategory/paan.png",

    //Gifts subcategories
    "Birthday Gifts": "/categories/subcategory/birthday-gifts.png",
    "Anniversary Gifts": "/categories/subcategory/anniversary-gifts.png",
    "Wedding Gifts": "/categories/subcategory/wedding-gifts.png",
    "Cake Delivery": "/categories/subcategory/cake-delivery.png",
    "Flower Delivery": "/categories/subcategory/flower-delivery.png",
    "Personalized Gifts": "/categories/subcategory/personalized-gifts.png",
    "Chocolate Gifts": "/categories/subcategory/chocolate-gifts.png",
    "Toy Gifts": "/categories/subcategory/toy-gifts.png",
    "Home Decor Gifts": "/categories/subcategory/home-decor-gifts.png",
    "Festive Gifts": "/categories/subcategory/festive-gifts.png",
}

// Utility function to get the correct image for a subcategory
export function getSubcategoryImage(
    subcategoryName: string,
    parentCategory?: string,
    grandparentCategory?: string,
): string {
    const imageConfig = subcategoryImages[subcategoryName]

    // If no config found, return default
    if (!imageConfig) {
        return subcategoryImages.default as string
    }

    // If it's a simple string, return it
    if (typeof imageConfig === "string") {
        return imageConfig
    }

    // If it's a config object, try to find context-specific image
    if (imageConfig.contexts && parentCategory) {
        // Try with grandparent-parent context first (most specific)
        if (grandparentCategory) {
            const contextKey = `${grandparentCategory}-${parentCategory}`
            if (imageConfig.contexts[contextKey]) {
                return imageConfig.contexts[contextKey]
            }
        }

        // Try with just parent context
        if (imageConfig.contexts[parentCategory]) {
            return imageConfig.contexts[parentCategory]
        }
    }

    // Fall back to default for this subcategory
    return imageConfig.default || (subcategoryImages.default as string)
}

// Helper function to create context key
export function createContextKey(parentCategory: string, grandparentCategory?: string): string {
    return grandparentCategory ? `${grandparentCategory}-${parentCategory}` : parentCategory
}
