import {EntityRepository, Repository} from "typeorm";
import {AlmondUsers} from "../entities/AlmondUsers";
import {Inject} from "@tsed/common";
import {MongooseModel} from "@tsed/mongoose";
import {Injectable} from "@tsed/di";

@Injectable()
export class UserRepository {
    constructor(@Inject(AlmondUsers) private almondUser: MongooseModel<AlmondUsers>) {
    }
    async findByEmail(email:string): Promise<any> {
        return await this.almondUser.find({email}).exec();
    }

    async findAll(): Promise<AlmondUsers[]> {
        return await this.almondUser.find().exec()
    }
}
