import express from "express";
import orderdetellController from "../controllers/systemController/orderdetailController";
let router = express.Router();

router.post("/orderdetail", orderdetellController.Create);
router.delete("/orderdetail/:id", orderdetellController.Remove);
export const OrderdetellRouter = router;