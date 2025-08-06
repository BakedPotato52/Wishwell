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
    "Bath & Body": "https://res.cloudinary.com/wishwell/image/upload/v1754111443/Bath_Body_txafhp.png?height=64&width=64",
    "Oral Care": "https://res.cloudinary.com/wishwell/image/upload/v1754112290/Oral_Care_Accessories_cxswl5.png?height=64&width=64",
    "Grooming": "https://res.cloudinary.com/wishwell/image/upload/v1754112426/Grooming_zgbbqw.png?height=64&width=64",
    "Baby Care": "https://res.cloudinary.com/wishwell/image/upload/v1754112815/Baby_Care_rnnv9c.png?height=64&width=64",
    "Protein & Supplements": "https://res.cloudinary.com/wishwell/image/upload/v1754113169/Sleep_Supplements_svg92v.jpg?height=64&width=64",
    "Feminine Hygiene": "https://res.cloudinary.com/wishwell/image/upload/v1754113380/Feminine_Hygiene_lddf2t.png?height=64&width=64",
    "Sexual Wellness": "https://res.cloudinary.com/wishwell/image/upload/v1754113542/Sexual_Wellness_mdzxck.png?height=64&width=64",
    "Health & Pharma": "https://res.cloudinary.com/wishwell/image/upload/v1754113591/Health_Pharma_lwlaz0.png?height=64&width=64",

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
    "Conditioners & Masks": "https://res.cloudinary.com/wishwell/image/upload/v1754036113/Conditioners_Masks_srvi86.png?height=64&width=64",
    "Hair Colour": "https://res.cloudinary.com/wishwell/image/upload/v1754036111/Hair_Colour_xgp2ig.png?height=64&width=64",
    "Hair Styling Gels & Creams": "https://res.cloudinary.com/wishwell/image/upload/v1754036118/Hair_Styling_Gels_Creams_w1obv5.png?height=64&width=64",
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
    "Soaps": "https://res.cloudinary.com/wishwell/image/upload/v1754111447/Soaps_bhzkew.png",
    "Shower Gels & Body Wash": "https://res.cloudinary.com/wishwell/image/upload/v1754111447/Shower_Gels_Body_Wash_aqae22.png",
    "Body Lotion": "https://res.cloudinary.com/wishwell/image/upload/v1754111444/Body_Lotion_g8gln2.png",
    "Body Scrub": "https://res.cloudinary.com/wishwell/image/upload/v1754111445/Body_Scrub_ft7uxo.png",
    "Baby Bathing": "https://res.cloudinary.com/wishwell/image/upload/v1754111444/Baby_Bathing_a3t4pu.png",
    "Talcs": "https://res.cloudinary.com/wishwell/image/upload/v1754111447/Talcs_ptibmr.png",
    "Hand wash & Sanitizers": "https://res.cloudinary.com/wishwell/image/upload/v1754111446/Hand_wash_Sanitizers_iwot0j.png",
    "Face Wash & Scrubs": "https://res.cloudinary.com/wishwell/image/upload/v1754111446/Face_Wash_Scrubs_n4vpwq.png",
    "Conditioner & Mask": "https://res.cloudinary.com/wishwell/image/upload/v1754111444/Conditioner_Mask_l6avgz.png",
    "Bath Accessories": "https://res.cloudinary.com/wishwell/image/upload/v1754111445/Bath_Accessories_vvfywq.png",
    "Kits/Gifts": "https://res.cloudinary.com/wishwell/image/upload/v1754111445/Kits_Gifts_tv3da2.jpg",

    "Shampoo": {
        default: "https://res.cloudinary.com/wishwell/image/upload/v1754036118/Shampoo_rswdiz.png?height=64&width=64",
        contexts: {
            "Hair Care": "https://res.cloudinary.com/wishwell/image/upload/v1754036118/Shampoo_rswdiz.png?height=64&width=64",
            "Bath & Body": "https://res.cloudinary.com/wishwell/image/upload/v1754111446/Shampoo_lwh4e4.png?height=64&width=64",
            "Baby Care": "https://res.cloudinary.com/wishwell/image/upload/v1754111444/Shampoo_qqqj1l.png?height=64&width=64",
        },
    },
    "Premium Brands": {
        default: "https://res.cloudinary.com/wishwell/image/upload/v1754036115/Premium_Brands_kih9ve.png?height=64&width=64",
        contexts: {
            "Fragrences": "https://res.cloudinary.com/wishwell/image/upload/v1754036306/Premium_Brands_ovukiu.jpg?height=64&width=64",
            "Hair Care": "https://res.cloudinary.com/wishwell/image/upload/v1754036115/Premium_Brands_kih9ve.png?height=64&width=64",
            "Bath & Body": "https://res.cloudinary.com/wishwell/image/upload/v1754111446/Premium_Brands_mllwpw.png?height=64&width=64",
            "Chips and Namkeens": "https://res.cloudinary.com/wishwell/image/upload/v1754111446/Premium_Brands_1_ggqj3v.png?height=64&width=64",
        },
    },

    // Oral Care subsubcategories
    "Toothpaste": "https://res.cloudinary.com/wishwell/image/upload/v1754112292/Toothpaste_mp76db.png?height=64&width=64",
    "Toothbrushes": "https://res.cloudinary.com/wishwell/image/upload/v1754112292/Toothbrushes_xhxh3k.png?height=64&width=64",
    "Mouthwash": "https://res.cloudinary.com/wishwell/image/upload/v1754112290/Mouthwash_kvifqs.png?height=64&width=64",
    "Oral Care Accessories": "https://res.cloudinary.com/wishwell/image/upload/v1754112290/Oral_Care_pnsbyi.png?height=64&width=64",
    "Kids Toothbrush": "https://res.cloudinary.com/wishwell/image/upload/v1754112290/Kids_Toothbrush_wk2c3s.png?height=64&width=64",
    "Kids Toothpaste": "https://res.cloudinary.com/wishwell/image/upload/v1754112290/Kids_Toothpaste_wbuppk.png?height=64&width=64",

    // Grooming subsubcategories
    "Shaving Cartridges": "https://res.cloudinary.com/wishwell/image/upload/v1754112441/Shaving_Cartridges_ouq3qg.jpg?height=64&width=64",
    "Men's Razor": "https://res.cloudinary.com/wishwell/image/upload/v1754112440/Men_s_Razor_n4zyf3.webp?height=64&width=64",
    "Shaving Foam & Creams": "https://res.cloudinary.com/wishwell/image/upload/v1754112443/Shaving_Foam_Creams_fyie1p.png?height=64&width=64",
    "Brush & kit": "https://res.cloudinary.com/wishwell/image/upload/v1754112425/Brush_kit_bydqj2.png?height=64&width=64",
    "After shave": "https://res.cloudinary.com/wishwell/image/upload/v1754112426/After_shave_xc6ql9.png?height=64&width=64",
    "Men's Hair removal": "https://res.cloudinary.com/wishwell/image/upload/v1754112440/Men_s_Hair_removal_agbc4i.png?height=64&width=64",
    "Hair styling": "https://res.cloudinary.com/wishwell/image/upload/v1754112427/Hair_styling_zsaecd.png?height=64&width=64",
    "Beard Styling": "https://res.cloudinary.com/wishwell/image/upload/v1754112428/Beard_Styling_c7wicj.png?height=64&width=64",
    "Women's Hair removal cream": "https://res.cloudinary.com/wishwell/image/upload/v1754112446/Women_s_Hair_removal_cream_dkbmiz.webp?height=64&width=64",
    "Women's Razor": "https://res.cloudinary.com/wishwell/image/upload/v1754112450/Women_s_Razor_jrvfg7.png?height=64&width=64",
    "Women's Waxing": "https://res.cloudinary.com/wishwell/image/upload/v1754112450/Women_s_Waxing_rom4fp.webp?height=64&width=64",
    "Trimmers/Shavers": "https://res.cloudinary.com/wishwell/image/upload/v1754112444/Trimmers_Shavers_lukdyd.png?height=64&width=64",
    "Epilators": "https://res.cloudinary.com/wishwell/image/upload/v1754112425/Epilators_np5iqr.webp?height=64&width=64",
    "Multi Groomers": "https://res.cloudinary.com/wishwell/image/upload/v1754112442/Multi_Groomers_oxmf5s.png?height=64&width=64",

    // Baby Care subsubcategories
    "Diapers": "https://res.cloudinary.com/wishwell/image/upload/v1754112821/Diapers_irebsr.png?height=64&width=64",
    "Food & Formula": "https://res.cloudinary.com/wishwell/image/upload/v1754112825/Food_Formula_ue36qe.jpg?height=64&width=64",
    "Bathing": "https://res.cloudinary.com/wishwell/image/upload/v1754112818/Bathing_zu4ybl.png?height=64&width=64",
    "Wipes": "https://res.cloudinary.com/wishwell/image/upload/v1754112834/Wipes_ws3xcd.png?height=64&width=64",
    "Cream & Lotions": "https://res.cloudinary.com/wishwell/image/upload/v1754112820/Cream_Lotions_dj0eae.png?height=64&width=64",
    "Oil & Talc": "https://res.cloudinary.com/wishwell/image/upload/v1754112826/Oil_Talc_zcf5xj.png?height=64&width=64",
    "Pharma": "https://res.cloudinary.com/wishwell/image/upload/v1754112830/Pharma_kkuzoi.jpg?height=64&width=64",
    "Feeding & Teething": "https://res.cloudinary.com/wishwell/image/upload/v1754112821/Feeding_Teething_kzxaxy.webp?height=64&width=64",
    "Books/Toys": "https://res.cloudinary.com/wishwell/image/upload/v1754112818/Books_Toys_n79olk.jpg?height=64&width=64",
    "Baby Hygiene": "https://res.cloudinary.com/wishwell/image/upload/v1754112818/Baby_Hygiene_jpkno9.png?height=64&width=64",
    "Mom Care": "https://res.cloudinary.com/wishwell/image/upload/v1754112826/Mom_Care_j8cxp4.png?height=64&width=64",
    "Travel/Baby Gear": "https://res.cloudinary.com/wishwell/image/upload/v1754112832/Travel_Baby_Gear_wx6m4p.png?height=64&width=64",
    "Clothes / Accessories": "https://res.cloudinary.com/wishwell/image/upload/v1754112818/Clothes___Accessories_q09uw8.jpg?height=64&width=64",

    // Protein & Supplements subsubcategories
    "Protein & Nutrition": "https://res.cloudinary.com/wishwell/image/upload/v1754113169/Sleep_Supplements_svg92v.jpg?height=64&width=64",
    "Immunity & Energy Boosters": "https://res.cloudinary.com/wishwell/image/upload/v1754113169/Sleep_Supplements_svg92v.jpg?height=64&width=64",
    "Multivitamins": "https://res.cloudinary.com/wishwell/image/upload/v1754113165/Multivitamins_qxrrgw.jpg?height=64&width=64",
    "Ayurvedic": "https://res.cloudinary.com/wishwell/image/upload/v1754113159/Ayurvedic_vglskh.png?height=64&width=64",
    "Gummies": "https://res.cloudinary.com/wishwell/image/upload/v1754113160/Gummies_brg1rm.png?height=64&width=64",
    "Bone & Joint Supplements": "https://res.cloudinary.com/wishwell/image/upload/v1754113160/Bone_Joint_Supplements_cqig40.png?height=64&width=64",
    "Hair/Nail/Skin Supplements": "https://res.cloudinary.com/wishwell/image/upload/v1754113160/Hair_Nail_Skin_Supplements_rdgidv.webp?height=64&width=64",
    "Sleep Supplements": "https://res.cloudinary.com/wishwell/image/upload/v1754113169/Sleep_Supplements_svg92v.jpg?height=64&width=64",
    "Bars": "https://res.cloudinary.com/wishwell/image/upload/v1754113159/Bars_pjxczp.png?height=64&width=64",
    "Superfoods": "https://res.cloudinary.com/wishwell/image/upload/v1754113173/Superfoods_kiuwvh.png?height=64&width=64",
    "Weight Management": "https://res.cloudinary.com/wishwell/image/upload/v1754113174/Weight_Management_s1eeqg.jpg?height=64&width=64",

    // Feminine Hygiene subsubcategories
    "Pads": "https://res.cloudinary.com/wishwell/image/upload/v1754113392/Pads_xg2db4.png?height=64&width=64",
    "Panties & Liners": "https://res.cloudinary.com/wishwell/image/upload/v1754113394/Panties_Liners_t2lhts.png?height=64&width=64",
    "Hair Removal": "https://res.cloudinary.com/wishwell/image/upload/v1754113381/Hair_Removal_vlk2lc.png?height=64&width=64",
    "Menstrual Cups & Tampons": "https://res.cloudinary.com/wishwell/image/upload/v1754113387/Menstrual_Cups_Tampons_mwzdjt.png?height=64&width=64",
    "Intimate Wipes & Wash": "https://res.cloudinary.com/wishwell/image/upload/v1754113383/Intimate_Wipes_Wash_xinhcx.png?height=64&width=64",
    "Disposal Bags": "https://res.cloudinary.com/wishwell/image/upload/v1754113380/Disposal_Bags_btapzo.png?height=64&width=64",
    "Cramp Relief": "https://res.cloudinary.com/wishwell/image/upload/v1754113378/Cramp_Relief_elikey.jpg?height=64&width=64",

    // Sexual Wellness subsubcategories
    "Condoms": "https://res.cloudinary.com/wishwell/image/upload/v1754113537/Condoms_qdzixv.png?height=64&width=64",
    "Lubricants": "https://res.cloudinary.com/wishwell/image/upload/v1754113538/Lubricants_bwqhdi.png?height=64&width=64",
    "Massagers": "https://res.cloudinary.com/wishwell/image/upload/v1754113540/Massagers_kbwwok.png?height=64&width=64",
    "Enhancers": "https://res.cloudinary.com/wishwell/image/upload/v1754113537/Enhancers_g1bisy.png?height=64&width=64",
    "Gift Kits": "https://res.cloudinary.com/wishwell/image/upload/v1754113539/Gift_Kits_ie8di6.png?height=64&width=64",

    // Health & Pharma subsubcategories
    "Cough Cold/Fever": "https://res.cloudinary.com/wishwell/image/upload/v1754113584/Cough_Cold_Fever_fhek9w.png?height=64&width=64",
    "Stomach": "https://res.cloudinary.com/wishwell/image/upload/v1754113608/Stomach_md8jvo.webp?height=64&width=64",
    "Calcium/Vitamin D": "https://res.cloudinary.com/wishwell/image/upload/v1754113608/Stomach_md8jvo.webp?height=64&width=64",
    "Wound/Pain Relief": "https://res.cloudinary.com/wishwell/image/upload/v1754113612/Wound_Pain_Relief_oje2nl.webp?height=64&width=64",
    "Oral/Dental": "https://res.cloudinary.com/wishwell/image/upload/v1754113600/Oral_Dental_f0mzk9.webp?height=64&width=64",
    "Derma": "https://res.cloudinary.com/wishwell/image/upload/v1754113584/Derma_jvzfjc.webp?height=64&width=64",
    "ENT": "https://res.cloudinary.com/wishwell/image/upload/v1754113588/ENT_zta2qq.webp?height=64&width=64",
    "Digestives": "https://res.cloudinary.com/wishwell/image/upload/v1754113588/ENT_zta2qq.webp?height=64&width=64",
    "Masks/Sanitizers": "https://res.cloudinary.com/wishwell/image/upload/v1754113594/Masks_Sanitizers_tzqhw7.png?height=64&width=64",
    "Pregnancy Kit": "https://res.cloudinary.com/wishwell/image/upload/v1754113602/Pregnancy_Kit_jgmknq.png?height=64&width=64",
    "Medical Devices": "https://res.cloudinary.com/wishwell/image/upload/v1754113595/Medical_Devices_bd8qfv.webp?height=64&width=64",
    "Adult Diapers": "https://res.cloudinary.com/wishwell/image/upload/v1754113578/Adult_Diapers_efwovk.jpg?height=64&width=64",
    "Handwash": "https://res.cloudinary.com/wishwell/image/upload/v1754113592/Handwash_liq9zn.png?height=64&width=64",
    "Wellness": "https://res.cloudinary.com/wishwell/image/upload/v1754113610/Wellness_v7fqok.jpg?height=64&width=64",
    "Protein": "https://res.cloudinary.com/wishwell/image/upload/v1754113604/Protein_zdvzvi.png?height=64&width=64",
    "Boosters": "https://res.cloudinary.com/wishwell/image/upload/v1754113579/Boosters_wpjrh6.png?height=64&width=64",
    "Sexual enhancers": "https://res.cloudinary.com/wishwell/image/upload/v1754113606/Sexual_enhancers_t0kjdf.png?height=64&width=64",
    "Nutritional Supplements": "https://res.cloudinary.com/wishwell/image/upload/v1754113598/Nutritional_Supplements_ueexsy.webp?height=64&width=64",

    // Accessories subcategories
    "Women's Jwellery": "https://res.cloudinary.com/wishwell/image/upload/v1753885357/Women_s_Jewellery__j2sqsr.png?height=64&width=64",
    "Men's Jwellery": "https://res.cloudinary.com/wishwell/image/upload/v1753885311/Men_s_Jewellery__ejt2zu.png?height=64&width=64",
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
    "Jwellery Sets": "https://res.cloudinary.com/wishwell/image/upload/v1753885352/Jewellery_Set_cjr4l4.png?height=64&width=64",

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
            "Women's Accessories": "https://res.cloudinary.com/wishwell/image/upload/v1753885334/Wallets_rvlvho.png?height=64&width=64",
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
    "Fresh Vegetables": "https://res.cloudinary.com/wishwell/image/upload/v1754488015/Fresh_Vegetables_fbfhho.png?height=64&width=64",
    "Dairy, Bread & Eggs": "https://res.cloudinary.com/wishwell/image/upload/v1754114002/Dairy_Bread_Eggs_ghi789.png?height=64&width=64",
    "Cereals & Breakfast": "https://res.cloudinary.com/wishwell/image/upload/v1754114003/Cereals_Breakfast_jkl012.png?height=64&width=64",
    "Atta, Rice & Dal": "https://res.cloudinary.com/wishwell/image/upload/v1754114004/Atta_Rice_Dal_mno345.png?height=64&width=64",
    "Oils & Ghee": "https://res.cloudinary.com/wishwell/image/upload/v1754114005/Oils_Ghee_pqr678.png?height=64&width=64",
    "Masalas": "https://res.cloudinary.com/wishwell/image/upload/v1754114006/Masalas_stu901.png?height=64&width=64",
    "Dry Fruits & Seeds": "https://res.cloudinary.com/wishwell/image/upload/v1754114007/Dry_Fruits_Seeds_vwx234.png?height=64&width=64",
    "Biscuits & Cakes": "https://res.cloudinary.com/wishwell/image/upload/v1754114008/Biscuits_Cakes_yza567.png?height=64&width=64",
    "Tea, Coffee & Milk Drinks": "https://res.cloudinary.com/wishwell/image/upload/v1754114009/Tea_Coffee_Milk_bcd890.png?height=64&width=64",
    "Sauces & Spreads": "https://res.cloudinary.com/wishwell/image/upload/v1754114010/Sauces_Spreads_efg123.png?height=64&width=64",
    "Meat & Seafood": "https://res.cloudinary.com/wishwell/image/upload/v1754114011/Meat_Seafood_hij456.png?height=64&width=64",

    //Fresh vegetables subsubcategories
    "Vegetables": "https://res.cloudinary.com/wishwell/image/upload/v1754488021/Vegetables_g3se37.png?height=64&width=64",
    "Exotic Vegetables": "https://res.cloudinary.com/wishwell/image/upload/v1754488015/Exotic_Vegetables_dsfz1l.png?height=64&width=64",

    "Frozen Vegetables": "https://res.cloudinary.com/wishwell/image/upload/v1754488016/Frozen_Vegetables_lgpw7d.png?height=64&width=64",

    "Fresh Fruits": {
        default: "https://res.cloudinary.com/wishwell/image/upload/v1754114024/Fresh_Fruits_uvx345.png?height=64&width=64",
        contexts: {
            "Fresh Vegetables": "https://res.cloudinary.com/wishwell/image/upload/v1754488015/Fresh_Fruits_m6jwky.png?height=64&width=64",
        }
    },

    //Fresh fruits subsubcategories
    "Fruits": {
        default: "https://res.cloudinary.com/wishwell/image/upload/v1754114024/Fresh_Fruits_uvx345.png?height=64&width=64",
        contexts: {
            "Fresh Vegetables": "https://res.cloudinary.com/wishwell/image/upload/v1754114024/Fresh_Fruits_uvx345.png?height=64&width=64",
        }
    },

    "Seasonal Fruits": {
        default: "https://res.cloudinary.com/wishwell/image/upload/v1754114015/Seasonal_Fruits_tuv678.png?height=64&width=64",
        contexts: {
            "Fresh Vegetables": "https://res.cloudinary.com/wishwell/image/upload/v1754488021/Seasonal_Fruits_e7flpw.png?height=64&width=64",
        }
    },
    "Exotic Fruits": {
        default: "https://res.cloudinary.com/wishwell/image/upload/v1754114021/Exotic_Fruits_lmn456.png?height=64&width=64",
        contexts: {
            "Fresh Vegetables": "https://res.cloudinary.com/wishwell/image/upload/v1754488015/Exotic_Fruits_ztlddk.png?height=64&width=64",
        }
    },
    "Cut Fruits & Juices": {
        default: "https://res.cloudinary.com/wishwell/image/upload/v1754114022/Cut_Fruits_Juices_opq789.png?height=64&width=64",
        contexts: {
            "Fresh Vegetables": "https://res.cloudinary.com/wishwell/image/upload/v1754488015/Cut_Fruits_Juices_eqbr2a.png?height=64&width=64",
        }
    },
    "Pooja & Festive": {
        default: "https://res.cloudinary.com/wishwell/image/upload/v1754114017/Pooja_Festive_zab234.png?height=64&width=64",
        contexts: {
            "Fresh Vegetables": "https://res.cloudinary.com/wishwell/image/upload/v1754488020/Pooja_Festive_uuuqi8.png?height=64&width=64",
        }
    },
    "Bouquet & Plants": {
        default: "https://res.cloudinary.com/wishwell/image/upload/v1754114020/Bouquet_Plants_ijk123.png?height=64&width=64",
        contexts: {
            "Fresh Vegetables": "https://res.cloudinary.com/wishwell/image/upload/v1754488015/Bouquet_Plants_gzvqj6.png?height=64&width=64",
        }
    },
    "Combos": {
        default: "https://res.cloudinary.com/wishwell/image/upload/v1754114019/Combos_fgh890.png?height=64&width=64",
        contexts: {
            "Fresh Vegetables": "https://res.cloudinary.com/wishwell/image/upload/v1754488015/Combos_w6vimr.png?height=64&width=64",
        }
    },
    "Certified Organics": {
        default: "https://res.cloudinary.com/wishwell/image/upload/v1754114018/Certified_Organics_cde567.png?height=64&width=64",
        contexts: {
            "Fresh Vegetables": "https://res.cloudinary.com/wishwell/image/upload/v1754488015/Certified_Organics_ercrv6.png?height=64&width=64",
        }
    },
    "Leafy & Seasonings": {
        default: "https://res.cloudinary.com/wishwell/image/upload/v1754114013/Leafy_Seasonings_nop012.png?height=64&width=64",
        contexts: {
            "Fresh Vegetables": "https://res.cloudinary.com/wishwell/image/upload/v1754488016/Leafy_Seasonings_kn9mx4.png?height=64&width=64",
        }
    },
    "Cuts & Sprouts": {
        default: "https://res.cloudinary.com/wishwell/image/upload/v1754114016/Cuts_Sprouts_wxy901.png?height=64&width=64",
        contexts: {
            "Fresh Vegetables": "https://res.cloudinary.com/wishwell/image/upload/v1754488015/Cuts_Sprouts_zs56qs.png?height=64&width=64",
        }
    },

    //Dairy Bread Eggs Subsubcategories
    "Bread & Buns": "https://res.cloudinary.com/wishwell/image/upload/v1754490000/Bread_Buns_abc123.png?height=64&width=64",
    "Eggs": "https://res.cloudinary.com/wishwell/image/upload/v1754490002/Eggs_ghi789.png?height=64&width=64",
    "Curd & Yogurts": "https://res.cloudinary.com/wishwell/image/upload/v1754490003/Curd_Yogurts_jkl012.png?height=64&width=64",
    "Paneer & Cream": "https://res.cloudinary.com/wishwell/image/upload/v1754490004/Paneer_Cream_mno345.png?height=64&width=64",
    "Cheese": "https://res.cloudinary.com/wishwell/image/upload/v1754490005/Cheese_pqr678.png?height=64&width=64",
    "Butter": "https://res.cloudinary.com/wishwell/image/upload/v1754490006/Butter_stu901.png?height=64&width=64",
    "Batters & Chutneys": "https://res.cloudinary.com/wishwell/image/upload/v1754490007/Batters_Chutneys_vwx234.png?height=64&width=64",
    "Indian Breads": "https://res.cloudinary.com/wishwell/image/upload/v1754490008/Indian_Breads_yza567.png?height=64&width=64",
    "Dairy Alternatives": "https://res.cloudinary.com/wishwell/image/upload/v1754490009/Dairy_Alternatives_bcd890.png?height=64&width=64",
    "Lassi & Buttermilk": "https://res.cloudinary.com/wishwell/image/upload/v1754490010/Lassi_Buttermilk_efg123.png?height=64&width=64",
    "Milkshakes": "https://res.cloudinary.com/wishwell/image/upload/v1754490011/Milkshakes_hij456.png?height=64&width=64",
    "Bakery": "https://res.cloudinary.com/wishwell/image/upload/v1754490012/Bakery_klm789.png?height=64&width=64",

    // Cereals & Breakfast subsubcategories
    "Muesli & Granola": "https://res.cloudinary.com/wishwell/image/upload/v1754490013/Muesli_Granola_nop012.png?height=64&width=64",
    "Oats": "https://res.cloudinary.com/wishwell/image/upload/v1754490014/Oats_qrs345.png?height=64&width=64",
    "Kids Cereals": "https://res.cloudinary.com/wishwell/image/upload/v1754490015/Kids_Cereals_tuv678.png?height=64&width=64",
    "Flakes": "https://res.cloudinary.com/wishwell/image/upload/v1754490016/Flakes_wxy901.png?height=64&width=64",
    "Energy Bars": "https://res.cloudinary.com/wishwell/image/upload/v1754490017/Energy_Bars_zab234.png?height=64&width=64",
    "Ready Mixes": "https://res.cloudinary.com/wishwell/image/upload/v1754490018/Ready_Mixes_cde567.png?height=64&width=64",
    "Peanut Butters": "https://res.cloudinary.com/wishwell/image/upload/v1754490020/Peanut_Butters_ijk123.png?height=64&width=64",
    "Chocolate Spreads": "https://res.cloudinary.com/wishwell/image/upload/v1754490021/Chocolate_Spreads_lmn456.png?height=64&width=64",
    "Instant Oats": "https://res.cloudinary.com/wishwell/image/upload/v1754490023/Instant_Oats_rst012.png?height=64&width=64",
    "Seeds & Trail Mixes": "https://res.cloudinary.com/wishwell/image/upload/v1754490024/Seeds_Trail_Mixes_uvw345.png?height=64&width=64",
    "Hot Beverages": "https://res.cloudinary.com/wishwell/image/upload/v1754490025/Hot_Beverages_xyz678.png?height=64&width=64",
    "Juices & Fruit Drinks": "https://res.cloudinary.com/wishwell/image/upload/v1754490026/Juices_Fruit_Drinks_abc901.png?height=64&width=64",
    "Batters": "https://res.cloudinary.com/wishwell/image/upload/v1754490028/Batters_ghi567.png?height=64&width=64",


    //Atta Rice & Dal subsubcategories
    "Basmati Rice": "https://res.cloudinary.com/wishwell/image/upload/v1754490030/Basmati_Rice_mno123.png?height=64&width=64",
    "Atta": "https://res.cloudinary.com/wishwell/image/upload/v1754490031/Atta_pqr456.png?height=64&width=64",
    "Rice": "https://res.cloudinary.com/wishwell/image/upload/v1754490032/Rice_stu789.png?height=64&width=64",
    "Besan": "https://res.cloudinary.com/wishwell/image/upload/v1754490033/Besan_vwx012.png?height=64&width=64",
    "Sooji & Maida": "https://res.cloudinary.com/wishwell/image/upload/v1754490034/Sooji_Maida_yza345.png?height=64&width=64",
    "Toor/Moong/Urad": "https://res.cloudinary.com/wishwell/image/upload/v1754490036/Toor_Moong_Urad_efg901.png?height=64&width=64",
    "Rajma/Chola/Others": "https://res.cloudinary.com/wishwell/image/upload/v1754490037/Rajma_Chola_Others_hij234.png?height=64&width=64",
    "Poha & Puffed Rice": "https://res.cloudinary.com/wishwell/image/upload/v1754490038/Poha_Puffed_Rice_klm567.png?height=64&width=64",
    "Ready to Cook Flour Mix": "https://res.cloudinary.com/wishwell/image/upload/v1754490039/Ready_Cook_Flour_Mix_nop890.png?height=64&width=64",
    "Millets & Daliya": "https://res.cloudinary.com/wishwell/image/upload/v1754490040/Millets_Daliya_qrs123.png?height=64&width=64",
    "Other Flours": "https://res.cloudinary.com/wishwell/image/upload/v1754490041/Other_Flours_tuv456.png?height=64&width=64",
    "Soya Chunk & Badi": "https://res.cloudinary.com/wishwell/image/upload/v1754490042/Soya_Chunk_Badi_wxy789.png?height=64&width=64",

    //Oils & Ghee subsubcategories
    "Sunflower Oil": "https://res.cloudinary.com/wishwell/image/upload/v1754490043/Sunflower_Oil_zab012.png?height=64&width=64",
    "Mustard Oil": "https://res.cloudinary.com/wishwell/image/upload/v1754490044/Mustard_Oil_cde345.png?height=64&width=64",
    "Ghee": "https://res.cloudinary.com/wishwell/image/upload/v1754490045/Ghee_fgh678.png?height=64&width=64",
    "Blended Oils": "https://res.cloudinary.com/wishwell/image/upload/v1754490046/Blended_Oils_ijk901.png?height=64&width=64",
    "Rice Bran Oil": "https://res.cloudinary.com/wishwell/image/upload/v1754490048/Rice_Bran_Oil_opq567.png?height=64&width=64",
    "Olive Oil": "https://res.cloudinary.com/wishwell/image/upload/v1754490049/Olive_Oil_rst890.png?height=64&width=64",
    "Soybean Oil": "https://res.cloudinary.com/wishwell/image/upload/v1754490050/Soybean_Oil_uvw123.png?height=64&width=64",
    "Cold - pressed": "https://res.cloudinary.com/wishwell/image/upload/v1754490051/Cold_Pressed_xyz456.png?height=64&width=64",

    //Masalas subsubcategories
    "Powdered Spices": "https://res.cloudinary.com/wishwell/image/upload/v1754490052/Powdered_Spices_abc123.png?height=64&width=64",
    "Salt": "https://res.cloudinary.com/wishwell/image/upload/v1754490053/Salt_def456.png?height=64&width=64",
    "Sugar & Jaggery": "https://res.cloudinary.com/wishwell/image/upload/v1754490054/Sugar_Jaggery_ghi789.png?height=64&width=64",
    "Whole Spices": "https://res.cloudinary.com/wishwell/image/upload/v1754490055/Whole_Spices_jkl012.png?height=64&width=64",
    "Ready Masala": "https://res.cloudinary.com/wishwell/image/upload/v1754490056/Ready_Masala_mno345.png?height=64&width=64",
    "Paste & Puree": "https://res.cloudinary.com/wishwell/image/upload/v1754490057/Paste_Puree_pqr678.png?height=64&width=64",
    "Herbs & Seasoning": "https://res.cloudinary.com/wishwell/image/upload/v1754490058/Herbs_Seasoning_stu901.png?height=64&width=64",
    "Pickles & Chutney": "https://res.cloudinary.com/wishwell/image/upload/v1754490059/Pickles_Chutney_vwx234.png?height=64&width=64",
    "Papad & Fryums": "https://res.cloudinary.com/wishwell/image/upload/v1754490060/Papad_Fryums_yza567.png?height=64&width=64",
    "Coconut Milk & Powder": "https://res.cloudinary.com/wishwell/image/upload/v1754490061/Coconut_Milk_Powder_bcd890.png?height=64&width=64",

    //Dry Fruits & Seeds subsubcategories
    "Mixed Dry Fruits": "https://res.cloudinary.com/wishwell/image/upload/v1754490062/Mixed_Dry_Fruits_efg123.png?height=64&width=64",
    "Almonds": "https://res.cloudinary.com/wishwell/image/upload/v1754490063/Almonds_hij456.png?height=64&width=64",
    "Cashews": "https://res.cloudinary.com/wishwell/image/upload/v1754490064/Cashews_klm789.png?height=64&width=64",
    "Dates": "https://res.cloudinary.com/wishwell/image/upload/v1754490065/Dates_nop012.png?height=64&width=64",
    "Pista & Walnuts": "https://res.cloudinary.com/wishwell/image/upload/v1754490066/Pista_Walnuts_qrs345.png?height=64&width=64",
    "Makhana & Seeds": "https://res.cloudinary.com/wishwell/image/upload/v1754490067/Makhana_Seeds_tuv678.png?height=64&width=64",
    "Dried Fruits": "https://res.cloudinary.com/wishwell/image/upload/v1754490068/Dried_Fruits_wxy901.png?height=64&width=64",
    "Nuts & Seeds Mix": "https://res.cloudinary.com/wishwell/image/upload/v1754490069/Nuts_Seeds_Mix_zab234.png?height=64&width=64",
    "Gift Packs": "https://res.cloudinary.com/wishwell/image/upload/v1754490070/Gift_Packs_cde567.png?height=64&width=64",

    //Biscuits & Cakes subsubcategories
    "Value Packs": "https://res.cloudinary.com/wishwell/image/upload/v1754490071/Value_Packs_fgh890.png?height=64&width=64",
    "Cakes & Pies": "https://res.cloudinary.com/wishwell/image/upload/v1754490072/Cakes_Pies_ijk123.png?height=64&width=64",
    "Cream Biscuits": "https://res.cloudinary.com/wishwell/image/upload/v1754490074/Cream_Biscuits_opq789.png?height=64&width=64",
    "Marie/Digestive": "https://res.cloudinary.com/wishwell/image/upload/v1754490075/Marie_Digestive_rst012.png?height=64&width=64",
    "Salted/Plain": "https://res.cloudinary.com/wishwell/image/upload/v1754490076/Salted_Plain_uvw345.png?height=64&width=64",
    "Rusk": "https://res.cloudinary.com/wishwell/image/upload/v1754490078/Rusk_abc901.png?height=64&width=64",
    "Dessert Mixes": "https://res.cloudinary.com/wishwell/image/upload/v1754490079/Dessert_Mixes_def234.png?height=64&width=64",
    "Baking ingredients": "https://res.cloudinary.com/wishwell/image/upload/v1754490080/Baking_Ingredients_ghi567.png?height=64&width=64",
    "Flavouring": "https://res.cloudinary.com/wishwell/image/upload/v1754490081/Flavouring_jkl890.png?height=64&width=64",
    "Ice Cream Cakes": "https://res.cloudinary.com/wishwell/image/upload/v1754490085/Ice_Cream_Cakes_vwx012.png?height=64&width=64",

    //Tea, Coffee & Milk Drinks subsubcategories
    "Tea": "https://res.cloudinary.com/wishwell/image/upload/v1754490086/Tea_yza345.png?height=64&width=64",
    "Instant Coffee": "https://res.cloudinary.com/wishwell/image/upload/v1754490087/Instant_Coffee_bcd678.png?height=64&width=64",
    "Filter/Ground Coffee": "https://res.cloudinary.com/wishwell/image/upload/v1754490088/Filter_Ground_Coffee_efg901.png?height=64&width=64",
    "Green/Herbal Tea": "https://res.cloudinary.com/wishwell/image/upload/v1754490089/Green_Herbal_Tea_hij234.png?height=64&width=64",
    "Nutrition": "https://res.cloudinary.com/wishwell/image/upload/v1754490092/Nutrition_qrs123.png?height=64&width=64",
    "Milkshake & Smoothie": "https://res.cloudinary.com/wishwell/image/upload/v1754490093/Milkshake_Smoothie_tuv456.png?height=64&width=64",
    "Syrups & Powder": "https://res.cloudinary.com/wishwell/image/upload/v1754490094/Syrups_Powder_wxy789.png?height=64&width=64",
    "Premixes": "https://res.cloudinary.com/wishwell/image/upload/v1754490095/Premixes_zab012.png?height=64&width=64",

    //Sauces & Spreads subsubcategories
    "Peanut Butter": "https://res.cloudinary.com/wishwell/image/upload/v1754490100/Peanut_Butter_abc123.png?height=64&width=64",
    "Chocolate Spread": "https://res.cloudinary.com/wishwell/image/upload/v1754490101/Chocolate_Spread_def456.png?height=64&width=64",
    "Honey & Cider Vinegar": "https://res.cloudinary.com/wishwell/image/upload/v1754490102/Honey_Cider_Vinegar_ghi789.png?height=64&width=64",
    "Tomato Ketchup": "https://res.cloudinary.com/wishwell/image/upload/v1754490104/Tomato_Ketchup_mno345.png?height=64&width=64",
    "Asian Sauces": "https://res.cloudinary.com/wishwell/image/upload/v1754490105/Asian_Sauces_pqr678.png?height=64&width=64",
    "Cooking Sauces": "https://res.cloudinary.com/wishwell/image/upload/v1754490106/Cooking_Sauces_stu901.png?height=64&width=64",
    "Dips & Dressing": "https://res.cloudinary.com/wishwell/image/upload/v1754490107/Dips_Dressing_vwx234.png?height=64&width=64",

    //Meat & Seafood subsubcategories
    "Fresh Chicken": "https://res.cloudinary.com/wishwell/image/upload/v1754490110/Fresh_Chicken_efg123.png?height=64&width=64",
    "Seafood": "https://res.cloudinary.com/wishwell/image/upload/v1754490111/Seafood_hij456.png?height=64&width=64",
    "Mutton": "https://res.cloudinary.com/wishwell/image/upload/v1754490112/Mutton_klm789.png?height=64&width=64",
    "Marinated": "https://res.cloudinary.com/wishwell/image/upload/v1754490113/Marinated_nop012.png?height=64&width=64",
    "Paste & Spreads": "https://res.cloudinary.com/wishwell/image/upload/v1754490115/Paste_Spreads_tuv678.png?height=64&width=64",
    "Frozen Food": "https://res.cloudinary.com/wishwell/image/upload/v1754490116/Frozen_Food_wxy901.png?height=64&width=64",
    "Plant - Based Meat": "https://res.cloudinary.com/wishwell/image/upload/v1754490117/Plant_Based_Meat_zab234.png?height=64&width=64",

    "Pancake Mixes": {
        default: "https://res.cloudinary.com/wishwell/image/upload/v1754490118/Pancake_Mixes_cde567.png?height=64&width=64",
        contexts: {
            "Cereals & Breakfast": "https://res.cloudinary.com/wishwell/image/upload/v1754490118/Pancake_Mixes_cde567.png?height=64&width=64",
            "Biscuits & Cakes": "https://res.cloudinary.com/wishwell/image/upload/v1754490118/Pancake_Mixes_cde567.png?height=64&width=64",
        }
    },

    "Cookies": {
        default: "https://res.cloudinary.com/wishwell/image/upload/v1754490119/Cookies_efg890.png?height=64&width=64",
        contexts: {
            "Tea, Coffee & Milk Drinks": "https://res.cloudinary.com/wishwell/image/upload/v1754490119/Cookies_efg890.png?height=64&width=64",
            "Biscuits & Cakes": "https://res.cloudinary.com/wishwell/image/upload/v1754490119/Cookies_efg890.png?height=64&width=64",
        }
    },

    "Gourmet": {
        default: "https://res.cloudinary.com/wishwell/image/upload/v1754490120/Gourmet_hij123.png?height=64&width=64",
        contexts: {
            "Sauces & Spreads": "https://res.cloudinary.com/wishwell/image/upload/v1754490120/Gourmet_hij123.png?height=64&width=64",
            "Cereals & Breakfast": "https://res.cloudinary.com/wishwell/image/upload/v1754490120/Gourmet_hij123.png?height=64&width=64",
            "Tea, Coffee & Milk Drinks": "https://res.cloudinary.com/wishwell/image/upload/v1754490120/Gourmet_hij123.png?height=64&width=64",
            "Chocolates": "https://res.cloudinary.com/wishwell/image/upload/v1754490120/Gourmet_hij123.png?height=64&width=64",
        }
    },
    "Mayo & Spreads": {
        default: "https://res.cloudinary.com/wishwell/image/upload/v1754490121/Mayo_Spreads_ijk456.png?height=64&width=64",
        contexts: {
            "Sauces & Spreads": "https://res.cloudinary.com/wishwell/image/upload/v1754490121/Mayo_Spreads_ijk456.png?height=64&width=64",
            "Cereals & Breakfast": "https://res.cloudinary.com/wishwell/image/upload/v1754490121/Mayo_Spreads_ijk456.png?height=64&width=64",
        }
    },
    "Jams": {
        default: "https://res.cloudinary.com/wishwell/image/upload/v1754490122/Jam_lmn789.png?height=64&width=64",
        contexts: {
            "Sauces & Spreads": "https://res.cloudinary.com/wishwell/image/upload/v1754490122/Jam_lmn789.png?height=64&width=64",
            "Cereals & Breakfast": "https://res.cloudinary.com/wishwell/image/upload/v1754490122/Jam_lmn789.png?height=64&width=64",
        }
    },

    "Drink Mixes": {
        default: "https://res.cloudinary.com/wishwell/image/upload/v1754490123/Drink_Mixes_mno345.png?height=64&width=64",
        contexts: {
            "Cold Drinks and Juices": "https://res.cloudinary.com/wishwell/image/upload/v1754490123/Drink_Mixes_mno345.png?height=64&width=64",
            "Tea, Coffee & Milk Drinks": "https://res.cloudinary.com/wishwell/image/upload/v1754490123/Drink_Mixes_mno345.png?height=64&width=64",
        }
    },

    "Cold Coffee": {
        default: "https://res.cloudinary.com/wishwell/image/upload/v1754490124/Cold_Coffee_pqr678.png?height=64&width=64",
        contexts: {
            "Tea, Coffee & Milk Drinks": "https://res.cloudinary.com/wishwell/image/upload/v1754490124/Cold_Coffee_pqr678.png?height=64&width=64",
            "Cold Drinks and Juices": "https://res.cloudinary.com/wishwell/image/upload/v1754490124/Cold_Coffee_pqr678.png?height=64&width=64",
        }
    },

    "Healthy Snacking": {
        default: "https://res.cloudinary.com/wishwell/image/upload/v1754490125/Healthy_Snacking_stu901.png?height=64&width=64",
        contexts: {
            "Biscuits & Cakes": "https://res.cloudinary.com/wishwell/image/upload/v1754490125/Healthy_Snacking_stu901.png?height=64&width=64",
            "Chips & Namkeens": "https://res.cloudinary.com/wishwell/image/upload/v1754490125/Healthy_Snacking_stu901.png?height=64&width=64",
        }
    },

    "Gift Boxes": {
        default: "https://res.cloudinary.com/wishwell/image/upload/v1754490126/Gift_Boxes_vwx234.png?height=64&width=64",
        contexts: {
            "Biscuits & Cakes": "https://res.cloudinary.com/wishwell/image/upload/v1754490126/Gift_Boxes_vwx234.png?height=64&width=64",
            "Chocolates": "https://res.cloudinary.com/wishwell/image/upload/v1754490126/Gift_Boxes_vwx234.png?height=64&width=64",
        }
    },

    "Premium": {
        default: "https://res.cloudinary.com/wishwell/image/upload/v1754490127/Premium_yza567.png?height=64&width=64",
        contexts: {
            "Ice Creams and Frozen Desserts": "https://res.cloudinary.com/wishwell/image/upload/v1754490127/Premium_yza567.png?height=64&width=64",
            "Chocolates": "https://res.cloudinary.com/wishwell/image/upload/v1754490127/Premium_yza567.png?height=64&width=64",
        }
    },

    "Milk": {
        default: "https://res.cloudinary.com/wishwell/image/upload/v1754490128/Milk_bcd890.png?height=64&width=64",
        contexts: {
            "Dairy Bread Eggs": "https://res.cloudinary.com/wishwell/image/upload/v1754490128/Milk_bcd890.png?height=64&width=64",
            "chocolates": "https://res.cloudinary.com/wishwell/image/upload/v1754490128/Milk_bcd890.png?height=64&width=64",
        }
    },

    "Wafers": {
        default: "https://res.cloudinary.com/wishwell/image/upload/v1754490129/Wafers_efg123.png?height=64&width=64",
        contexts: {
            "Chocolates": "https://res.cloudinary.com/wishwell/image/upload/v1754490129/Wafers_efg123.png?height=64&width=64",
            "Biscuits & Cakes": "https://res.cloudinary.com/wishwell/image/upload/v1754490129/Wafers_efg123.png?height=64&width=64",
        }
    },

    "Cold Cuts": {
        default: "https://res.cloudinary.com/wishwell/image/upload/v1754490130/Cold_Cuts_hij456.png?height=64&width=64",
        contexts: {
            "Meat & Seafood": "https://res.cloudinary.com/wishwell/image/upload/v1754490130/Cold_Cuts_hij456.png?height=64&width=64",
            "Frozen Food": "https://res.cloudinary.com/wishwell/image/upload/v1754490130/Cold_Cuts_hij456.png?height=64&width=64",
        }
    },


    // Snacks subcategories
    "Cold Drinks and Juices": "https://res.cloudinary.com/wishwell/image/upload/v1754490123/Cold_Drinks_Juices_abc123.png?height=64&width=64",
    "Ice Creams and Frozen Desserts": "https://res.cloudinary.com/wishwell/image/upload/v1754490124/Ice_Creams_Frozen_Desserts_def456.png?height=64&width=64",
    "Chips and Namkeens": "https://res.cloudinary.com/wishwell/image/upload/v1754490125/Chips_Namkeens_ghi789.png?height=64&width=64",
    "Chocolates": "https://res.cloudinary.com/wishwell/image/upload/v1754490126/Chocolates_jkl012.png?height=64&width=64",
    "Noodles, Pasta, Vermicelli": "https://res.cloudinary.com/wishwell/image/upload/v1754490127/Noodles_Pasta_Vermicelli_mno345.png?height=64&width=64",
    // "Frozen Food": "https://res.cloudinary.com/wishwell/image/upload/v1754490128/Frozen_Food_pqr678.png?height=64&width=64",
    "Sweets": "https://res.cloudinary.com/wishwell/image/upload/v1754490129/Sweets_stu901.png?height=64&width=64",
    "Paan Corner": "https://res.cloudinary.com/wishwell/image/upload/v1754490130/Paan_Corner_vwx234.png?height=64&width=64",

    // Cold Drinks and Juices subsubcategories
    "Soft Drinks": "https://res.cloudinary.com/wishwell/image/upload/v1754490131/Soft_Drinks_abc123.png?height=64&width=64",
    "Juices & Drinks": "https://res.cloudinary.com/wishwell/image/upload/v1754490132/Juices_Drinks_def456.png?height=64&width=64",
    "Energy Drinks": "https://res.cloudinary.com/wishwell/image/upload/v1754490133/Energy_Drinks_ghi789.png?height=64&width=64",
    "Mango Drinks": "https://res.cloudinary.com/wishwell/image/upload/v1754490134/Mango_Drinks_jkl012.png?height=64&width=64",
    "Fresh Juice": "https://res.cloudinary.com/wishwell/image/upload/v1754490135/Fresh_Juice_mno345.png?height=64&width=64",
    "Soda & Mixers": "https://res.cloudinary.com/wishwell/image/upload/v1754490136/Soda_Mixers_pqr678.png?height=64&width=64",
    "Coconut Water": "https://res.cloudinary.com/wishwell/image/upload/v1754490137/Coconut_Water_stu901.png?height=64&width=64",
    "Diet Soft Drinks": "https://res.cloudinary.com/wishwell/image/upload/v1754490138/Diet_Soft_Drinks_vwx234.png?height=64&width=64",
    "Hydration": "https://res.cloudinary.com/wishwell/image/upload/v1754490139/Hydration_yza567.png?height=64&width=64",
    "Water & Ice Cubes": "https://res.cloudinary.com/wishwell/image/upload/v1754490140/Water_Ice_Cubes_bcd890.png?height=64&width=64",
    "Non Alcoholic": "https://res.cloudinary.com/wishwell/image/upload/v1754490141/Non_Alcoholic_efg123.png?height=64&width=64",
    "Ice Tea & Kombucha": "https://res.cloudinary.com/wishwell/image/upload/v1754490142/Ice_Tea_Kombucha_hij456.png?height=64&width=64",
    "Milk Drinks": "https://res.cloudinary.com/wishwell/image/upload/v1754490144/Milk_Drinks_nop012.png?height=64&width=64",

    // Ice Creams and Frozen Desserts subsubcategories
    "Rare Finds": "https://res.cloudinary.com/wishwell/image/upload/v1754490146/Rare_Finds_tuv678.png?height=64&width=64",
    "Tubs & Party Packs": "https://res.cloudinary.com/wishwell/image/upload/v1754490147/Tubs_Party_Packs_wxy901.png?height=64&width=64",
    "Cones": "https://res.cloudinary.com/wishwell/image/upload/v1754490148/Cones_zab234.png?height=64&width=64",
    "Sticks": "https://res.cloudinary.com/wishwell/image/upload/v1754490149/Sticks_cde567.png?height=64&width=64",
    "Guilt Free": "https://res.cloudinary.com/wishwell/image/upload/v1754490150/Guilt_Free_fgh890.png?height=64&width=64",
    "Kulfi": "https://res.cloudinary.com/wishwell/image/upload/v1754490151/Kulfi_hij123.png?height=64&width=64",
    "Cups": "https://res.cloudinary.com/wishwell/image/upload/v1754490153/Cups_nop789.png?height=64&width=64",
    "Cakes & Sandwiches": "https://res.cloudinary.com/wishwell/image/upload/v1754490154/Cakes_Sandwiches_qrs012.png?height=64&width=64",
    "Regional Favourites": "https://res.cloudinary.com/wishwell/image/upload/v1754490155/Regional_Favourites_tuv345.png?height=64&width=64",
    "Brownies & Cakes": "https://res.cloudinary.com/wishwell/image/upload/v1754490156/Brownies_Cakes_wxy678.png?height=64&width=64",
    "Syrups": "https://res.cloudinary.com/wishwell/image/upload/v1754490157/Syrups_zab901.png?height=64&width=64",

    // Chips and Namkeens subsubcategories
    "Chips & Crisps": "https://res.cloudinary.com/wishwell/image/upload/v1754490159/Chips_Crisps_fgh567.png?height=64&width=64",
    "Nachos": "https://res.cloudinary.com/wishwell/image/upload/v1754490160/Nachos_ijk890.png?height=64&width=64",
    "Puffs & Crunchies": "https://res.cloudinary.com/wishwell/image/upload/v1754490161/Puffs_Crunchies_lmn123.png?height=64&width=64",
    "Bhujia & Namkeens": "https://res.cloudinary.com/wishwell/image/upload/v1754490162/Bhujia_Namkeens_opq456.png?height=64&width=64",
    "Nuts & Makhana": "https://res.cloudinary.com/wishwell/image/upload/v1754490164/Nuts_Makhana_tuv012.png?height=64&width=64",
    "Indian Snacks": "https://res.cloudinary.com/wishwell/image/upload/v1754490165/Indian_Snacks_wxy345.png?height=64&width=64",
    "Popcorn": "https://res.cloudinary.com/wishwell/image/upload/v1754490166/Popcorn_zab678.png?height=64&width=64",
    "Gift Hampers": "https://res.cloudinary.com/wishwell/image/upload/v1754490167/Gift_Hampers_cde901.png?height=64&width=64",
    "Snack Bars": "https://res.cloudinary.com/wishwell/image/upload/v1754490168/Snack_Bars_fgh234.png?height=64&width=64",
    "Party Pack": "https://res.cloudinary.com/wishwell/image/upload/v1754490170/Party_Pack_lmn890.png?height=64&width=64",

    // Chocolates subsubcategories,
    "Dark": "https://res.cloudinary.com/wishwell/image/upload/v1754490171/Dark_abc123.png?height=64&width=64",
    "Shared Packs": "https://res.cloudinary.com/wishwell/image/upload/v1754490175/Shared_Packs_mno345.png?height=64&width=64",
    "Imported": "https://res.cloudinary.com/wishwell/image/upload/v1754490176/Imported_pqr678.png?height=64&width=64",
    "Candies": "https://res.cloudinary.com/wishwell/image/upload/v1754490178/Candies_vwx234.png?height=64&width=64",
    "Gums & Mint": "https://res.cloudinary.com/wishwell/image/upload/v1754490179/Gums_Mint_yza567.png?height=64&width=64",

    // Noodles, Pasta, Vermicelli subsubcategories
    "Instant Noodles": "https://res.cloudinary.com/wishwell/image/upload/v1754490180/Instant_Noodles_bcd890.png?height=64&width=64",
    "Cup Noodles": "https://res.cloudinary.com/wishwell/image/upload/v1754490181/Cup_Noodles_efg123.png?height=64&width=64",
    "Korean": "https://res.cloudinary.com/wishwell/image/upload/v1754490182/Korean_hij456.png?height=64&width=64",
    "Hakka": "https://res.cloudinary.com/wishwell/image/upload/v1754490183/Hakka_klm789.png?height=64&width=64",
    "Pasta": "https://res.cloudinary.com/wishwell/image/upload/v1754490184/Pasta_nop012.png?height=64&width=64",
    "Vermicelli": "https://res.cloudinary.com/wishwell/image/upload/v1754490185/Vermicelli_qrs345.png?height=64&width=64",
    "Soups": "https://res.cloudinary.com/wishwell/image/upload/v1754490186/Soups_tuv678.png?height=64&width=64",
    "Ready to Eat": "https://res.cloudinary.com/wishwell/image/upload/v1754490187/Ready_to_Eat_wxy901.png?height=64&width=64",

    // Frozen Food subsubcategories
    "Veg Frozen": "https://res.cloudinary.com/wishwell/image/upload/v1754490188/Veg_Frozen_zab234.png?height=64&width=64",
    "Non Veg": "https://res.cloudinary.com/wishwell/image/upload/v1754490189/Non_Veg_cde567.png?height=64&width=64",
    "Kebabs": "https://res.cloudinary.com/wishwell/image/upload/v1754490191/Kebabs_ijk123.png?height=64&width=64",
    "Roti": "https://res.cloudinary.com/wishwell/image/upload/v1754490192/Roti_lmn456.png?height=64&width=64",
    "Paranthas & Sheets": "https://res.cloudinary.com/wishwell/image/upload/v1754490193/Paranthas_Sheets_opq789.png?height=64&width=64",
    "Frozen Veg": "https://res.cloudinary.com/wishwell/image/upload/v1754490194/Frozen_Veg_rst012.png?height=64&width=64",
    "Momos & Bao": "https://res.cloudinary.com/wishwell/image/upload/v1754490195/Momos_Bao_tuv345.png?height=64&width=64",

    // Sweets subsubcategories
    "Kaju Katli & Barfi": "https://res.cloudinary.com/wishwell/image/upload/v1754490196/Kaju_Katli_Barfi_wxy678.png?height=64&width=64",
    "Rasgulla": "https://res.cloudinary.com/wishwell/image/upload/v1754490197/Rasgulla_zab901.png?height=64&width=64",
    "Gulab Jamun": "https://res.cloudinary.com/wishwell/image/upload/v1754490198/Gulab_Jamun_cde234.png?height=64&width=64",
    "Mysore Pak": "https://res.cloudinary.com/wishwell/image/upload/v1754490199/Mysore_Pak_fgh567.png?height=64&width=64",
    "Ladoos": "https://res.cloudinary.com/wishwell/image/upload/v1754490200/Ladoos_ijk890.png?height=64&width=64",
    "Pedhas": "https://res.cloudinary.com/wishwell/image/upload/v1754490201/Pedhas_lmn123.png?height=64&width=64",
    "Chikki": "https://res.cloudinary.com/wishwell/image/upload/v1754490202/Chikki_opq456.png?height=64&width=64",
    "Rasmalai": "https://res.cloudinary.com/wishwell/image/upload/v1754490203/Rasmalai_rst789.png?height=64&width=64",
    "Cakes": "https://res.cloudinary.com/wishwell/image/upload/v1754490204/Cakes_tuv012.png?height=64&width=64",

    // Paan Corner subsubcategories
    "Regular Cigarettes": "https://res.cloudinary.com/wishwell/image/upload/v1754490205/Regular_Cigarettes_wxy345.png?height=64&width=64",
    "Flavour Cigarettes": "https://res.cloudinary.com/wishwell/image/upload/v1754490206/Flavour_Cigarettes_zab678.png?height=64&width=64",
    "Smoking Accessories": "https://res.cloudinary.com/wishwell/image/upload/v1754490207/Smoking_Accessories_cde901.png?height=64&width=64",
    "Nicotine Alternatives": "https://res.cloudinary.com/wishwell/image/upload/v1754490208/Nicotine_Alternatives_fgh234.png?height=64&width=64",
    "Paan & Mouth Fresheners": "https://res.cloudinary.com/wishwell/image/upload/v1754490209/Paan_Mouth_Fresheners_ijk567.png?height=64&width=64",

    "Bestseller": {
        default: "/categories/subcategory/bestsellers.png",
        contexts: {
            "Chips and Namkeens": "https://res.cloudinary.com/wishwell/image/upload/v1754490158/Bestseller_cde234.png?height=64&width=64",
            "Chocolates": "https://res.cloudinary.com/wishwell/image/upload/v1754490158/Bestseller_cde234.png?height=64&width=64",
            "Paan Corner": "https://res.cloudinary.com/wishwell/image/upload/v1754490210/Bestseller_Paan_lmn890.png?height=64&width=64",
        }
    },
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
