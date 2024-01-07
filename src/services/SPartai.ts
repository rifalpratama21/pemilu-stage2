import { Repository } from "typeorm";
import { Partai } from "../entities/Partai";
import { AppDataSource } from "../data-source";
import { Request, Response } from "express";
import { CrPartaiSchema } from "../utils/VPartai";
import cloudinary from "../middleware/Cloudinary";
import { promisify } from "util";
import * as fs from "fs";

const unlinkAsync = promisify(fs.unlink);

export default new class SPartai {
    private readonly RepoPartai: Repository<Partai> = AppDataSource.getRepository(Partai)

    async find(req: Request, res: Response): Promise<Response> {
        try {
            const partais = await this.RepoPartai.find({
                relations: ["paslon"]
            });
            return res.status(200).json({message: "Find All Success", data: partais});
        } catch (error) {
            return res.status(500).json(error.message);
        }
    }

    async findOne(req: Request, res: Response): Promise<Response> {
        try {
            const id:number = Number(req.params.id);

        const data = await this.RepoPartai.find({where: {id}, relations: ["paslon"]});
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

            const { error } = CrPartaiSchema.validate(data);
            if(error) return res.status(400).json(error.message);

            const cloud = await cloudinary.uploader.upload(req.file.path, {
                folder: "pemilu",
                tags: "partai"
            });

            await unlinkAsync(req.file.path);

            let createdAt: Date | undefined = data.createdAt;
            let updatedAt: Date | undefined = data.updatedAt;
            if(createdAt == undefined) createdAt = new Date();
            if(updatedAt == undefined) updatedAt = new Date();

            const newPartai = await this.RepoPartai.create({
                name: data.name,
                leader: data.leader,
                no_urut: count,
                visi_misi: data.visi_misi,
                address: data.address,
                image: cloud.secure_url,
                createdAt,
                updatedAt,
                paslon: data.paslonId
            });

            const result = await this.RepoPartai.save(newPartai);
            return res.status(200).json({message: "Create Success", data: result});

        } catch (error) {
            return res.status(500).json(error.message);
        }
    }

    async update(req: Request, res: Response): Promise<Response> {
        try { 
            const id:number = Number(req.params.id);
            const newData = req.body

            const data = await this.RepoPartai.findOneBy({id});
            if (!data) {
                return res.status(404).json({ message: "Data not found" });
            }

            let name: string | undefined = newData.name ?? data.name;
            let leader: string | undefined = newData.leader ?? data.leader;
            let no_urut: number | undefined = newData.no_urut ?? data.no_urut;
            let visi_misi: string | undefined = newData.visi_misi ?? data.visi_misi;
            let address: string | undefined = newData.address ?? data.address;
            let image: string | undefined = newData.image ?? data.image;
            let paslon: any | undefined = newData.paslonId ?? data.paslon;

            if (req.file) {
                const urlArray = image.split("/")
                const imageName = urlArray[urlArray.length - 1];
                const publicId = imageName.split(".")[0];
                await cloudinary.uploader.destroy("pemilu/" + publicId);
                const updateImg = await cloudinary.uploader.upload(req.file.path, {
                    folder: "pemilu",
                    tags: "partai"
                });
                image = updateImg.secure_url;
                await unlinkAsync(req.file.path);
            }

            await this.RepoPartai.update({id}, {
                name : name,
                leader : leader,
                no_urut : no_urut,
                visi_misi : visi_misi,
                address : address,
                image : image,
                updatedAt : new Date(),
                paslon : paslon
            });

            const viewData = await this.RepoPartai.findOne({where: {id}, relations: ["paslon"]});
            return res.status(200).json({message: "Update Success", data: viewData});

        } catch (error) {
            return res.status(500).json(error.message);
        }
    }

    async delete (req: Request, res: Response): Promise<Response> {
        try {
            const id:number = Number(req.params.id);
            const data = await this.RepoPartai.findOneBy({id});
            if (!data) {
                return res.status(404).json({ message: "Data not found" });
            }

            const imageArray = data.image.split("/");
            const imageName = imageArray[imageArray.length - 1];
            const publicId = imageName.split(".")[0];
            await cloudinary.uploader.destroy("pemilu/" + publicId);

            await this.RepoPartai.delete({id});
            return res.status(200).json({message: "Delete Success"});

        } catch (error) {
            return res.status(500).json(error.message);
        }
    }

    async getCount(): Promise<number> {
        const count = await this.RepoPartai.count();
        return count;
    }
}