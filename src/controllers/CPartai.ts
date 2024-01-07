import { Request, Response } from "express";
import SPartai from "../services/SPartai";

export default new class CPaslon {
    find(req: Request, res: Response) {
        SPartai.find(req,res)
    }

    findOne(req: Request, res: Response) {
        SPartai.findOne(req, res)
    }

    create(req: Request, res: Response) {
        SPartai.create(req, res)
    }

    update(req: Request, res: Response) {
        SPartai.update(req, res)
    }

    delete(req: Request, res: Response) {
        SPartai.delete(req, res)
    }
}