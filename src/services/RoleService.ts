import {Inject} from "@tsed/common";
import {RolesRepository} from "../repositories/RolesRepository";
import {RolesModel} from "../models/RolesModel";
import {Role} from "../entities/Role";
import {LoggerService} from "./LoggerService";
import {Injectable} from "@tsed/di";

@Injectable()
export class RoleService {
    log = new LoggerService("RoleService")

    constructor(@Inject() private roleRepository: RolesRepository) {}

    async createOrUpdateRole(role: RolesModel) : Promise<RolesModel>{
        const r: Role = JSON.parse(JSON.stringify(role))
        return await this.roleRepository.createOrUpdateRole(r).then(() => {
            return role
        })
    }

    async findRoles() : Promise<RolesModel[]>{
        const roles = await this.roleRepository.findRoles().then((data) => {
            return data
        })
        return JSON.parse(JSON.stringify(roles))
    }

    async findById(_id: string) : Promise<RolesModel>{
        const role = await this.roleRepository.findRoleById(_id).then((data) => {
            return data
        })
        return JSON.parse(JSON.stringify(role))
    }

    async deleteRole(_id: string) : Promise<void>{
        const role = await this.roleRepository.deleteRole(_id).then((data) => {
            return data
        })
        return JSON.parse(JSON.stringify(role))
    }
}
