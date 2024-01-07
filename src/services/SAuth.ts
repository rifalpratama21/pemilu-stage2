import { Repository } from "typeorm";
import { Users } from "../entities/Users";
import { AppDataSource } from "../data-source";
import { Request, Response } from "express";
import { CrUserLogSchema, CrUserRegSchema } from "../utils/VUsers";
import * as bcrypt from "bcrypt";
import * as jwt from "jsonwebtoken";

export default new class SUsers {
    private readonly AuthUser: Repository<Users> = AppDataSource.getRepository(Users)

    async register(req: Request, res: Response): Promise<Response> {
        try {
            const data = req.body

            const { error } = CrUserRegSchema.validate(data);
            if(error) return res.status(400).json(error.message);

            const usernameCheck = await this.AuthUser.findOneBy({username: data.username});
            if(usernameCheck) return res.status(400).json({message: "Username already used"});

            const hashPassword = await bcrypt.hash(data.password, 10);

            const newUser = await this.AuthUser.create({
                ...data,
                password: hashPassword,
                createdAt: new Date(),
                updatedAt: new Date()
            });

            const result = await this.AuthUser.save(newUser);
            return res.status(201).json({message: "Register Success", data: result});

        } catch (error) {
            return res.status(500).json(error.message);
        }
    }

    async login(req: Request, res: Response): Promise<Response> {
        try {
            const data = req.body;

            const { error } = CrUserLogSchema.validate(data);
            if(error) return res.status(400).json(error.message);

            const userRegistered = await this.AuthUser.findOne({where: {username: data.username}});
            if (!userRegistered) return res.status(409).json({message: "Username not exist"});

            const checkPassword = await bcrypt.compare(data.password, userRegistered.password);
            if(!checkPassword) return res.status(400).json({message: "Wrong password"});

            const user = this.AuthUser.create({
                id: userRegistered.id,
                fullname: userRegistered.fullname
            });

            const token = jwt.sign({user}, "keyboard cat", {expiresIn: "1h"});
            return res.status(200).json({message: "Login Success", token: token});

        } catch (error) {
            return res.status(500).json(error.message);
        }
    }
 
    async find(req: Request, res: Response): Promise<Response> {
        try {
            const users = await this.AuthUser.find({
                relations: ["pemilu", "peserta"]
            });
            return res.status(200).json({message: "Find All Success", data: users});
        } catch (error) {
            return res.status(500).json(error.message);
        }
    }

    async findOne(req: Request, res: Response): Promise<Response> {
        try {
            const id = Number(req.params.id);
            const user = await this.AuthUser.find({where: {id: id}, relations: ["pemilu", "peserta"]});
            return res.status(200).json({message: "Find One Success", data: user});
        } catch (error) {
            return res.status(500).json(error.message);
        }  
    }
}