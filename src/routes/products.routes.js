import { Router } from "express";
import prisma from "../config/prismaClient.js";
import authenticateToken from "../middlewares/authenticateToken.js";
import upload from "../middlewares/multer.js";

const router = Router();

router.get("/products", async (req, res) => {
  const { name, categoryId } = req.query;
  const filters = {};
  if (name) {
    filters.name = { contains: name, mode: "insensitive" };
  }
  if (categoryId) {
    filters.categoryId = parseInt(categoryId);
  }
  const productAll = await prisma.product.findMany({
    where: filters,
    include: { category: true },
  });
  res.json(productAll);
});

router.get("/products/:id", async (req, res) => {
  const productoId = await prisma.product.findFirst({
    where: {
      id: parseInt(req.params.id),
    },
    include: {
      category: true,
    },
  });
  if (!productoId)
    return res.status(404).json({ error: "no se encontró el producto" });
  res.json(productoId);
});

router.get('/products/:id/image', async (req, res) => {
  try {
    const { id } = req.params;

    const product = await prisma.product.findUnique({
      where: { id: parseInt(id, 10) },
    });

    if (!product || !product.image) {
      return res.status(404).json({ error: 'Producto o imagen no encontrada' });
    }

    // Configurar el tipo de contenido y enviar la imagen
    res.set('Content-Type', 'image/png'); // Cambia según el tipo MIME esperado
    res.send(product.image);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
});

router.use(authenticateToken);

// Ruta protegida para crear productos y subir imagen
router.post("/products", upload.single("image"), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "No se ha subido ninguna imagen" });
    }

    const { name, price, categoryId, stock, description, rating } = req.body;

    // Crear el producto en la base de datos
    const newProduct = await prisma.product.create({
      data: {
        name,
        price: parseInt(price),
        stock: parseInt(stock),
        categoryId: parseInt(categoryId),
        description,
        rating: parseFloat(rating),
        image: req.file.buffer
      },
    });

    res.json(newProduct);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
});

// Ruta protegida para actualizar productos con FormData y subir imagen
router.put("/products/:id", upload.single("image"), async (req, res) => {
  try {
    const { name, price, categoryId, stock, description, rating } = req.body;
    let updateData = {
      name,
      price: parseInt(price),
      stock: parseInt(stock),
      categoryId: parseInt(categoryId),
      description,
      rating: parseFloat(rating),
    };

    if (req.file) {
      // Obtener la nueva URL de la imagen
      updateData.imageUrl = `/uploads/${req.file.filename}`;
    }

    const updatedProduct = await prisma.product.update({
      where: {
        id: parseInt(req.params.id),
      },
      data: updateData,
    });

    if (!updatedProduct)
      return res.status(404).json({ error: "no se encontró el producto" });
    res.json(updatedProduct);
  } catch (error) {
    console.error("Error al actualizar el producto:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
});

router.delete("/products/:id", async (req, res) => {
  const productoDelete = await prisma.product.delete({
    where: {
      id: parseInt(req.params.id),
    },
  });
  if (!productoDelete)
    return res.status(404).json({ error: "no se encontró el producto" });
  res.json(productoDelete);
});

export default router;
