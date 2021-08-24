import {ObjectID} from "@tsed/mongoose";
import {MaxLength, MinLength, Property, Required} from "@tsed/schema";

export class CommentsModel {
    @Property()
    _id: string;

    @Property()
    @MinLength(5)
    @MaxLength(200)
    @Required()
    subject: string;

    @Property()
    @MinLength(50)
    @MaxLength(2500)
    @Required()
    description: string;

    @MaxLength(24)
    @MinLength(24)
    @Required()
    @Property()
    @ObjectID()
    ticketId: string;

    @MaxLength(24)
    @MinLength(24)
    @Required()
    @Property()
    @ObjectID()
    userId: string;
}
