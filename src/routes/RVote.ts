import * as express from "express";
import CVote from "../controllers/CVote";
import AuthToken from "../middleware/AuthToken";

const RVote = express.Router();

RVote.get("/api/v1/vote", CVote.find);
RVote.post("/api/v1/vote", AuthToken.Authentication, CVote.create);

export default RVote;