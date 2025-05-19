// src/context/ProductProvider.tsx

"use client";

import { useState, useEffect, type ReactNode } from "react";
import { ProductContext } from "./ProductContext";
import { Product } from "../types/product";
import { getProducts } from "../lib/api/products";

type ProductProviderProps = {
  children: ReactNode;
};

export const ProductProvider = ({ children }: ProductProviderProps) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchProducts = async () => {
    setLoading(true);
    setError("");
    try {
      const fetched = await getProducts();
      setProducts(fetched);
    } catch (err) {
      console.error("Erro ao buscar produtos:", err);
      setError("Erro ao carregar os produtos.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <ProductContext.Provider value={{ products, loading, error, setProducts, fetchProducts }}>
      {children}
    </ProductContext.Provider>
  );
};
