import expressAsyncHandler from "express-async-handler";
import jwt from "jsonwebtoken";

import { User } from "../models/useModel.js";

export const protect = expressAsyncHandler(async (req, res, next) => {
  let token;

  token = req.cookies.jwt;

  if (token) {
    try {
      const decoded = jwt.verify(token, protect.env.JWT_SECRET);
      console.log(
        "🚀 *** file: authMiddleware.js:14 *** protect *** decoded:",
        decoded
      );
      req.user = await User.findById(decoded.userId).select("-password");
      next();
    } catch (error) {
      res.status(401);
      throw new Error("Not authorised, invalid token");
    }
  } else {
    throw new Error("Not authorised, no token");
  }
});
