import {
	CollectionOf,
	Email,
	Format,
	MaxLength,
	MinLength,
	Property,
	Required,
} from '@tsed/schema';

export class UserModel {
	@Property()
	_id: string;

	@MaxLength(50)
	@MinLength(3)
	@Required()
	currentRole: string;

	@MaxLength(20)
	@MinLength(3)
	@Required()
	firstName: string;

	@MaxLength(20)
	@MinLength(3)
	@Required()
	lastName: string;

	@MaxLength(13)
	@MinLength(8)
	@Required()
	phoneNumber: string;

	@Email()
	@Required()
	@MinLength(8)
	@MaxLength(20)
	email: string;

	@Format('date-time') // or date-time, etc...
	createDate: Date;

	@Format('date-time')
	createdAt: Date;

	@Format('date-time')
	updatedAt: Date;

	@Required()
	@Property()
	@CollectionOf(String)
	roles: string[];

	@Property()
	@Required()
	isVerified: boolean;

	@Property()
	@Required()
	@CollectionOf(String)
	devices: any[];
}
