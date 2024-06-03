import { Router } from "express";
import { User } from "../models/User.js";
import validateUser from "../middlewares/validateUser.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import crypto from "crypto";
import nodemailer from "nodemailer";
import { config } from "dotenv";
import validatePassword from "../middlewares/validatePassword.js";
import validateUserEmail from "../middlewares/validateUserEmail.js";

config();

export const authRouter = Router();

const { hash } = bcrypt;

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL,
    pass: process.env.EMAIL_PASSWORD,
  },
});

authRouter
  .get("/users", async (req, res, next) => {
    try {
      const users = await User.find();
      res.json(users);
    } catch (error) {
      next({ status: 500, message: error.message });
    }
  })
  .post(
    "/register",
    validateUser,
    validateUserEmail,
    async (req, res, next) => {
      try {
        const newUser = await User.register(req.body);

        res.status(201).json(newUser);
      } catch (error) {
        next({ status: 401, message: error.message });
      }
    }
  )

  .post("/login", validateUser, async (req, res, next) => {
    try {
      const user = await User.login(req.body);
      if (!user) {
        next({ status: 404, message: "Bad Credential!" });
        return;
      }

      /// sign token
      const token = jwt.sign({ userID: user._id }, process.env.SECRET, {
        expiresIn: "78h",
      });

      /// send user an token to frontend
      res.send({ user, token });
    } catch (error) {
      next({ status: 500, message: error.message });
    }
  })
  .post("/forgot-password", async (req, res, next) => {
    try {
      const { email } = req.body;
      const user = await User.findOne({ email });

      if (!user) {
        next({ status: 404, message: "User not found!" });
        return;
      }

      const token = crypto.randomBytes(20).toString("hex");
      user.resetPasswordToken = token;
      user.resetPasswordExpires = Date.now() + 3600000; // 1 hour

      await user.save();

      const mailOptions = {
        to: user.email,
        from: process.env.EMAIL,
        subject: "Password Reset",
        text: `You are receiving this because you (or someone else) have requested the reset of the password for your account.\n\n
               Please click on the following link, or paste this into your browser to complete the process:\n\n
               ${process.env.FRONTEND_URL}resetPassword/${token}\n\n
               If you did not request this, please ignore this email and your password will remain unchanged.\n`,
      };

      transporter.sendMail(mailOptions, (error) => {
        if (error) {
          next({ status: 500, message: error.message });
          return;
        }
        res.status(200).json({ message: "Email sent!" });
      });
    } catch (error) {
      next({ status: 500, message: error.message });
    }
  })
  .post("/reset-password/:token", validatePassword, async (req, res, next) => {
    try {
      const { token } = req.params;
      const { newPassword, confirmPassword } = req.body;

      if (newPassword !== confirmPassword) {
        next({ status: 400, message: "Passwords do not match." });
        return;
      }

      const user = await User.findOne({
        resetPasswordToken: token,
        resetPasswordExpires: { $gt: Date.now() },
      });

      if (!user) {
        next({
          status: 400,
          message: "Password reset token is invalid or has expired.",
        });
        return;
      }

      const hashed = await hash(newPassword, 10);

      user.password = hashed;
      user.resetPasswordToken = undefined;
      user.resetPasswordExpires = undefined;

      await user.save();

      res.status(200).json({ message: "Password has been reset!", user });
    } catch (error) {
      next({ status: 500, message: error.message });
    }
  })
  .delete("/users", async (req, res, next) => {
    try {
      await User.deleteMany();
      res.json({ message: "All user deleted!" });
    } catch (error) {
      next({ status: 500, message: error.message });
    }
  });
