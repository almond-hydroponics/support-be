import {BodyParams, Controller, Delete, Get, Inject, PlatformResponse, Post, QueryParams, Res} from "@tsed/common";
import {Name, Required} from "@tsed/schema";
import {LoggerService} from "../services/LoggerService";
import {CommentsService} from "../services/CommentsService";
import {CommentsModel} from "../models/CommentsModel";
import {ResponseWrapper} from "../utils/ResponseWrapper";

@Controller('/comment')
@Name('Comments Controller')
export class CommentsController {

    log = new LoggerService('Comments Controller')

    @Inject()
    commentsService: CommentsService

    @Get('/commentByTicketId')
    async getCommentsByCommentId(@Res() response: PlatformResponse, @Required() @QueryParams('ticketId') ticketId: string){
        try{
            const comments = await this.commentsService.findCommentByTicketId(ticketId)
            return response.body(ResponseWrapper.SuccessResponse(`Record fetched successfully`,comments))
        }catch (e: any){
            return response.body(ResponseWrapper.FailResponse(`Failed to fetch records for id ${ticketId}`,e.message))
        }
    }

    @Delete('/deleteComment')
    async deleteTicket(@Res() response: PlatformResponse, @Required() @QueryParams('commentId') commentId: string){
        try{
            const comment = await this.commentsService.deleteComment(commentId)
            return response.body(ResponseWrapper.SuccessResponse(`Record deleted successfully`,comment))
        }catch (e: any){
            return response.body(ResponseWrapper.FailResponse(`Failed to delete comment with id ${commentId}`,e.message))
        }
    }

    @Post('/createUpdateComment')
    async createOrUpdateComment(@Res() response: PlatformResponse, @BodyParams() comment: CommentsModel){
        try{
            const comm = await this.commentsService.createOrUpdateComment(comment).then((data) => {
                return JSON.stringify(data)
            })
            return response.body(ResponseWrapper.SuccessResponse(`Operation was Successful`,comm))
        }catch (e) {
            return response.body(ResponseWrapper.FailResponse(`There was an error creating the record`, e.message))
        }
    }
}
