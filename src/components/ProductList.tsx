// src/components/ProductList.tsx

import React, { useEffect, useState } from "react";
import ProductCard from "./ProductCard";
import Pagination from "./Pagination";
import { useProduct } from "../hooks/useProduct";
import { Product } from "../types/product";
import styles from "./ProductList.module.css";

type ProductListProps = {
  products?: Product[];
};

const ProductList: React.FC<ProductListProps> = ({ products: productsProp }) => {
  const { products: contextProducts, loading, error } = useProduct();
  const products = productsProp ?? contextProducts;

  const [currentPage, setCurrentPage] = useState(1);
  const [paginatedProducts, setPaginatedProducts] = useState<Product[]>([]);

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
      {products.length > 20 && (
        <div className={styles.paginationWrapper}>
          <Pagination totalPages={Math.ceil(products.length / 20)} onPageChange={setCurrentPage} />
        </div>
      )}
    </div>
  );
};

export default ProductList;
