
import {User} from "../entities/User";
import {Inject} from "@tsed/common";
import {MongooseModel, ObjectID} from "@tsed/mongoose";
import {LoggerService} from "../services/LoggerService";

export class ProfileRepository{
    log = new LoggerService("ProfileRepository")
    constructor(@Inject(User)
                private use: MongooseModel<User>) {
    }

    async createOrUpdateProfile(profile: User){
        if(profile._id !== undefined){
            return this.use.findByIdAndUpdate(profile._id, profile);
        }else{
            return this.use.create(profile);
        }
    }

    async findProfiles(){
        return this.use.find({activeProfile: true}).exec()
    }

    async findProfileById(_id: string){
        return this.use.find({_id: _id}).exec()
    }

    async deleteProfile(_id: string){
        this.log.debug(`User Profile to be deleted ${_id}`)
        return this.use.findByIdAndDelete(_id).exec()
    }

}
