import { Repository } from "typeorm";
import { Vote } from "../entities/Vote";
import { AppDataSource } from "../data-source";
import { Request, Response } from "express";
import { CrVoteSchema } from "../utils/VVote";

export default new class SVote {
    private readonly RepoVote: Repository<Vote> = AppDataSource.getRepository(Vote)

    async find(req: Request, res: Response): Promise<Response> {
        try {
            const vote = await this.RepoVote.find({
                relations: ["users", "paslon"]
            });
            const viewVote = vote.map((peserta) => {
                return {
                    id: peserta.id,
                    fullname: peserta.users.fullname,
                    address: peserta.users.address,
                    gender: peserta.users.gender,
                    vote: peserta.paslon.name
                }
            })
            return res.status(200).json({message: "Find All Success", data: viewVote});
        } catch (error) {
            return res.status(500).json(error.message);
        }
    }

    async create(req: Request, res: Response): Promise<Response> {
        try {
            const data = req.body
            data.usersId = res.locals.loginSession.user.id

            const { error } = CrVoteSchema.validate(data);
            if(error) return res.status(400).json(error.message);

            const newVote = await this.RepoVote.create({
                users: data.usersId,
                paslon: data.paslonId
            });
            await this.RepoVote.save(newVote);
            return res.status(201).json({message: "Vote Success", data: newVote});
        } catch (error) {
            return res.status(500).json({message: "You have already Voted"});
        }
    }
}