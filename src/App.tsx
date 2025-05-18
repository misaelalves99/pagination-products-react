// src/App.tsx

import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { ProductProvider } from "./context/ProductContext";
import HomePage from "./pages/HomePage";
import ProductsPage from "./pages/ProductsPage";

const App: React.FC = () => {
  return (
    <Router>
      <ProductProvider>
        <div className="bg-gray-100 text-gray-900 flex flex-col min-h-screen">
          <Navbar />
          <main className="flex-grow container mx-auto p-6">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/products" element={<ProductsPage />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </ProductProvider>
    </Router>
  );
};

export default App;
