import {Injectable} from "@tsed/di";
import {Inject} from "@tsed/common";
import {MongooseModel} from "@tsed/mongoose";
import {AlmondUsers} from "../entities/AlmondUsers";
import {UserRepository} from "../repositories/UserRepository";

@Injectable()
export class UserService{
    constructor(@Inject() private userRepository: UserRepository) {
    }

    async getUserByEmail(email: string) {
        const list = await this.userRepository.findByEmail(email);
        return list[0]
    }
}
