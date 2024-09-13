import { Router } from "express";
import prisma from '../config/prismaClient.js';

const router = Router()

router.get('/category', async (req,res) => {
    const categoryAll = await prisma.category.findMany({
        include: {
            products: true,
        }
    })
    res.json(categoryAll);
})

export default router;