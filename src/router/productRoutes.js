import express from "express";
import uploadMulter from "../middelware/uploadMulter";


import productController from "../controllers/systemController/productController";

let router = express.Router();


router.get('/products', productController.getAll);
router.post('/products/new', uploadMulter.single('file'), productController.newProduct);
router.put('/products/:id', productController.updateProduct);
router.delete('/products/:id', productController.delProduct);

router.get('/products/stockcard/:id', productController.getStockCard);

export const ProductRouter = router