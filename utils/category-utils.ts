import { categories } from "@/lib/categoryData"

// Helper functions for slug conversion
export const createSlug = (text: string): string => {
    return text
        .toLowerCase()
        .replace(/&/g, "and") // Replace & with "and"
        .replace(/,/g, "") // Remove commas
        .replace(/[^a-z0-9]+/g, "-") // Replace non-alphanumeric with hyphens
        .replace(/^-+|-+$/g, "") // Remove leading/trailing hyphens
}

// Enhanced function that considers navigation context
export const getSubsubcategoryFromSlug = (
    slug: string,
    categoryContext?: string,
    subcategoryContext?: string
): { subsubcategory: string; subcategory: string; category: string } | null => {
    const matches: Array<{ subsubcategory: string; subcategory: string; category: string }> = []

    // Collect all possible matches
    for (const category of categories) {
        if (category.subsubcategories) {
            for (const [subcategory, subsubcategories] of Object.entries(category.subsubcategories)) {
                for (const subsubcategory of subsubcategories) {
                    const subsubcategorySlug = createSlug(subsubcategory)
                    if (subsubcategorySlug === slug) {
                        matches.push({
                            subsubcategory,
                            subcategory,
                            category: category.name,
                        })
                    }
                }
            }
        }
    }

    // If no matches found, return null
    if (matches.length === 0) return null

    // If only one match, return it
    if (matches.length === 1) return matches[0]

    // Multiple matches found - use context to resolve
    if (categoryContext && subcategoryContext) {
        // Try to find exact match with both contexts
        const exactMatch = matches.find(
            match => match.category === categoryContext && match.subcategory === subcategoryContext
        )
        if (exactMatch) return exactMatch
    }

    if (categoryContext) {
        // Try to find match with category context only
        const categoryMatch = matches.find(match => match.category === categoryContext)
        if (categoryMatch) return categoryMatch
    }

    if (subcategoryContext) {
        // Try to find match with subcategory context only
        const subcategoryMatch = matches.find(match => match.subcategory === subcategoryContext)
        if (subcategoryMatch) return subcategoryMatch
    }

    // If no context helps, return the first match (fallback)
    console.warn(`Multiple matches found for slug "${slug}", returning first match:`, matches[0])
    return matches[0]
}

// Function to create context-aware URLs
export const createContextualSlug = (
    category: string,
    subcategory: string,
    subsubcategory: string
): string => {
    const categorySlug = createSlug(category)
    const subcategorySlug = createSlug(subcategory)
    const subsubcategorySlug = createSlug(subsubcategory)

    return `${categorySlug}/${subcategorySlug}/${subsubcategorySlug}`
}

// Function to parse contextual URLs
export const parseContextualSlug = (
    fullSlug: string
): { category: string; subcategory: string; subsubcategory: string } | null => {
    const parts = fullSlug.split('/')

    if (parts.length !== 3) return null

    const [categorySlug, subcategorySlug, subsubcategorySlug] = parts

    // Find matching category, subcategory, and subsubcategory
    for (const category of categories) {
        if (createSlug(category.name) === categorySlug && category.subsubcategories) {
            for (const [subcategory, subsubcategories] of Object.entries(category.subsubcategories)) {
                if (createSlug(subcategory) === subcategorySlug) {
                    for (const subsubcategory of subsubcategories) {
                        if (createSlug(subsubcategory) === subsubcategorySlug) {
                            return {
                                category: category.name,
                                subcategory,
                                subsubcategory,
                            }
                        }
                    }
                }
            }
        }
    }

    return null
}
