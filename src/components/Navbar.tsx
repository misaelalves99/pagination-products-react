// src/components/Navbar.tsx

import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import styles from "./Navbar.module.css";

const Navbar: React.FC = () => {
  const location = useLocation();
  const [currentPath, setCurrentPath] = useState("");

  useEffect(() => {
    setCurrentPath(location.pathname);
  }, [location]);

  return (
    <nav className={styles.navbar}>
      <div className={styles.container}>
        <Link to="/" className={styles.logo}>
          Meu E-Commerce
        </Link>

        <div className={styles.navLinks}>
          <Link
            to="/"
            className={`${styles.link} ${currentPath === "/" ? styles.active : ""}`}
          >
            Home
          </Link>
          <Link
            to="/products"
            className={`${styles.link} ${currentPath === "/products" ? styles.active : ""}`}
          >
            Produtos
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
