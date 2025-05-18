// server.ts

import express from 'express';
import { PrismaClient } from '@prisma/client';
import bodyParser from 'body-parser';

const app = express();
const prisma = new PrismaClient();

app.use(bodyParser.json());

// Mock de produtos simulados para fallback
const fallbackProducts = [
  {
    id: 1,
    name: "Smartphone XYZ",
    price: 1499.99,
    description: "Smartphone com tela OLED, 6GB de RAM e 128GB de armazenamento.",
    imageUrl: "https://cdn.pixabay.com/photo/2020/02/24/06/00/clothing-4875289_1280.jpg",
    category: "electronics",
  },
  {
    id: 2,
    name: "Camiseta Estilosa",
    price: 59.9,
    description: "Camiseta 100% algodão, disponível em várias cores.",
    imageUrl: "https://cdn.pixabay.com/photo/2020/02/24/06/00/clothing-4875289_1280.jpg",
    category: "clothing",
  },
  // Adicione mais produtos aqui
];

// 01: GET - Lista todos os produtos
app.get('/api/products', async (req, res) => {
  try {
    const products = await prisma.product.findMany();
    res.json(products);
  } catch (error) {
    console.error("Erro ao buscar produtos no banco:", error);
    res.json(fallbackProducts); // Fallback caso ocorra erro
  }
});

// 02: GET - Obtém um produto específico pelo ID
app.get('/api/products/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const product = await prisma.product.findUnique({
      where: { id: Number(id) }
    });
    if (!product) {
      res.status(404).json({ message: "Produto não encontrado" });
    } else {
      res.json(product);
    }
  } catch (error) {
    console.error("Erro ao buscar produto:", error);
    res.status(500).json({ message: "Erro ao buscar produto", error: error.message });
  }
});

// 03: POST - Cria um novo produto
app.post('/api/products', async (req, res) => {
  const { name, price, description, imageUrl, category } = req.body;
  try {
    const newProduct = await prisma.product.create({
      data: { name, price, description, imageUrl, category },
    });
    res.status(201).json(newProduct);
  } catch (error) {
    console.error("Erro ao criar produto:", error);
    res.status(500).json({ message: "Erro ao criar produto", error: error.message });
  }
});

// 04: PUT - Atualiza um produto
app.put('/api/products/:id', async (req, res) => {
  const { id } = req.params;
  const { name, price, description, imageUrl, category } = req.body;
  try {
    const updatedProduct = await prisma.product.update({
      where: { id: Number(id) },
      data: { name, price, description, imageUrl, category },
    });
    res.json(updatedProduct);
  } catch (error) {
    console.error("Erro ao atualizar produto:", error);
    res.status(500).json({ message: "Erro ao atualizar produto", error: error.message });
  }
});

// 05: DELETE - Exclui um produto
app.delete('/api/products/:id', async (req, res) => {
  const { id } = req.params;
  try {
    await prisma.product.delete({ where: { id: Number(id) } });
    res.json({ message: "Produto excluído com sucesso" });
  } catch (error) {
    console.error("Erro ao excluir produto:", error);
    res.status(500).json({ message: "Erro ao excluir produto", error: error.message });
  }
});

// Inicia o servidor
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
