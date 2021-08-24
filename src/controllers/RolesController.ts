import {LoggerService} from "../services/LoggerService";
import {BodyParams, Controller, Delete, Get, Inject, PlatformResponse, Post, QueryParams, Res} from "@tsed/common";
import {ResponseWrapper} from "../utils/ResponseWrapper";
import {Name, Required} from "@tsed/schema";
import {RoleService} from "../services/RoleService";
import {RolesModel} from "../models/RolesModel";

@Controller('/role')
@Name('Roles Controller')
export class RolesController {
    log = new LoggerService("RolesController")

    @Inject()
    roleService: RoleService

    @Post('/createUpdate')
    async createOrUpdateRole(@Res() response: PlatformResponse, @BodyParams() roleModel: RolesModel){
        try{
            const role = await this.roleService.createOrUpdateRole(roleModel).then((data) => {
                return JSON.stringify(data)
            })
            return response.body(ResponseWrapper.SuccessResponse(`Operation was Successful`,role))
        }catch (e) {
            return response.body(ResponseWrapper.FailResponse(`There was an error creating the record. Details:`, e.message))
        }

    }

    @Get("/roles")
    async getRoles(@Res() response: PlatformResponse){
        try{
            const roles = await this.roleService.findRoles()
            return response.body(ResponseWrapper.SuccessResponse(`Records fetched successfully`,roles))
        }catch (e: any){
            return response.body(ResponseWrapper.FailResponse(`Failed to fetch`,e.message))
        }
    }

    @Get("/getRole")
    async findRoleById(@Res() response: PlatformResponse, @Required() @QueryParams('_id') _id: string){
        try{
            const role = await this.roleService.findById(_id)
            return response.body(ResponseWrapper.SuccessResponse(`Record fetched successfully`,role))
        }catch (e: any){
            return response.body(ResponseWrapper.FailResponse(`Failed to fetch records for id ${_id}`,e.message))
        }
    }

    @Delete('/deleteRole')
    async deleteRole(@Res() response: PlatformResponse, @Required() @QueryParams('_id') _id: string){
        try{
            const role = await this.roleService.deleteRole(_id)
            return response.body(ResponseWrapper.SuccessResponse(`Record deleted successfully`,role))
        }catch (e: any){
            return response.body(ResponseWrapper.FailResponse(`Failed to delete profile with id ${_id}`,e.message))
        }
    }
}
