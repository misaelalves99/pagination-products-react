// src/pages/HomePage.tsx

import React from "react";
import { useNavigate } from "react-router-dom";
import ProductList from "../components/ProductList";
import { useProduct } from "../context/ProductContext";
import styles from "./HomePage.module.css";

const HomePage: React.FC = () => {
  const navigate = useNavigate();
  const { products } = useProduct();

  const featuredProducts = products.slice(0, 6);

  const handleNavigate = () => {
    navigate("/produtos");
  };

  return (
    <main className={styles.container}>
      <section className={styles.hero}>
        <h1 className={styles.title}>Bem-vindo ao Nosso E-commerce</h1>
        <p className={styles.description}>Explore nossos produtos incríveis!</p>
        <button className={styles.heroButton} onClick={handleNavigate}>
          Ver Produtos
        </button>
      </section>

      <section className={styles.featuredSection}>
        <h2 className={styles.sectionTitle}>Produtos em Destaque</h2>
        <div className={styles.productGrid}>
          {featuredProducts.map((product) => (
            <ProductList key={product.id} />
          ))}
        </div>
      </section>
    </main>
  );
};

export default HomePage;
