import { Router } from "express";
import { User } from "../models/User.js";
import validateUser from "../middlewares/validateUser.js";
import jwt from "jsonwebtoken";

export const authRouter = Router();

authRouter
  .get("/users", async (req, res, next) => {
    try {
      const users = await User.find();
      res.json(users);
    } catch (error) {
      next({ status: 500, message: error.message });
    }
  })
  .post("/register", validateUser, async (req, res, next) => {
    try {
      const newUser = await User.register(req.body);

      res.status(201).json(newUser);
    } catch (error) {
      next({ status: 401, message: error.message });
    }
  })

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
  .delete("/users", async (req, res, next) => {
    try {
      await User.deleteMany();
      res.json({ message: "All user deleted!" });
    } catch (error) {
      next({ status: 500, message: error.message });
    }
  });
