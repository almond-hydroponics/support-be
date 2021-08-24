import {LoggerService} from "./LoggerService";
import {Inject} from "@tsed/common";
import {CommentsRepository} from "../repositories/CommentsRepository";
import {CommentsModel} from "../models/CommentsModel";
import {Comments} from "../entities/Comment";

export class CommentsService{
    log = new LoggerService("Comments Service")

    constructor(@Inject() private commentsRepo: CommentsRepository) {}

    async createOrUpdateComment(cm: CommentsModel) : Promise<CommentsModel>{
        const r: Comments = JSON.parse(JSON.stringify(cm))
        return await this.commentsRepo.createOrUpdateComment(r).then((data) => {
            return data
        })
    }

    async findCommentByUserId(userId) : Promise<CommentsModel>{
        const cm = await this.commentsRepo.findCommentByUserId(userId).then((data) => {
            return data
        })
        return JSON.parse(JSON.stringify(cm))
    }

    async deleteComment(_id: string) : Promise<void>{
        const cm = await this.commentsRepo.deleteComment(_id).then((data) => {
            return data
        })
        return JSON.parse(JSON.stringify(cm))
    }
}
