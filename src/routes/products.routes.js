import { Router } from "express";
import prisma from '../config/prismaClient.js';
import authenticateToken from '../middlewares/authenticateToken.js';

const router = Router()


router.get('/products', async (req,res) => {
    const productAll = await prisma.product.findMany({
        include: {
            category: true,
        }
    })
    res.json(productAll);
})


router.get('/products/:id', async (req,res) => {
    const productoId = await prisma.product.findFirst({
        where: {
            id: parseInt(req.params.id) 
        },
        include: {
            category: true,
        }
    })
    if (!productoId) return res.status(404).json({ error: "no se encontro na pri, njd...."})
        res.json(productoId)
})


router.post('/products', async (req,res) => {
    const newProduct = await prisma.product.create({
        data: req.body,
    })
    res.json(newProduct)
})


router.use(authenticateToken);

router.put('/products/:id', async (req,res) => {
    const productoUp = await prisma.product.update({
        where: {
            id: parseInt(req.params.id) 
        },
        data: req.body
    })
    if (!productoUp) return res.status(404).json({ error: "no se encontro na pri"})
    res.json(productoUp)
})

router.delete('/products/:id', async (req,res) => {
    const productoDelete = await prisma.product.delete({
        where: {
            id: parseInt(req.params.id) 
        }
    })
    if (!productoDelete) return res.status(404).json({ error: "no se encontro na pri"})
    res.json(productoDelete)
})

export default router