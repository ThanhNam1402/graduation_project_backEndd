import express from "express";
import uploadMulter from "../middelware/uploadMulter";

import { checkTokenJWT } from "../middelware/jwt"


import productController from "../controllers/systemController/productController";

let router = express.Router();


router.get('/products', checkTokenJWT, productController.getAll);
router.get('/products/:id', productController.getOne);
router.post('/products/new', uploadMulter.single('file'), productController.newProduct);
router.put('/products/:id', uploadMulter.single('file'), productController.updateProduct);
router.delete('/products/:id', productController.delProduct);

router.get('/products/stockcard/:id', productController.getStockCard);

router.get('/categories', productController.getAllCate);


export const ProductRouter = router