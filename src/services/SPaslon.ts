import { Repository } from "typeorm";
import { Paslon } from "../entities/Paslon";
import { AppDataSource } from "../data-source";
import { Request, Response } from "express";
import { CrPaslonSchema } from "../utils/VPaslon";
import cloudinary from "../middleware/Cloudinary";
import { promisify } from "util";
import * as fs from "fs";

const unlinkAsync = promisify(fs.unlink);

export default new class SPaslon {
    private readonly RepoPaslon: Repository<Paslon> = AppDataSource.getRepository(Paslon)

    async find(req: Request, res: Response): Promise<Response> {
        try {
            const paslons = await this.RepoPaslon.find({relations: ["partai"]} );
            return res.status(200).json({message: "Find All Success", data: paslons});
        } catch (error) {
            return res.status(500).json(error.message);
        }
    }

    async findOne(req: Request, res: Response): Promise<Response> {
        try {
            const id:number = Number(req.params.id);

        const data = await this.RepoPaslon.findOne({where: {id}, relations: ["partai"]});
        if (!data) {
            return res.status(404).json({ message: "Data not found" });
        }
        return res.status(200).json({message: "Find by id Success", data: data});
        } catch (error) {
            return res.status(500).json(error.message);
        }
    }

    async create(req: Request, res: Response): Promise<Response> {
        try {
            const data = req.body
            let count = await this.getCount() + 1;

            const { error } = CrPaslonSchema.validate(data);
            if(error) return res.status(400).json(error.message);

            const cloud = await cloudinary.uploader.upload(req.file.path, {
                folder: "pemilu",
                tags: "paslon"
            });

            await unlinkAsync(req.file.path);

            let createdAt: Date | undefined = data.createdAt;
            let updatedAt: Date | undefined = data.updatedAt;
            if(createdAt == undefined) createdAt = new Date();
            if(updatedAt == undefined) updatedAt = new Date();

            const newPaslon = await this.RepoPaslon.create({
                name: data.name,
                no_urut: count,
                visi_misi: data.visi_misi,
                image: cloud.secure_url,
                createdAt,
                updatedAt
            });

            const result = await this.RepoPaslon.save(newPaslon);
            return res.status(200).json({message: "Create Success", data: result});
            
        } catch (error) {
            return res.status(500).json(error.message);
        }        
    }

    async update(req: Request, res: Response): Promise<Response> {
        try { 
            const id:number = Number(req.params.id);
            const json = req.body;

            const data = await this.RepoPaslon.findOneBy({id});
            if (!data) {
                return res.status(404).json({ message: "Data not found" });
            }
            let name: string | undefined = json.name ?? data.name;
            let no_urut: number | undefined = json.no_urut ?? data.no_urut;
            let visi_misi: string | undefined = json.visi_misi ?? data.visi_misi;
            let image: string | undefined = json.image ?? data.image;

            if (req.file) {
                const urlArray = image.split("/");
                const imageName = urlArray[urlArray.length - 1];
                const publicId = imageName.split(".")[0];                
                await cloudinary.uploader.destroy("pemilu/" + publicId);

                const updateImg = await cloudinary.uploader.upload(req.file.path, {
                    folder: "pemilu",
                    tags: "paslon"
                });
                image = updateImg.secure_url;
                await unlinkAsync(req.file.path);                
            }

            await this.RepoPaslon.update({id}, {
                name : name,
                no_urut : no_urut,
                visi_misi: visi_misi,
                image: image,
                updatedAt: new Date()
            });

            const viewData = await this.RepoPaslon.findOne({where: {id}, relations: ["partai"]});
            return res.status(200).json({message: "Update Success", data: viewData});
        } catch (error) {
            return res.status(500).json(error.message)
        }
    }

    async delete (req: Request, res: Response): Promise<Response> {
        try {
            const id:number = Number(req.params.id);
            const data = await this.RepoPaslon.findOneBy({id});
            if (!data) {
                return res.status(404).json({ message: "Data not found" });
            }
            
            const imageArray = data.image.split("/");
            const imageName = imageArray[imageArray.length - 1];
            const publicId = imageName.split(".")[0];
            await cloudinary.uploader.destroy("pemilu/" + publicId);

            await this.RepoPaslon.delete({id});
            return res.status(200).json({message: "Delete Success"});

        } catch (error) {
            return res.status(500).json(error.message);
        }
    }

    async getCount(): Promise<number> {
        const count = await this.RepoPaslon.count();
        return count;
    }
}