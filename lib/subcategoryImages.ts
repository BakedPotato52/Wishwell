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
        default: "https://res.cloudinary.com/wishwell/image/upload/v1753592302/Bottoms_iq23y4.png?height=64&width=64",
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
        default: "https://res.cloudinary.com/wishwell/image/upload/v1753592782/Sets_k2ybjn.png?height=64&width=64",
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
    "Skincare": "https://res.cloudinary.com/wishwell/image/upload/v1754035859/Skincare_h5rlsj.png?height=64&width=64",
    "Makeup": "https://res.cloudinary.com/wishwell/image/upload/v1754036011/Makeup_qpvmyb.png?height=64&width=64",
    "Hair Care": "https://res.cloudinary.com/wishwell/image/upload/v1754036111/Hair_Care_ammmrt.png?height=64&width=64",
    "Fragrances": "https://res.cloudinary.com/wishwell/image/upload/v1754036306/Fragrances_fn4ne9.png?height=64&width=64",
    "Bath & Body": "https://res.cloudinary.com/wishwell/image/upload/v1753885358/Bath_Body_qqqj1l.png?height=64&width=64",
    "Oral Care": "https://res.cloudinary.com/wishwell/image/upload/v1753885358/Oral_Care_qqqj1l.png?height=64&width=64",
    "Grooming": "https://res.cloudinary.com/wishwell/image/upload/v1753885358/Grooming_qqqj1l.png?height=64&width=64",
    "Baby Care": "https://res.cloudinary.com/wishwell/image/upload/v1753885358/Baby_Care_qqqj1l.png?height=64&width=64",
    "Protein & Supplements": "https://res.cloudinary.com/wishwell/image/upload/v1753885358/Protein_Supplements_qqqj1l.png?height=64&width=64",
    "Feminine Hygiene": "https://res.cloudinary.com/wishwell/image/upload/v1753885358/Feminine_Hygiene_qqqj1l.png?height=64&width=64",
    "Sexual Wellness": "https://res.cloudinary.com/wishwell/image/upload/v1753885358/Sexual_Wellness_qqqj1l.png?height=64&width=64",
    "Health & Pharma": "https://res.cloudinary.com/wishwell/image/upload/v1753885358/Health_Pharma_qqqj1l.png?height=64&width=64",

    // skincare subcategories
    "Facewash & scrubs": "https://res.cloudinary.com/wishwell/image/upload/v1754035860/Facewash_scrubs_mlsobq.png?height=64&width=64",
    "Masks & Cleansers": "https://res.cloudinary.com/wishwell/image/upload/v1754035863/Masks_Cleansers_hqgkhj.png?height=64&width=64",
    "Serums & Toners": "https://res.cloudinary.com/wishwell/image/upload/v1754035859/Serums_Toners_gnpwvq.png?height=64&width=64",
    "Creams & Moisturizers": "https://res.cloudinary.com/wishwell/image/upload/v1754035859/Creams_Moisturizers_alscxq.png?height=64&width=64",
    "Sunscreen": "https://res.cloudinary.com/wishwell/image/upload/v1754035861/Sunscreen_vgwguh.png?height=64&width=64",
    "Body Lotions": "https://res.cloudinary.com/wishwell/image/upload/v1754035858/Body_Lotions_gkesiu.png?height=64&width=64",
    "Beauty Supplements": "https://res.cloudinary.com/wishwell/image/upload/v1754035860/Beauty_Supplements_h8senw.png?height=64&width=64",

    // makeup subcategories
    "Lips": "https://res.cloudinary.com/wishwell/image/upload/v1754036012/Lips_pgcfak.png?height=64&width=64",
    "Eyes": "https://res.cloudinary.com/wishwell/image/upload/v1754036012/Eyes_ltovho.png?height=64&width=64",
    "Face": "https://res.cloudinary.com/wishwell/image/upload/v1754036013/Face_zhflti.png?height=64&width=64",
    "Nails": "https://res.cloudinary.com/wishwell/image/upload/v1754036014/Nails_zquotd.png?height=64&width=64",
    "Tools & Brushes": "https://res.cloudinary.com/wishwell/image/upload/v1754036016/Tools_Brushes_khnpdo.png?height=64&width=64",

    // hair care subcategories
    "Hair Oils & Serums": "https://res.cloudinary.com/wishwell/image/upload/v1754036116/Hair_Oils_Serums_qxdad9.png?height=64&width=64",
    "Shampoo": "https://res.cloudinary.com/wishwell/image/upload/v1754036118/Shampoo_rswdiz.png?height=64&width=64",
    "Conditioners & Masks": "https://res.cloudinary.com/wishwell/image/upload/v1754036113/Conditioners_Masks_srvi86.png?height=64&width=64",
    "Hair Colour": "https://res.cloudinary.com/wishwell/image/upload/v1754036111/Hair_Colour_xgp2ig.png?height=64&width=64",
    "Hair Styling Gels & Creams": "https://res.cloudinary.com/wishwell/image/upload/v1754036118/Hair_Styling_Gels_Creams_w1obv5.pngheight=64&width=64",
    "Combs & Brushes": "https://res.cloudinary.com/wishwell/image/upload/v1754036122/Combs_Brushes_ubbwsp.png?height=64&width=64",
    "Hair Dryers and Stylers": "https://res.cloudinary.com/wishwell/image/upload/v1754036115/Hair_Dryers_and_Stylers_o3iul7.png?height=64&width=64",
    "Hair Supplements": "https://res.cloudinary.com/wishwell/image/upload/v1754036117/Hair_Supplements_xitngb.png?height=64&width=64",

    // fragrances subcategories
    "Men's Perfume": "https://res.cloudinary.com/wishwell/image/upload/v1754036307/Men_s_Perfume_igjgqh.jpg?height=64&width=64",
    "Women's Perfume": "https://res.cloudinary.com/wishwell/image/upload/v1754036310/Women_s_Perfume_mnkooi.jpg?height=64&width=64",
    "Men's Deo": "https://res.cloudinary.com/wishwell/image/upload/v1754036307/Men_s_Deo_c1brjr.png?height=64&width=64",
    "Women's Deo": "https://res.cloudinary.com/wishwell/image/upload/v1754036309/Women_s_Deo_gzto7j.png?height=64&width=64",
    "Roll On": "https://res.cloudinary.com/wishwell/image/upload/v1754036307/Roll_On_qcn7xg.jpg?height=64&width=64",
    "Talc": "https://res.cloudinary.com/wishwell/image/upload/v1754036308/Talc_a07rwm.png?height=64&width=64",

    // bath & body subcategories
    "Soaps": "https://res.cloudinary.com/wishwell/image/upload/v1753885358/Soaps_qqqj1l.png?height=64&width=64",
    "Shower Gels & Body Wash": "https://res.cloudinary.com/wishwell/image/upload/v1753885358/Shower_Gels_Body_Wash_qqqj1l.png?height=64&width=64",
    "Body Lotion": "https://res.cloudinary.com/wishwell/image/upload/v1753885358/Body_Lotion_qqqj1l.png?height=64&width=64",
    "Body Scrub": "https://res.cloudinary.com/wishwell/image/upload/v1753885358/Body_Scrub_qqqj1l.png?height=64&width=64",
    "Baby Bathing": "https://res.cloudinary.com/wishwell/image/upload/v1753885358/Baby_Bathing_qqqj1l.png?height=64&width=64",
    "Talcs": "https://res.cloudinary.com/wishwell/image/upload/v1753885358/Talcs_qqqj1l.png?height=64&width=64",
    "Hand wash & Sanitizers": "https://res.cloudinary.com/wishwell/image/upload/v1753885358/Hand_Wash_Sanitizers_qqqj1l.png?height=64&width=64",
    "Face Wash & Scrubs": "https://res.cloudinary.com/wishwell/image/upload/v1753885358/Face_Wash_Scrubs_qqqj1l.png?height=64&width=64",
    "Conditioner & Mask": "https://res.cloudinary.com/wishwell/image/upload/v1753885358/Conditioner_Mask_qqqj1l.png?height=64&width=64",
    "Bath Accessories": "https://res.cloudinary.com/wishwell/image/upload/v1753885358/Bath_Accessories_qqqj1l.png?height=64&width=64",
    "Kits/Gifts": "https://res.cloudinary.com/wishwell/image/upload/v1753885358/Kits_Gifts_qqqj1l.png?height=64&width=64",
    "Premium Brands": {
        default: "https://res.cloudinary.com/wishwell/image/upload/v1754036115/Premium_Brands_kih9ve.png?height=64&width=64",
        contexts: {
            "Fragrences": "https://res.cloudinary.com/wishwell/image/upload/v1754036306/Premium_Brands_ovukiu.jpg?height=64&width=64",
            "Haircare": "https://res.cloudinary.com/wishwell/image/upload/v1754036115/Premium_Brands_kih9ve.png?height=64&width=64",
        },
    },


    // Accessories subcategories
    "Women's Jewellery": "https://res.cloudinary.com/wishwell/image/upload/v1753885357/Women_s_Jewellery__j2sqsr.png?height=64&width=64",
    "Men's Jewellery": "https://res.cloudinary.com/wishwell/image/upload/v1753885311/Men_s_Jewellery__ejt2zu.png?height=64&width=64",
    "Men's Accessories": "https://res.cloudinary.com/wishwell/image/upload/v1753885291/Men_s_Accessories_m0tdpm.png?height=64&width=64",
    "Women's Accessories": "https://res.cloudinary.com/wishwell/image/upload/v1753885337/Women_s_Accessories_lfvzvl.png?height=64&width=64",

    "Rings": {
        default: "https://res.cloudinary.com/wishwell/image/upload/v1753885311/Rings_ffkkbk.png?height=64&width=64",
        contexts: {
            "Men's Accessories": "https://res.cloudinary.com/wishwell/image/upload/v1753885311/Rings_ffkkbk.png?height=64&width=64",
            "Women's Accessories": "https://res.cloudinary.com/wishwell/image/upload/v1753885354/Rings_hbtz7c.png?height=64&width=64",
        }
    },

    "Bracelets": {
        default: "https://res.cloudinary.com/wishwell/image/upload/v1753885309/Bracelets_mgyg8l.png?height=64&width=64",
        contexts: {
            "Men's Accessories": "https://res.cloudinary.com/wishwell/image/upload/v1753885309/Bracelets_mgyg8l.png?height=64&width=64",
            "Women's Accessories": "https://res.cloudinary.com/wishwell/image/upload/v1753885351/Bracelets_xus1zg.png?height=64&width=64",
        }
    },

    "Earrings": {
        default: "https://res.cloudinary.com/wishwell/image/upload/v1753885309/Earrings_dlqhei.png?height=64&width=64",
        contexts: {
            "Men's Accessories": "https://res.cloudinary.com/wishwell/image/upload/v1753885309/Earrings_dlqhei.png?height=64&width=64",
            "Women's Accessories": "https://res.cloudinary.com/wishwell/image/upload/v1753885352/earrings_kprejq.png?height=64&width=64",
        }
    },

    // Sub-subcategories for Women's Jwellery
    "Pendants": "https://res.cloudinary.com/wishwell/image/upload/v1753885353/Pendants_wx2kwd.png?height=64&width=64",
    "Necklace & Chains": "https://res.cloudinary.com/wishwell/image/upload/v1753885353/Necklace_And_Chains_ctiind.png?height=64&width=64",
    "Waist Chains": "https://res.cloudinary.com/wishwell/image/upload/v1753885354/Waist_Chains_wnts2l.png?height=64&width=64",
    "Anklets": "https://res.cloudinary.com/wishwell/image/upload/v1753885348/Anklets_ishu4b.png?height=64&width=64",
    "Chains & Charms": "https://res.cloudinary.com/wishwell/image/upload/v1753885352/Chains_Charms_efhypj.png?height=64&width=64",
    "Bangles": "https://res.cloudinary.com/wishwell/image/upload/v1753885350/Bangles_zerq3a.png?height=64&width=64",
    "Jewellery Sets": "https://res.cloudinary.com/wishwell/image/upload/v1753885352/Jewellery_Set_cjr4l4.png?height=64&width=64",

    // Sub-subcategories for men's Jwellery
    "Chains & Pendants": "https://res.cloudinary.com/wishwell/image/upload/v1753885309/Chains_Pendants_pior1x.png?height=64&width=64",

    //sub-subcategories for womens accessories
    "Stockings": "https://res.cloudinary.com/wishwell/image/upload/v1753885333/Stockings_u5dnwo.png?height=64&width=64",
    "Handbags & Wallets": "https://res.cloudinary.com/wishwell/image/upload/v1753885331/Handbags_Wallets_y5aka9.png?height=64&width=64",
    "Charms Brooches & Pins": "https://res.cloudinary.com/wishwell/image/upload/v1753885329/Charms_Brooches_Pins_py7agr.png?height=64&width=64",
    "Hair Accessories": "https://res.cloudinary.com/wishwell/image/upload/v1753885331/Hair_Accessories_tsrobk.png?height=64&width=64",

    "Watches": {
        default: "https://res.cloudinary.com/wishwell/image/upload/v1753885335/Watches_jypwak.png?height=64&width=64",
        contexts: {
            "Women's Accessories": "https://res.cloudinary.com/wishwell/image/upload/v1753885335/Watches_jypwak.png?height=64&width=64",
            "Men's Accessories": "https://res.cloudinary.com/wishwell/image/upload/v1753885291/Watches_zpijtd.png?height=64&width=64",
        }
    },

    "Wallets": {
        default: "https://res.cloudinary.com/wishwell/image/upload/v1753885291/Wallets_zoipwz.png?height=64&width=64",
        contexts: {
            "Men's Accessories": "https://res.cloudinary.com/wishwell/image/upload/v1753885291/Wallets_zoipwz.png?height=64&width=64",
            "Women's Accessories": "/categories/subcategory/womens-wallets.png",
        }
    },

    "Belts": {
        default: "https://res.cloudinary.com/wishwell/image/upload/v1753885289/Belts_brbvil.png?height=64&width=64",
        contexts: {
            "Men's Accessories": "https://res.cloudinary.com/wishwell/image/upload/v1753885289/Belts_brbvil.png?height=64&width=64",
            "Women's Accessories": "https://res.cloudinary.com/wishwell/image/upload/v1753885334/Wallets_rvlvho.png?height=64&width=64",
        }
    },

    "Perfumes": {
        default: "https://res.cloudinary.com/wishwell/image/upload/v1753885290/Perfumes_fen8f1.png?height=64&width=64",
        contexts: {
            "Men's Accessories": "https://res.cloudinary.com/wishwell/image/upload/v1753885290/Perfumes_fen8f1.png?height=64&width=64",
            "Women's Accessories": "https://res.cloudinary.com/wishwell/image/upload/v1753885332/Perfumes_svt5ut.png?height=64&width=64",
        }
    },

    "Caps & Hats": {
        default: "https://res.cloudinary.com/wishwell/image/upload/v1753885289/Caps_Hats_efoero.png?height=64&width=64",
        contexts: {
            "Men's Accessories": "https://res.cloudinary.com/wishwell/image/upload/v1753885289/Caps_Hats_efoero.png?height=64&width=64",
            "Women's Accessories": "https://res.cloudinary.com/wishwell/image/upload/v1753885329/Caps_Hats_vusx4n.png?height=64&width=64",
        }
    },

    "Socks": {
        default: "https://res.cloudinary.com/wishwell/image/upload/v1753885291/Socks_yhyaej.png?height=64&width=64",
        contexts: {
            "Men's Accessories": "https://res.cloudinary.com/wishwell/image/upload/v1753885291/Socks_yhyaej.png?height=64&width=64",
            "Women's Accessories": "https://res.cloudinary.com/wishwell/image/upload/v1753885333/Socks_jynb1n.png?height=64&width=64",
        }
    },

    "Eyewear": {
        default: "https://res.cloudinary.com/wishwell/image/upload/v1753885290/Eyewear_l4aogf.png?height=64&width=64",
        contexts: {
            "Men's Accessories": "https://res.cloudinary.com/wishwell/image/upload/v1753885290/Eyewear_l4aogf.png?height=64&width=64",
            "Women's Accessories": "https://res.cloudinary.com/wishwell/image/upload/v1753885330/Eyewear_bsztr4.png",
        }
    },

    // Sub-subcategories for mens accessories
    "Tie & Brooches": "https://res.cloudinary.com/wishwell/image/upload/v1753885291/Tie_Brooches_oe8qly.png?height=64&width=64",


    // subcategories for Footwear
    "Women's Footwear": "https://res.cloudinary.com/wishwell/image/upload/v1753939745/women_s_footwear_egguen.png?height=64&width=64",
    "Men's Footwear": "https://res.cloudinary.com/wishwell/image/upload/v1753939864/men_s_footwear_wmbqzn.png?height=64&width=64",

    // subsubcategories for women's footwear
    "Heels": "https://res.cloudinary.com/wishwell/image/upload/v1753939744/heels_ajnds6.png?height=64&width=64",

    // subsubcategories for men's footwear
    "Formals": "https://res.cloudinary.com/wishwell/image/upload/v1753939864/Formals_oojqjc.png?height=64&width=64",

    "Ethnic": {
        default: "https://res.cloudinary.com/wishwell/image/upload/v1753778119/Ethnic_Jumpsuits_mmyive.png?height=64&width=64",
        contexts: {
            "women-jumpsuits": "https://res.cloudinary.com/wishwell/image/upload/v1753778119/Ethnic_Jumpsuits_mmyive.png?height=64&width=64",
            "men-footwear": "https://res.cloudinary.com/wishwell/image/upload/v1753939864/Ethnic_wtf1x8.png?height=64&width=64",
        }
    },

    "Flats & Sandals": {
        default: "https://res.cloudinary.com/wishwell/image/upload/v1753939745/Flats_Sandals_v795uz.png?height=64&width=64",
        contexts: {
            "women-footwear": "https://res.cloudinary.com/wishwell/image/upload/v1753939745/Flats_Sandals_v795uz.png?height=64&width=64",
            "men-footwear": "https://res.cloudinary.com/wishwell/image/upload/v1753939864/Flats_Sandals_mn7szj.png?height=64&width=64",
        }
    },
    "Flip Flops": {
        default: "https://res.cloudinary.com/wishwell/image/upload/v1753939864/Flip_Flops_vefxvi.png?height=64&width=64",
        contexts: {
            "women-footwear": "https://res.cloudinary.com/wishwell/image/upload/v1753939745/Flip_Flops_qwna6o.png?height=64&width=64",
            "men-footwear": "https://res.cloudinary.com/wishwell/image/upload/v1753939864/Flip_Flops_vefxvi.png?height=64&width=64",
        }
    },
    "Casual Shoes": {
        default: "https://res.cloudinary.com/wishwell/image/upload/v1753939864/Casual_Shoes_lgo6kl.png?height=64&width=64",
        contexts: {
            "women-footwear": "https://res.cloudinary.com/wishwell/image/upload/v1753939744/Casual_Shoes_njxakx.png?height=64&width=64",
            "men-footwear": "https://res.cloudinary.com/wishwell/image/upload/v1753939864/Casual_Shoes_lgo6kl.png?height=64&width=64",
        }
    },

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
