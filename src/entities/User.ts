import {Email, Format, Maximum, MaxLength, Minimum, MinLength, Property, Required} from "@tsed/schema";
import {Column, Entity, PrimaryGeneratedColumn} from "typeorm";
import {ObjectID} from "@tsed/mongoose";

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    @ObjectID()
    @Property()
    _id: string;

    @Column()
    @MaxLength(100)
    @Required()
    firstName: string;

    @Column()
    @MaxLength(100)
    @Required()
    lastName: string;

    @Column()
    @Minimum(0)
    @Maximum(100)
    age: number;

    @Column()
    @Minimum(0)
    @Maximum(100)
    email: number;

    @MaxLength(20)
    @MinLength(3)
    @Required()
    currentRole: string;

    @MaxLength(13)
    @MinLength(8)
    @Required()
    phoneNumber: string;

    @Format("date")  // or date-time, etc...
    createDate: Date;
    @Format("date")
    createdAt: Date;
    @Format("date")
    updatedAt: Date;
    roles: string[];
    isVerified: boolean;
    devices: any[];

}
