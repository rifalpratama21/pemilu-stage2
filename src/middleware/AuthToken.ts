import * as jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";

export default new (class AuthMiddle {
  Authentication(req: Request, res: Response, next: NextFunction): Response {
    try {
      const authorization = req.headers.authorization;

      if (!authorization || !authorization.startsWith("Bearer ")) {
        return res.status(401).json({ message: "Unauthorized" });
      }

      const token = authorization.split(" ")[1];

      try {
        const loginSession = jwt.verify(token, "keyboard cat");
        res.locals.loginSession = loginSession;
        next();
      } catch (error) {
        return res.status(401).json({ message: "Token verification failed" });
      }
    } catch (error) {
      return res.status(500).json(error.message);
    }
  }
})();
