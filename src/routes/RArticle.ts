import * as express from "express";
import CArticle from "../controllers/CArticle";
import upload from "../middleware/multer";
import AuthToken from "../middleware/AuthToken";

const RArticle = express.Router();

RArticle.get("/api/v1/article", CArticle.find);
RArticle.get("/api/v1/article/:id", CArticle.findOne);
RArticle.post("/api/v1/article", AuthToken.Authentication, upload.single("image"), CArticle.create);
RArticle.patch("/api/v1/article/:id", AuthToken.Authentication, upload.single("image"), CArticle.update);
RArticle.delete("/api/v1/article/:id", AuthToken.Authentication, CArticle.delete);

export default RArticle;