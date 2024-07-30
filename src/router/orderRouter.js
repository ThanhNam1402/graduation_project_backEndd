import express from "express";
import ordercountController from "../controllers/systemController/orderController";
let router = express.Router();

router.get("/order", ordercountController.GetAll);
router.post("/order", ordercountController.Create);
router.delete("/order/:id", ordercountController.Remove);

export const OrderRouter = router;