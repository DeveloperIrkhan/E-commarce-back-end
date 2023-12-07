import express from "express";
import {
  registerController,
  LoginUserController,
  testController,
  forgotPasswordController,
  changePasswordController,
} from "../Controllers/authController.js";
import { IsAdmin, requireSignInAsync } from "../middleware/authMiddleware.js";

//router object
const router = express.Router();
//register || POST
router.post("/register", registerController);
//login
router.post("/Login", LoginUserController);
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
//protected route for chaning password
router.post(
  "/change-password",
  requireSignInAsync,
  changePasswordController,
  (req, resp) => {
    resp.status(200).send({ ok: true });
  }
);
//reset password
router.post("/forgot-password", forgotPasswordController);
export default router;
