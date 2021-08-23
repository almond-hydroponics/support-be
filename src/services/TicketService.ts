import {Inject} from "@tsed/common";
import {LoggerService} from "./LoggerService";
import {Injectable} from "@tsed/di";
import {TicketsRepository} from "../repositories/TicketsRepository";
import {Ticket} from "../entities/Ticket";

@Injectable()
export class TicketService {
    log = new LoggerService("TicketService")

    constructor(@Inject() private ticketRepository: TicketsRepository) {}

    async createOrUpdateTicket(ticket: Ticket) : Promise<Ticket>{
        return await this.ticketRepository.createOrUpdateTicket(ticket).then((data) => {
            return data
        })
    }

    async findTickets() : Promise<Ticket[]>{
        return await this.ticketRepository.findTickets().then((data) => {
            return data
        })
    }

    async findByTicketNumber(ticketNo) : Promise<Ticket>{
        return await this.ticketRepository.findByTicketNumber(ticketNo).then((data) => {
            return data
        })
    }

    async findByTicketId(_id) : Promise<Ticket>{
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
