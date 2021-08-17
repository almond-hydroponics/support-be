import {Controller, Get, Inject, PathParams, PlatformResponse, QueryParams, Res} from "@tsed/common";
import {UserService} from "../../services/UserService";
import {LoggerService} from "../../services/LoggerService";
import {Description, email, Format, Name, Required, Returns, Summary} from "@tsed/schema";
import {AlmondUser} from "../../models/AlmondUser";
import {ResponseWrapper} from "../../utils/ResponseWrapper";

@Controller("/users")
@Name('User Controller')
export class UsersController {
    log = new LoggerService("UserController")

    @Inject()
    userService: UserService

    @Get('/user')
    @Summary("This endpoint loads a user and his roles from Almond Backend system")
    @Description("Return a user with a given email")
    @Returns(200, AlmondUser)
    async getUserByEmail(@Res() response: PlatformResponse, @Format("email") @Required() @QueryParams("email") email: string): Promise<PlatformResponse<AlmondUser>> {
        try{
            const data = await this.userService.getUserByEmail(`${email}`)
            let message = `user fetched successfully`
            if(data === null || data === undefined){
                message = `user with ${email} does not exist`
            }
            return response.body(ResponseWrapper.SuccessResponse(`${message}`,data))
        }catch (e:any){
           const data = null
            this.log.error(`${e.message} : ${e.stack}` )
            return response.body(ResponseWrapper.FailResponse(`An error occurred ${e.message}`,data))
        }
    }

    @Get('/')
    @Summary("This endpoint loads users from Almond Backend system")
    @Description("Return all users")
    async getAllUsers(@Res() response: PlatformResponse) {
        try{
            const users = await this.userService.getAllUsersFromAlmond()
            return response.body(ResponseWrapper.SuccessResponse(`Fetched Successfully`, users))
        } catch (e: any){
            const data = null
            return response.body(ResponseWrapper.FailResponse(`Failed to load users ${e.message}`, data))
        }
    }
}
