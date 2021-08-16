import {Email, Format, Maximum, MaxLength, Minimum, MinLength, Pattern, Required} from "@tsed/schema";

export class UserModel {
    @MaxLength(20)
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
