import { Repository } from "typeorm";
import { Article as Pemilu } from "../entities/Article";
import { AppDataSource } from "../data-source";
import { Request, Response } from "express";
import { CrArticleSchema } from "../utils/VArticle";
import cloudinary from "../middleware/Cloudinary";
import { promisify } from "util";
import * as fs from "fs";

const unlinkAsync = promisify(fs.unlink);

export default new (class SArticle {
  private readonly RepoArticle: Repository<Pemilu> =
    AppDataSource.getRepository(Pemilu);

  async find(req: Request, res: Response): Promise<Response> {
    try {
      const articles = await this.RepoArticle.find();
      return res
        .status(200)
        .json({ message: "Find All Success", data: articles });
    } catch (error) {
      return res.status(500).json(error.message);
    }
  }

  async findOne(req: Request, res: Response): Promise<Response> {
    try {
      const id: number = Number(req.params.id);

      const article = await this.RepoArticle.findOne({ where: { id } });

      if (article == undefined)
        return res.status(404).json({ message: "Data not found" });
      return res
        .status(200)
        .json({ message: "Find by id Success", data: article });
    } catch (error) {
      return res.status(500).json({ message: "Something went wrong" });
    }
  }

  async create(req: Request, res: Response): Promise<Response> {
    try {
      const data = req.body;
      data.author = res.locals.loginSession.user.fullname;
      data.users = res.locals.loginSession.user.id;

      const { error } = CrArticleSchema.validate(data);
      if (error) return res.status(400).json(error.message);

      const cloud = await cloudinary.uploader.upload(req.file.path, {
        folder: "pemilu",
        tags: "pemilu",
      });

      await unlinkAsync(req.file.path);

      let createdAt: Date | undefined = data.createdAt;
      let updatedAt: Date | undefined = data.updatedAt;
      if (createdAt == undefined) createdAt = new Date();
      if (updatedAt == undefined) updatedAt = new Date();

      const newPemilu = await this.RepoArticle.save({
        title: data.title,
        author: data.author,
        description: data.description,
        image: cloud.secure_url,
        createdAt,
        updatedAt,
        users: data.users,
      });

      // const savedArticle = await this.RepoArticle.save(newPemilu);
      return res
        .status(200)
        .json({ message: "Create Success", data: newPemilu });
    } catch (error) {
      return res.status(500).json(error.message);
    }
  }

  async update(req: Request, res: Response): Promise<Response> {
    try {
      const id: number = Number(req.params.id);
      const newData = req.body;
      newData.userId = res.locals.loginSession.user.id;
      console.log(newData.userId);

      const data = await this.RepoArticle.findOneBy({ id });
      if (!data) {
        return res.status(404).json({ message: "Data not found" });
      }

      const checkId = await this.RepoArticle.findOne({
        where: { id },
        relations: ["users"],
      });
      if (checkId.users.id !== newData.userId) {
        return res.status(400).json({ message: "User not allowed to edit" });
      }
      let title: string | undefined = newData.title ?? data.title;
      let author: string | undefined = newData.author ?? data.author;
      let description: string | undefined =
        newData.description ?? data.description;
      let image: string | undefined = newData.image ?? data.image;

      if (req.file) {
        const urlArray = image.split("/");
        const imageName = urlArray[urlArray.length - 1];
        const publicId = imageName.split(".")[0];
        await cloudinary.uploader.destroy("pemilu/" + publicId);

        const cloud = await cloudinary.uploader.upload(req.file.path, {
          folder: "pemilu",
          tags: "artikel",
        });
        image = cloud.secure_url;
        await unlinkAsync(req.file.path);
      }

      await this.RepoArticle.update(
        { id },
        {
          title: title,
          author: author,
          description: description,
          image: image,
          updatedAt: new Date(),
        }
      );

      const viewData = await this.RepoArticle.findOneBy({ id });
      return res
        .status(200)
        .json({ message: "Update Success", data: viewData });
    } catch (error) {
      return res.status(500).json(error.message);
    }
  }

  async delete(req: Request, res: Response): Promise<Response> {
    try {
      const id: number = Number(req.params.id);
      const data = await this.RepoArticle.findOneBy({ id });
      if (!data) {
        return res.status(404).json({ message: "Data not found" });
      }

      const imageArray = data.image.split("/");
      const imageName = imageArray[imageArray.length - 1];
      const publicId = imageName.split(".")[0];
      await cloudinary.uploader.destroy("pemilu/" + publicId);

      await this.RepoArticle.delete({ id });
      return res.status(200).json({ message: "Delete Success" });
    } catch (error) {
      return res.status(500).json({ message: "Something went wrong" });
    }
  }
})();
