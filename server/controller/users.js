import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import User from "../models/user.js";

export const signin = async (req, res) => {
  const { email, password } = req.body;
  try {
    const existingUser = await User.findOne({ email });
    if (!existingUser) return res.status(404).json("User doesn't exist.");
    const isPasswordCorrect = await bcrypt.compare( password, existingUser.password);
    if (!isPasswordCorrect) return res.status(400).json("Invalid password.");
    const token = jwt.sign({ email: existingUser.email, id: existingUser._id }, "test", {expiresIn: "1h"});
    res.status(200).json({result: existingUser, token});
  } catch (error) {
    console.log(error);
  }
};
export const signup = async (req, res) => {
    const { email, password, confirmPassword, firstName, lastName } = req.body;
    try {
        const existingUser = await User.findOne({ email });
        if (existingUser) return res.status(404).json("User already exists.");
        if(password !== confirmPassword) return res.status(400).json("Password does not match.");
        const hashedPassword = await bcrypt.hash(password, 12);
        const result = await User.create({ email, password: hashedPassword , name: `${firstName} ${lastName}`});
        const token = jwt.sign({ email: result.email, id: result._id }, "test", {expiresIn: "1h"});
        res.status(200).json({result, token});
        console.log(req);
    } catch (error) {
        console.log(error);
    }
};
