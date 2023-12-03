import JWT from "jsonwebtoken";
import UserModel from "../Models/UserModel.js";

// protect routes through token base

export const requireSignInAsync = async (req, resp, next) => {
  try {
    const decode = JWT.verify(req.headers.token, process.env.JWT_SECRET);
    req.user = decode;
    next();
  } catch (error) {
    console.log(error);
    resp.status(404).send({ succes: false, message: "token invalid" });
  }
};

//admin access
export const IsAdmin = async (req, resp, next) => {
  try {
    const user = await UserModel.findById(req.user._id);
    if (user.userRole !== 1) {
      return resp.status(401).send({
        success: false,
        message: "un-autherized user",
      });
    } else {
      next();
    }
  } catch (error) {
    console.log(error);
    resp.status(401).send({
      success: false,
      message: "error in meddleware",
      error,
    });
  }
};
