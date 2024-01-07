import * as express from "express";
import CAuth from "../controllers/CAuth";

const RAuth = express.Router();

RAuth.post("/api/v1/auth/register", CAuth.register);
RAuth.post("/api/v1/auth/login", CAuth.login);
RAuth.get("/api/v1/auth/users", CAuth.find);
RAuth.get("/api/v1/auth/users/:id", CAuth.findOne);

export default RAuth;