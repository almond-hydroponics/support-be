import {Service} from "@tsed/common";
import {MongooseService} from "@tsed/mongoose";

@Service()
export class AlmondConnectionService {
    defaultS: any
    constructor(mongooseService: MongooseService) {
        this.defaultS = mongooseService.get('almond')
    }
}
