import { ObjectID } from '@tsed/mongoose';
import { CollectionOf, Default, Enum, Property, Required } from '@tsed/schema';
import { AccessCategoryEnum } from '../enums/AccessCategoryEnum';

class ResourceAccessLevelModel {
	@Property()
	@Default('CLIENT')
	@Enum(AccessCategoryEnum)
	category: AccessCategoryEnum;

	@Property()
	@Default(AccessCategoryEnum.CLIENT)
	description: string;
}

export class RolesModel {
	@ObjectID()
	@Property()
	_id: ObjectID;

	@Property()
	@Default(false)
	isDeleted: boolean;

	@Required()
	@Property()
	title: string;

	@Required()
	@Property()
	description: string;

	@Required()
	@Property()
	@CollectionOf(ResourceAccessLevelModel)
	resourceAccessLevels: ResourceAccessLevelModel[];
}
