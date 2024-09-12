import { Router } from "express";
import prisma from '../config/prismaClient.js';
import authenticateToken from '../middlewares/authenticateToken.js';

const router = Router()

router.get('/categorys', async (req,res) => {
    const categoryAll = await prisma.category.findMany({
        include: {
            products: true,
        }
    })
    res.json(categoryAll);
})

router.use(authenticateToken);

export default router;