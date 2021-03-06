import { ObjectID, Unique } from '@tsed/mongoose';
import {
	Default,
	Enum,
	Format,
	MaxLength,
	Minimum,
	MinLength,
	Property,
	Required,
} from '@tsed/schema';
import { Statuses } from '../enums/Statuses';
import { Priorities } from '../enums/Priorities';
import { Categories } from '../enums/Categories';

export class TicketModel {
	@Property()
	_id: string;

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
	status: Statuses;

	@MaxLength(24)
	@MinLength(24)
	@Property()
	@ObjectID()
	linkedIssueId: string;

	@Required()
	@Property()
	@Default(Priorities.MEDIUM)
	@Enum(Priorities)
	priority: Priorities;

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
	category: Categories;

	@Property()
	@Format('date-time')
	completedAt: Date;

	@Property()
	@Default(false)
	isDeleted: boolean;

	@Property()
	@Default(false)
	isParentIssue: boolean;

	@Property()
	@Required()
	@Default(false)
	escalated: boolean;

	@MaxLength(24)
	@MinLength(24)
	@Property()
	@ObjectID()
	escalatedToUser: string;
}
