import {LoggerService} from "../services/LoggerService";
import {Inject} from "@tsed/common";
import {MongooseModel} from "@tsed/mongoose";
import {Exception} from "@tsed/exceptions";
import {Comments} from "../entities/Comment";

export class CommentsRepository{
    log = new LoggerService("Comments Repository")

    constructor(
        @Inject(Comments)
        private model: MongooseModel<Comments>
    )
    {}

    async createOrUpdateComment(cm: Comments){
        if(cm._id !== undefined){
            return this.model.findByIdAndUpdate(cm._id, cm);
        }else{
            return this.model.create(cm);
        }
    }

    async findCommentByUserId(userId){
        const cm = await this.model.findOne({userId: userId}).then()
        if(!cm)
            throw new Exception(200,`Comment from user ${userId} was not found`)
        return cm
    }

    async deleteComment(_id: string){
        return this.model.findByIdAndUpdate(_id,{isDeleted:true},(err,model) => {
            if(err)
                throw new Exception(200,`There was a problem updating comment`)
            return model
        }).exec()
    }
}
