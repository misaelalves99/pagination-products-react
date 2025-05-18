// src/services/productService.ts

import { Product } from "../types/product";

// Função para obter os produtos da API (você pode substituir a URL pela sua API real)
export const getProductsFromApi = async (): Promise<Product[]> => {
  try {
    const response = await fetch("/api/products"); // Substitua com sua URL de API real
    if (!response.ok) {
      throw new Error("Erro ao buscar produtos");
    }
    return await response.json();
  } catch (error) {
    console.error("Erro ao buscar produtos:", error);
    // Caso ocorra erro, retornar produtos mockados
    return [
      {
        id: 1,
        name: "Smartphone XYZ",
        price: 1499.99,
        description: "Smartphone com tela OLED, 6GB de RAM e 128GB de armazenamento.",
        imageUrl: "/images/smartphone.jpg",
        category: "electronics",
      },
      {
        id: 2,
        name: "Camiseta Estilosa",
        price: 59.9,
        description: "Camiseta 100% algodão, disponível em várias cores.",
        imageUrl: "/images/tshirt.jpg",
        category: "clothing",
      },
    ];
  }
};

// Função para obter um produto específico
export const getProductByIdFromApi = async (id: number): Promise<Product | null> => {
  try {
    const response = await fetch(`/api/products/${id}`);
    if (!response.ok) {
      throw new Error("Erro ao buscar produto");
    }
    return await response.json();
  } catch (error) {
    console.error("Erro ao buscar produto:", error);
    return null;
  }
};

// Função para criar um novo produto
export const createProductInApi = async (data: Product): Promise<Product> => {
  try {
    const response = await fetch("/api/products", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    if (!response.ok) {
      throw new Error("Erro ao criar produto");
    }
    return await response.json();
  } catch (error) {
    console.error("Erro ao criar produto:", error);
    throw new Error("Erro ao criar produto");
  }
};
