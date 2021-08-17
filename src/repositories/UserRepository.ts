import {EntityRepository, Repository} from "typeorm";
import {AlmondUser} from "../models/AlmondUser";
import {Inject} from "@tsed/common";
import {MongooseModel} from "@tsed/mongoose";
import {Injectable} from "@tsed/di";

@Injectable()
export class UserRepository {
    constructor(@Inject(AlmondUser) private almondUser: MongooseModel<AlmondUser>) {
    }
    async findByEmail(email:string): Promise<any> {
        return await this.almondUser.find({email}).exec();
    }

    async findAll(): Promise<AlmondUser[]> {
        return await this.almondUser.find().exec()
    }
}
