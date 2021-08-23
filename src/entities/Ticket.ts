import {
    Default, Enum,
    Format,
    MaxLength,
    Minimum,
    MinLength,
    Name,
    Property,
    Required
} from "@tsed/schema";
import {Model, ObjectID, Ref, Unique} from "@tsed/mongoose";
import {Statuses} from "../enums/Statuses";
import {Priorities} from "../enums/Priorities";
import {Categories} from "../enums/Categories";

@Model({name:'support_tickets'})
@Name('SupportTicket')
export class Ticket {
    @ObjectID()
    @Property()
    _id: ObjectID;

    @Property()
    @MaxLength(20)
    @Unique()
    @Required()
    ticketNo: string;

    @Property()
    @MaxLength(255)
    @Required()
    summary: string;

    @Property()
    @Minimum(200)
    @MaxLength(2000)
    @Required()
    description: string;

    @Property()
    @Minimum(200)
    @MaxLength(5000)
    @Required()
    html: string;

    @MaxLength(100)
    @MinLength(3)
    @Required()
    @Property()
    @Default(Statuses.IN_PROGRESS)
    @Enum(Statuses)
    statusId: Statuses;

    @MaxLength(24)
    @MinLength(24)
    @Property()
    @ObjectID()
    linkedIssueId: string;

    @Required()
    @Property()
    @Default(Priorities.MEDIUM)
    @Enum(Priorities)
    priorityId: Priorities;

    @MaxLength(24)
    @MinLength(24)
    @Required()
    @Property()
    @ObjectID()
    assigneeId: string;

    @MaxLength(24)
    @MinLength(24)
    @Required()
    @Property()
    @ObjectID()
    userId: string;

    @Required()
    @Property()
    @Enum(Categories)
    @Default(Categories.DEFAULT)
    categoryId: Categories;

    @Property()
    @Format("date-time")
    completedAt: Date;

    @Property()
    @Default(false)
    isDeleted: boolean

    @Property()
    @Default(false)
    isParent: boolean
}