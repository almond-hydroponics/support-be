import {LoggerService} from "../services/LoggerService";
import {Inject} from "@tsed/common";
import {MongooseModel} from "@tsed/mongoose";
import {Role} from "../entities/Role";
import {Exception} from "@tsed/exceptions";

export class RolesRepository{
    log = new LoggerService("RolesRepository")

    constructor(@Inject(Role)
                private model: MongooseModel<Role>) {
    }

    async createOrUpdateRole(role: Role){
        if(role._id !== undefined){
            return this.model.findByIdAndUpdate(role._id, role);
        }else{
            return this.model.create(role);
        }
    }

    async findRoles(){
        return this.model.find({isDeleted: false}).exec()
    }

    async findRoleById(_id){
       const role = await this.model.findOne({_id: _id}).then()
        if(!role)
            throw new Exception(200,`Role ${_id} was not found in the database`)
        return role
    }

    async deleteRole(_id: string){
        return this.model.findByIdAndUpdate(_id,{$set:{isDeleted:true}}).exec()
    }
}
