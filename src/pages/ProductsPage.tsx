// src/pages/ProductsPage.tsx

import React, { useEffect } from "react";
import { useProduct } from "../context/ProductContext";
import ProductList from "../components/ProductList";
import styles from "./ProductsPage.module.css";

const ProductsPage: React.FC = () => {
  const { products, loading, error, fetchProducts } = useProduct();  // Usando diretamente do contexto

  useEffect(() => {
    fetchProducts();  // Carrega os produtos ao montar o componente
  }, [fetchProducts]);

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Lista de Produtos</h1>

      {loading && <p className={styles.loadingMessage}>Carregando...</p>}
      {error && <p className={styles.errorMessage}>{error}</p>}

      {!loading && !error && products.length === 0 && (
        <p className={styles.noProductsText}>Nenhum produto encontrado.</p>
      )}

      {!loading && !error && products.length > 0 && (
        <ProductList />
      )}
    </div>
  );
};

export default ProductsPage;
