import response from "../../../services/response";
import User from "../../../models/User";
import crypt from "bcryptjs";
import jwt from "jsonwebtoken";
import utils from "../../../config/utils";
import { validationResult } from "express-validator";

// /v1/auth/register
async function registerUser(req, res) {
  try {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return response.code422(res, {
        message:
          "Check email address and password (password can't be less than 8 length)."
      });
    }

    const { email, password } = req.body;

    const newUser = await User.findOne({ email });
    if (newUser) {
      response.code400(res, { message: "This user already exist." });
    }

    const hashedPassword = await crypt.hash(password, 12);

    const user = new User({
      email,
      password: hashedPassword,
      created_at: new Date()
    });

    await user.save();

    response.code201(res, { message: "User created." });
  } catch (err) {
    response.code500(res, err);
  }
}

// /v1/auth/login
async function authUser(req, res) {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return response.code400(res, {
        message: "Password can't be less than 8 length."
      });
    }

    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      response.code400(res, { message: "User not found or wrong password." });
    }

    const isMatch = await crypt.compare(password, user.password);
    if (!isMatch) {
      return response.code400(res, {
        message: "User not found or wrong password."
      });
    }

    const token = jwt.sign(
      {
        userId: user.id,
        userEmail: user.email
      },
      utils.getEnvOrPanic("APP_JWT_KEY"),
      { expiresIn: "1h" }
    );

    response.code200(res, { token, userId: user.id });
  } catch (err) {
    response.code500(res, err);
  }
}

export { registerUser, authUser };
