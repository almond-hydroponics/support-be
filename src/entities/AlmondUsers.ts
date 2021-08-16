import {Model,ObjectID} from "@tsed/mongoose"
import {Property} from "@tsed/schema";

@Model({name: 'users', connection: 'almond'})
export class AlmondUsers {
    @ObjectID()
    _id: string;
    @Property()
    email: string;
    @Property()
    firstName: string;
    @Property()
    lastName: string;
    @Property()
    roles: []
    @Property()
    isVerified: boolean
    @Property()
    devices: []
    @Property()
    currentRole: any
    @Property()
    createdAt: Date
    @Property()
    updatedAt: Date
}
