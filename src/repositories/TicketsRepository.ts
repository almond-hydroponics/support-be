import {Inject} from "@tsed/common";
import {MongooseModel} from "@tsed/mongoose";
import {LoggerService} from "../services/LoggerService";
import {Ticket} from "../entities/Ticket";
import {Exception} from "@tsed/exceptions";

export class TicketsRepository{

    log = new LoggerService("TicketsRepository")

    constructor(@Inject(Ticket)
                private ticketModel: MongooseModel<Ticket>) {
    }

    async createOrUpdateTicket(ticket: Ticket){
        if(ticket._id !== undefined){
            return this.ticketModel.findByIdAndUpdate(ticket._id, ticket);
        }else{
            return this.ticketModel.create(ticket);
        }
    }

    async findTickets(){
        return this.ticketModel.find({isDeleted: false}).exec()
    }

    async findByTicketNumber(ticketNo: string){
        const ticket = await this.ticketModel.findOne({ticketNo: ticketNo}).then()
        if(!ticket)
            throw new Exception(200,`Ticket ${ticketNo} was not found in the database`)
        return ticket
    }

    async findByTicketById(_id: string){
        const ticket = await this.ticketModel.findOne({_id: _id}).then()
        if(!ticket)
            throw new Exception(200,`Ticket ${_id} was not found in the database`)
        return ticket
    }

    async deleteTicket(_id: string){
        this.log.debug(`User ticket to be deleted ${_id}`)
        return this.ticketModel.findByIdAndDelete(_id).exec()
    }

}
