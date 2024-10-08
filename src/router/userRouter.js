import express from "express";
import userController from "../controllers/systemController/userController";
let router = express.Router();

router.get("/auth/userinfo", userController.GetUserInfo);



router.get("/user", userController.GetAll);
// router.get("/user", userController.GetOne);
router.delete("/user/:id", userController.Remove);
router.post("/user", userController.Create);
router.put("/user/:id", userController.Update);
export const User = router;