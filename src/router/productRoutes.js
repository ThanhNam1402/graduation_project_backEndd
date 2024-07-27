import express from "express";

import productController from "../controllers/systemController/productController";

let router = express.Router();


router.get('/products', productController.getAll);
export const ProductRouter = router