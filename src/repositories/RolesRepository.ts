import {LoggerService} from "../services/LoggerService";
import {Inject} from "@tsed/common";
import {User} from "../entities/User";
import {MongooseModel} from "@tsed/mongoose";
import {Role} from "../entities/Role";

export class RolesRepository{
    log = new LoggerService("RolesRepository")
    constructor(@Inject(User)
                private use: MongooseModel<Role>) {
    }

    async createOrUpdateRole(role: Role){
        if(role._id !== undefined){
            return this.use.findByIdAndUpdate(role._id, role);
        }else{
            return this.use.create(role);
        }
    }

    async findRoles(){
        return this.use.find({isDeleted: false}).exec()
    }

    async findRoleById(_id: string){
        return this.use.find({_id: _id}).exec()
    }

    async deleteRole(_id: string){
        this.log.debug(`Role to be deleted ${_id}`)
        return this.use.findByIdAndUpdate(_id,{$set:{isDeleted:true}}).exec()
    }
}
