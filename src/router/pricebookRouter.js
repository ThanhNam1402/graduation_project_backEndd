import express from "express";
import pricebookController from "../controllers/systemController/pricebookController";
let router = express.Router();

router.get("/pricebook", pricebookController.getAll);
router.put("/pricebook/:id", pricebookController.Update);
export const PricebookRouter = router;
