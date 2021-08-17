
import {User} from "../entities/User";
import {Inject} from "@tsed/common";
import {MongooseModel} from "@tsed/mongoose";
import {LoggerService} from "../services/LoggerService";

export class ProfileRepository{
    log = new LoggerService("ProfileRepository")

    @Inject(User)
    private userModel: MongooseModel<User>

    async createOrUpdateProfile(profile: User){
        if(profile._id.length > 0){
            return this.userModel.findByIdAndUpdate(profile._id, profile);
        }else{
            return this.userModel.create(profile);
        }
    }

    async findProfiles(){
        return this.userModel.find({isDeleted: false}).exec()
    }

    async findProfileById(_id: string){
        return this.userModel.find({_id: _id}).exec()
    }

    async deleteProfile(_id: string){
        this.log.debug(`User Profile to be deleted ${_id}`)
        return this.userModel.findByIdAndDelete(_id).exec()
    }

}
