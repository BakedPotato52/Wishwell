"use client"
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Product } from '@/lib/types';
import { useProducts } from '@/hooks/use-api-data';

interface ProductContextType {
    products: Product[];
    setProducts: React.Dispatch<React.SetStateAction<Product[]>>;
}

const ProductContext = createContext<ProductContextType | undefined>(undefined);

export const ProductProvider = ({ children }: { children: ReactNode }) => {
    const [products, setProducts] = useState<Product[]>([]);
    const { products: fetchedProducts } = useProducts();

    useEffect(() => {
        if (fetchedProducts) {
            setProducts(fetchedProducts);
        }
    }, [fetchedProducts]);

    return React.createElement(
        ProductContext.Provider,
        { value: { products, setProducts } },
        children
    );
};

export const useProductContext = () => {
    const context = useContext(ProductContext);
    if (!context) {
        throw new Error('useProductContext must be used within a ProductProvider');
    }
    return context;
};