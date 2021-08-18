import {ObjectID} from "@tsed/mongoose";
import {CollectionOf, Default, Enum, Property, Required} from "@tsed/schema";

enum Categories {
    CLIENT = "Client",
    SUPPORT = "Support",
    SUPPORT_ADMIN = "Support Administrator",
    SUPER_ADMIN = "Super Administrator"
}

class ResourceAccessLevelModel {
    @Property()
    @Default('CLIENT')
    @Enum(Categories)
    category: Categories;

    @Property()
    @Default(Categories.CLIENT)
    description: string
}

export class RolesModel{
    @ObjectID()
    @Property()
    _id: ObjectID;

    @Required()
    @Property()
    @Default(false)
    deleted: boolean;

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
