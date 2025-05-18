// src/context/ProductContext.tsx

import React, { createContext, useContext, useState, ReactNode, Dispatch, SetStateAction, useEffect } from "react";
import { Product } from "../types/product";
import { getProducts } from "../lib/api/products"; // ✅ Função de API para buscar produtos

type ProductContextType = {
  products: Product[];
  loading: boolean;
  error: string;
  setProducts: Dispatch<SetStateAction<Product[]>>;
  fetchProducts: () => void;
};

export const ProductContext = createContext<ProductContextType | undefined>(undefined);

type ProductProviderProps = {
  children: ReactNode;
};

export const ProductProvider = ({ children }: ProductProviderProps) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  const fetchProducts = async () => {
    setLoading(true);
    setError(""); // Reseta o erro ao fazer uma nova requisição

    try {
      const fetched = await getProducts(); // Chama a API para buscar os produtos
      setProducts(fetched); // Atualiza o estado com os produtos
    } catch (err) {
      setError("Erro ao carregar os produtos.");
      console.error("Erro ao buscar produtos:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts(); // Chama a função para buscar os produtos assim que o componente for montado
  }, []);

  return (
    <ProductContext.Provider value={{ products, loading, error, setProducts, fetchProducts }}>
      {children}
    </ProductContext.Provider>
  );
};

export const useProduct = () => {
  const context = useContext(ProductContext);
  if (!context) {
    throw new Error("useProduct deve ser usado dentro de um ProductProvider");
  }
  return context;
};
