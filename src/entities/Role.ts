import {CollectionOf, Default, Enum, Name, Property, Required} from "@tsed/schema";
import {Model, ObjectID} from "@tsed/mongoose";
import {AccessCategoryEnum} from "../enums/AccessCategoryEnum";

class ResourceAccessLevel {
    @Property()
    @Default('CLIENT')
    @Enum(AccessCategoryEnum)
    category: AccessCategoryEnum;

    @Property()
    @Default(AccessCategoryEnum.CLIENT)
    description: string
}

@Model({name:'roles'})
@Name('roles')
export class Role{
    @ObjectID()
    @Property()
    _id: ObjectID;

    @Required()
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
    @CollectionOf(ResourceAccessLevel)
    resourceAccessLevels: ResourceAccessLevel[];
}
