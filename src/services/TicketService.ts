import {Inject} from "@tsed/common";
import {LoggerService} from "./LoggerService";
import {Injectable} from "@tsed/di";
import {TicketsRepository} from "../repositories/TicketsRepository";
import {Ticket} from "../entities/Ticket";
import {TicketModel} from "../models/TicketModel";
import {ProfileService} from "./ProfileService";
import {RoleService} from "./RoleService";
import {AccessCategoryEnum} from "../enums/AccessCategoryEnum";
import {Exception} from "@tsed/exceptions";

@Injectable()
export class TicketService {
    log = new LoggerService("TicketService")

    constructor(
        @Inject() private ticketRepository: TicketsRepository,
        @Inject() private profileService: ProfileService,
        @Inject() private roleService: RoleService,
    ) {}

    async createOrUpdateTicket(ticket: TicketModel) : Promise<TicketModel>{
        const t: Ticket = JSON.parse(JSON.stringify(ticket))

        if(t.linkedIssueId)
            await this.ticketRepository.findByTicketById(t.linkedIssueId);

        await this.profileService.findById(t.userId);
        await this.profileService.findById(t.assigneeId).then(async (data) => {
            for(let r in data.roles){
                const role = await this.roleService.findById(data.roles[r])
                if(role.resourceAccessLevels[0].category === AccessCategoryEnum.CLIENT)
                    throw new Exception(200, `You cannot assign this issue to selected user `)
            }
        })
        return await this.ticketRepository.createOrUpdateTicket(t).then((data) => {
            return data
        })
    }

    async findTickets() : Promise<TicketModel[]>{
        return await this.ticketRepository.findTickets().then((data) => {
            return data
        })
    }

    async findByTicketNumber(ticketNo) : Promise<TicketModel>{
        return await this.ticketRepository.findByTicketNumber(ticketNo).then((data) => {
            return data
        })
    }

    async findByTicketId(_id) : Promise<TicketModel>{
        return await this.ticketRepository.findByTicketById(_id).then((data) => {
            return data
        })
    }

    async deleteTicket(_id: string){
        return await this.ticketRepository.deleteTicket(_id).then((data) => {
            return data
        })
    }
}
