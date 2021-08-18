import {LoggerService} from "../services/LoggerService";
import {Inject} from "@tsed/common";
import {MongooseModel} from "@tsed/mongoose";
import {Role} from "../entities/Role";

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

    async findRoleById(_id: string){
        return this.model.find({_id: _id}).exec()
    }

    async deleteRole(_id: string){
        this.log.debug(`Role to be deleted ${_id}`)
        return this.model.findByIdAndUpdate(_id,{$set:{isDeleted:true}}).exec()
    }
}
