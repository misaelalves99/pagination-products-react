// src/pages/ProductsPage.tsx

import React, { useEffect } from "react";
import { useProduct } from "../hooks/useProduct";
import ProductList from "../components/ProductList";
import styles from "./ProductsPage.module.css";

const ProductsPage: React.FC = () => {
  const { products, loading, error, fetchProducts } = useProduct();

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Lista de Produtos</h1>

      {loading && <p className={styles.loadingMessage}>Carregando...</p>}
      {error && <p className={styles.errorMessage}>{error}</p>}

      {!loading && !error && products.length === 0 && (
        <p className={styles.noProductsText}>Nenhum produto encontrado.</p>
      )}

      {!loading && !error && products.length > 0 && <ProductList />}
    </div>
  );
};

export default ProductsPage;
