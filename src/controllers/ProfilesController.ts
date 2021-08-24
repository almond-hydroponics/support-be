import {BodyParams, Controller, Delete, Get, Inject, PlatformResponse, Post, QueryParams, Res} from "@tsed/common";
import {LoggerService} from "../services/LoggerService";
import {Name, Required} from "@tsed/schema";
import {UserModel} from "../models/UserModel";
import {ProfileService} from "../services/ProfileService";
import {ResponseWrapper} from "../utils/ResponseWrapper";

@Controller('/profile')
@Name('Profiles Controller')
export class ProfilesController {
    log = new LoggerService("ProfileController")

    @Inject()
    userService: ProfileService

    @Post('/createUpdate')
    async createOrUpdateProfile(@Res() response: PlatformResponse, @BodyParams() userModel: UserModel){
        try{
            const profile = await this.userService.createProfile(userModel).then((data) => {
                return JSON.stringify(data)
            })
            return response.body(ResponseWrapper.SuccessResponse(`Operation was Successful`,profile))
        }
        catch (e) {
            return response.body(ResponseWrapper.FailResponse(`There was an error creating the record`, e.message))
        }
    }

    @Get("/profiles")
    async getProfiles(@Res() response: PlatformResponse){
        try{
            const profiles = await this.userService.findAllProfiles()
            return response.body(ResponseWrapper.SuccessResponse(`Records fetched successfully`,profiles))
        }catch (e: any){
            return response.body(ResponseWrapper.SuccessResponse(`Failed to fetch`,e.message))
        }
    }

    @Get("/getProfile")
    async findProfileById(@Res() response: PlatformResponse, @Required() @QueryParams('_id') _id: string){
        try{
            const profiles = await this.userService.findById(_id)
            return response.body(ResponseWrapper.SuccessResponse(`Record fetched successfully`,profiles))
        }catch (e: any){
            return response.body(ResponseWrapper.SuccessResponse(`Failed to fetch records for id ${_id}`,e.message))
        }
    }

    @Delete('/deleteProfile')
    async deleteProfile(@Res() response: PlatformResponse, @Required() @QueryParams('_id') _id: string){
        try{
            const profiles = await this.userService.delete(_id)
            return response.body(ResponseWrapper.SuccessResponse(`Record deleted successfully`,profiles))
        }catch (e: any){
            return response.body(ResponseWrapper.SuccessResponse(`Failed to delete profile with id ${_id}`,e.message))
        }
    }
}
