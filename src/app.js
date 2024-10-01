import express from 'express';
import authRoutes from './routes/authRoutes.js';
import dotenv from 'dotenv';
import productsRoutes from './routes/products.routes.js'
import categorysRoutes from './routes/categorys.routes.js'
import { corsMiddleware } from './middlewares/cors.js';

dotenv.config();

const app = express();

app.use(corsMiddleware())
app.use(express.json());

// Rutas de autenticación
app.use('/api/auth', authRoutes);

// Rutas products
app.use('/uploads', express.static('uploads'));
app.use("/api", categorysRoutes);
app.use("/api", productsRoutes);


export default app;