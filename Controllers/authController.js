import userModel from "../Models/UserModel.js";
import { comparePassword, hashingPassword } from "../helpers/authhelper.js";
import JWT from "jsonwebtoken";


export const testController = (req,resp)=>{
  console.log(resp);
  resp.send("hi, i'm protect route")
}

export const LoginUserController = async (req, resp) => {
  try {
    const { Username, Password } = req.body;
    if (!Username || !Password) {
      return resp.status(404).send({ message: "invalid username or password" });
    }
    //before getting password, checking user is exsist or not
    const user = await userModel.findOne({ email: Username });
    if (!user) {
      return resp
        .status(404)
        .send({ success: false, message: "user is not found" });
    }
    // before matching we need user hashed password
    // password matching

    const passwordMatched = await comparePassword(Password, user.password);
    if (!passwordMatched) {
      return resp.status(200).send({
        success: false,
        message: "password doesn't matched",
      });
    }

    const token = JWT.sign({ _id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });
    resp.status(200).send({
      success: true,
      message: "User Login successfully!",
      user: {
        username: user.email,
        name: `${user.firstName}  ${user.lastName}`,
        phone: user.phoneNumber,
        Address: user.address,
      },
      token,
    });
  } catch (error) {
    console.log(error);
    resp.status(500).send({
      success: false,
      message: "Error while login",
      error,
    });
  }
};
export const registerController = async (req, resp) => {
  try {
    const {
      firstName,
      lastName,
      email,
      password,
      phoneNumber,
      address,
      userRole,
    } = req.body;
    //validation
    if (!firstName) {
      return resp.send({ message: "firstName is required." });
    }
    if (!email) {
      return resp.send({ message: "email is required." });
    }
    if (!password) {
      return resp.send({ message: "password is required." });
    }
    if (!phoneNumber) {
      return resp.send({ message: "phoneNumber is required." });
    }
    if (!address) {
      return resp.send({ message: "address is required." });
    }
    //validation for existing user
    const existingUser = await userModel.findOne({ email: email });
    // existing user
    if (existingUser) {
      return resp
        .status(200)
        .send({ success: false, message: "user already exist, please login" });
    }
    //password hashing
    const hashPassword = await hashingPassword(password);

    //register new user
    const user = await new userModel({
      firstName,
      lastName,
      email,
      password: hashPassword,
      phoneNumber,
      address,
      userRole,
    }).save();
    resp.status(200).send({
      success: true,
      message: "New user register successfully",
      user,
    });
  } catch (error) {
    console.log(error);
    resp.status(500).send({
      success: false,
      message: "Error white registering user!",
      error,
    });
  }
};
