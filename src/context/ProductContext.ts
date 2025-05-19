// src/context/ProductContext.ts

import { createContext } from "react";
import type { Dispatch, SetStateAction } from "react";
import { Product } from "../types/product";

export type ProductContextType = {
  products: Product[];
  loading: boolean;
  error: string;
  setProducts: Dispatch<SetStateAction<Product[]>>;
  fetchProducts: () => void;
};

export const ProductContext = createContext<ProductContextType | undefined>(undefined);
