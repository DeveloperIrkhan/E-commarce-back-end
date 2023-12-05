import express from "express";
import {
  registerController,
  LoginUserController,
  testController,
} from "../Controllers/authController.js";
import { IsAdmin, requireSignInAsync } from "../middleware/authMiddleware.js";

//router object
const router = express.Router();
//register || POST
router.post("/register", registerController);
//login
router.post("/Login", LoginUserController);
export default router;
//for testing token getting and Admin checking.
router.get("/test", requireSignInAsync, IsAdmin, testController);
//protected route for dashboard
router.get("/dashboard", requireSignInAsync,(req,resp)=>{
  resp.status(200).send({ok:true});
})
