import express from "express";
import uploadMulter from "../middelware/uploadMulter";

import { checkTokenJWT } from "../middelware/jwt"


import productController from "../controllers/systemController/productController";

let router = express.Router();
router.get('/export/:name', productController.downloadFile);
router.get('/downloadAll/:name', productController.downloadFileAll);


export const FileRouter = router