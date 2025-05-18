// src/components/ProductList.tsx

import React, { useEffect, useState } from "react";
import ProductCard from "./ProductCard";
import Pagination from "./Pagination";
import { useProduct } from "../context/ProductContext";
import styles from "./ProductList.module.css";

const ProductList: React.FC = () => {
  const { products, loading, error } = useProduct();
  const [currentPage, setCurrentPage] = useState(1);
  const [paginatedProducts, setPaginatedProducts] = useState(products);

  useEffect(() => {
    const startIndex = (currentPage - 1) * 20;
    const endIndex = startIndex + 20;
    setPaginatedProducts(products.slice(startIndex, endIndex));
  }, [currentPage, products]);

  if (loading) return <div className={styles.loading}>Carregando produtos...</div>;
  if (error) return <div className={styles.error}>{error}</div>;
  if (!products.length) return <p className={styles.noProductsMessage}>Nenhum produto encontrado.</p>;

  return (
    <div>
      <div className={styles.productGrid}>
        {paginatedProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
      <div className={styles.paginationWrapper}>
        <Pagination
          totalPages={Math.ceil(products.length / 20)}
          onPageChange={setCurrentPage}
        />
      </div>
    </div>
  );
};

export default ProductList;
