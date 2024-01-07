import * as express from "express";
import CPaslon from "../controllers/CPaslon";
import upload from "../middleware/multer";
import AuthToken from "../middleware/AuthToken";

const RPaslon = express.Router();

RPaslon.get("/api/v1/paslon", CPaslon.find);
RPaslon.get("/api/v1/paslon/:id", CPaslon.findOne);
RPaslon.post("/api/v1/paslon", AuthToken.Authentication, upload.single("image"), CPaslon.create);
RPaslon.patch("/api/v1/paslon/:id", AuthToken.Authentication, upload.single("image"), CPaslon.update);
RPaslon.delete("/api/v1/paslon/:id", AuthToken.Authentication, CPaslon.delete);

export default RPaslon;