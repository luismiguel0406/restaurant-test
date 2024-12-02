import { Router } from "express";
import { getProducts } from "../../controllers/products/product.controller.js";

const router = Router();

router.get('/api/products', getProducts);
router.get('/api/product/:id',()=>{});

export default router;