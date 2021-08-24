import {LoggerService} from "./LoggerService";
import {Inject} from "@tsed/common";
import {CommentsRepository} from "../repositories/CommentsRepository";
import {CommentsModel} from "../models/CommentsModel";
import {Comments} from "../entities/Comment";
import {Injectable} from "@tsed/di";
import {Ticket} from "../entities/Ticket";
import {TicketService} from "./TicketService";
import {Exception} from "@tsed/exceptions";
import {Statuses} from "../enums/Statuses";

@Injectable()
export class CommentsService{
    log = new LoggerService("Comments Service")

    constructor(
        @Inject() private commentsRepo: CommentsRepository,
        @Inject() private ticketService: TicketService
    )
    {}

    async createOrUpdateComment(cm: CommentsModel) : Promise<CommentsModel>{
        const r: Comments = JSON.parse(JSON.stringify(cm))
        const ticket: Ticket = await this.ticketService.findByTicketId(cm.ticketId)

        if(ticket.status === Statuses.DONE)
            throw new Exception(200, `Ticket no ${ticket.ticketNo} has been closed and done`)

        if(!ticket)
            throw new Exception(200, `The following ticket is not available`)

        return await this.commentsRepo.createOrUpdateComment(r).then((data) => {
            return data
        })
    }

    async findCommentByTicketId(userId) : Promise<CommentsModel>{
        const cm = await this.commentsRepo.findCommentByTicketId(userId).then((data) => {
            return data
        })
        return JSON.parse(JSON.stringify(cm))
    }

    async deleteComment(commentId: string) : Promise<void>{
        const cm = await this.commentsRepo.deleteComment(commentId).then((data) => {
            return data
        })
        return JSON.parse(JSON.stringify(cm))
    }
}
