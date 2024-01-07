import { Request, Response } from "express";
import SVote from "../services/SVote";

export default new class CPeserta {
    find(req: Request, res: Response) {
        SVote.find(req,res)
    }
    create(req: Request, res: Response) {
        SVote.create(req, res)
    }
}