import { Request, Response } from "express";
import SAuth from "../services/SAuth";

export default new class CAuth {
    register(req: Request, res: Response) {
        SAuth.register(req, res)
    }

    login(req: Request, res: Response) {
        SAuth.login(req, res)
    }

    find(req: Request, res: Response) {
        SAuth.find(req, res)
    }

    findOne(req: Request, res: Response) {
        SAuth.findOne(req, res)
    }
}