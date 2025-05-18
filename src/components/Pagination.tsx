// src/components/Pagination.tsx

import { useState } from "react";
import styles from "./Pagination.module.css";

interface PaginationProps {
  totalPages: number;
  onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({ totalPages, onPageChange }) => {
  const [currentPage, setCurrentPage] = useState(1);

  const goToPage = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
      onPageChange(page);
    }
  };

  return (
    <div className={styles.paginationContainer}>
      <button
        className={styles.pageButton}
        onClick={() => goToPage(currentPage - 1)}
        disabled={currentPage === 1}
      >
        Anterior
      </button>
      <span className={styles.currentPage}>{currentPage}</span>
      <button
        className={styles.pageButton}
        onClick={() => goToPage(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        Próximo
      </button>
    </div>
  );
};

export default Pagination;
