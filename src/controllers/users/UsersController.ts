import {Controller, Get, Inject, PathParams, PlatformResponse, QueryParams, Res} from "@tsed/common";
import {UserService} from "../../services/UserService";
import {LoggerService} from "../../services/LoggerService";
import {email, Format, Name, Required} from "@tsed/schema";
import {AlmondUsers} from "../../entities/AlmondUsers";
import {ResponseWrapper} from "../../utils/ResponseWrapper";

@Controller("/user")
@Name('Users')
export class UsersController {
    log = new LoggerService("UserController")
    @Inject()
    userService: UserService

    @Get('/')
    async getAllUsers(@Res() response: PlatformResponse, @Format("email") @Required() @QueryParams("email") email: string): Promise<PlatformResponse<AlmondUsers>> {
        try{
            const data = await this.userService.getUserByEmail(`${email}`)
            let message = `User fetched successfully`
            if(data == null){
                message = `user with ${email} does not exist`
            }
            return response.body(ResponseWrapper.SuccessResponse(`${message}`,data))
        }catch (e:any){
           const data = null
            return response.body(ResponseWrapper.FailResponse(`An error occurred ${e.message}`,data))
        }
    }

    @Get('/users')
    async getUserByEmail() {

    }
}
