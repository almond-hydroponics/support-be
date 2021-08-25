import {User} from "../entities/User";
import {Inject} from "@tsed/common";
import {MongooseModel} from "@tsed/mongoose";
import {LoggerService} from "../services/LoggerService";
import {Exception} from "@tsed/exceptions";

export class ProfileRepository {
    log = new LoggerService("ProfileRepository")

    constructor(
        @Inject(User) private use: MongooseModel<User>
    ) {}

    async createOrUpdateProfile(profile: User) {
        if (profile._id !== undefined)
            return this.use.findByIdAndUpdate(profile._id, profile);
        return this.use.create(profile);
    }

    async findProfiles() {
        return this.use.find({activeProfile: true, isDeleted: false}).exec()
    }

    async findProfileById(_id: string) {
        const user = await this.use.findOne({_id: _id, isDeleted: false}).then()
        if (!user)
            throw new Exception(200, `User with ${_id} was not found`)
        return user
    }

    async deleteProfile(_id: string) {
        return this.use.findByIdAndUpdate(_id, {isDeleted: true, activeProfile: false}, (err, doc) => {
            if (err)
                throw new Exception(200, `There was an error performing delete operation`)
            this.log.debug(`User ${_id} deactivated`)
        }).exec()
    }

}
