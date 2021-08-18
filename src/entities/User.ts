import {
    Default,
    Email,
    Format,
    Ignore,
    Maximum,
    MaxLength,
    Minimum,
    MinLength,
    Name,
    Property,
    Required
} from "@tsed/schema";
import {Column, Entity, PrimaryGeneratedColumn} from "typeorm";
import {Model, ObjectID, Unique} from "@tsed/mongoose";

@Model({name:'users'})
@Name('users')
export class User {
    @ObjectID()
    @Property()
    _id: ObjectID;

    @Property()
    @MaxLength(100)
    @Required()
    firstName: string;

    @Property()
    @MaxLength(100)
    @Required()
    lastName: string;

    @Property()
    @Unique()
    @Minimum(0)
    @Maximum(100)
    email: string;

    @MaxLength(100)
    @MinLength(3)
    @Required()
    @Property()
    @ObjectID()
    currentRole: ObjectID;

    @MaxLength(13)
    @MinLength(8)
    @Required()
    @Unique()
    phoneNumber: string;

    @Property()
    @Format("date-time")  // or date-time, etc...
    createDate: Date;
    @Property()
    @Format("date-time")
    createdAt: Date;
    @Property()
    @Format("date-time")
    updatedAt: Date;
    @Property()
    roles: ObjectID[];
    @Property()
    isVerified: boolean;
    @Property()
    devices: ObjectID[];
    @Property()
    @Default(true)
    activeProfile: boolean
}
