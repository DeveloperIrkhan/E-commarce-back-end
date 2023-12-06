import express from "express";
import {
  registerController,
  LoginUserController,
  testController,
  forgotPasswordController,
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
//protected route for user dashboard
router.get("/user-dashboard", requireSignInAsync, (req, resp) => {
  resp.status(200).send({ ok: true });
});
//protected route for admin dashboard
router.get("/admin-dashboard", requireSignInAsync, IsAdmin, (req, resp) => {
  resp.status(200).send({ ok: true });
});
//reset password
router.post("/forgot-password", forgotPasswordController);
