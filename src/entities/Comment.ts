import {Model, ObjectID} from "@tsed/mongoose";
import {MaxLength, MinLength, Name, Property, Required} from "@tsed/schema";

@Model({name:'support_ticket_comments'})
@Name('TicketComments')
export class Comments{
    @ObjectID()
    @Property()
    _id: ObjectID;

    @Property()
    @MaxLength(200)
    @Required()
    subject: string;

    @Property()
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
