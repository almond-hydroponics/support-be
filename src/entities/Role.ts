import {CollectionOf, Default, Name, Property, Required} from "@tsed/schema";
import {Model, ObjectID} from "@tsed/mongoose";

class ResourceAccessLevel {
    @Property()
    @Default('CUSTOMER')
    name: string

    @Property()
    @Default('Customer Default')
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
