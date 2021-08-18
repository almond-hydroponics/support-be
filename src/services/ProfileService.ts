import {Injectable} from "@tsed/di";
import {Inject} from "@tsed/common";
import {ProfileRepository} from "../repositories/ProfileRepository";
import {UserModel} from "../models/UserModel";
import {User} from "../entities/User";
import {LoggerService} from "./LoggerService";

@Injectable()
export class ProfileService {
    log = new LoggerService("Profile Service")
    constructor(@Inject() private profileRepository: ProfileRepository) {}

    async createProfile(profile: UserModel) : Promise<UserModel>{
        const user: User = JSON.parse(JSON.stringify(profile))
        return await this.profileRepository.createOrUpdateProfile(user).then(() => {
            return profile
        })
    }

    async findAllProfiles() : Promise<UserModel[]>{
        const profiles = await this.profileRepository.findProfiles().then((data) => {
            this.log.error(' ===> log' + data)
            return data
        })
        return JSON.parse(JSON.stringify(profiles))
    }

    async findById(_id: string) : Promise<UserModel>{
        const profile = await this.profileRepository.findProfileById(_id).then((data) => {
            return data
        })
        return JSON.parse(JSON.stringify(profile))
    }

    async delete(_id: string) : Promise<void>{
        const profile = await this.profileRepository.deleteProfile(_id).then((data) => {
            return data
        })
        return JSON.parse(JSON.stringify(profile))
    }
}
