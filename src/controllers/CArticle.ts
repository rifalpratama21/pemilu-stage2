import { Request, Response } from "express"
import SArticle from "../services/SArticle"

export default new class CPemilu {
    find(req: Request, res: Response) {
        SArticle.find(req, res)        
    }

    findOne(req: Request, res: Response) {
        SArticle.findOne(req, res)
    }

    create(req: Request, res: Response) {
        SArticle.create(req, res)
    }

    update(req: Request, res: Response) {
        SArticle.update(req, res)
    }

    delete(req: Request, res: Response) {
        SArticle.delete(req, res)
    }
}