import {LoggerService} from "../services/LoggerService";
import {BodyParams, Controller, Delete, Get, Inject, PlatformResponse, Post, QueryParams, Res} from "@tsed/common";
import {ResponseWrapper} from "../utils/ResponseWrapper";
import {Name, Required} from "@tsed/schema";
import {RoleService} from "../services/RoleService";
import {RolesModel} from "../models/RolesModel";
import {Ticket} from "../entities/Ticket";
import {TicketService} from "../services/TicketService";

@Controller('/ticket')
@Name('Tickets Controller')
export class TicketsController {
    log = new LoggerService("TicketsController")

    @Inject()
    ticket: TicketService

    @Post('/createUpdateTicket')
    async createOrUpdateTicket(@Res() response: PlatformResponse, @BodyParams() ticket: Ticket){
        try{
            const tickets = await this.ticket.createOrUpdateTicket(ticket).then((data) => {
                return JSON.stringify(data)
            })
            return response.body(ResponseWrapper.SuccessResponse(`Record Created Successfully`,ticket))
        }catch (e) {
            return response.body(ResponseWrapper.FailResponse(`There was an error creating the record. Details:`, e.message))
        }

    }

    @Get("/tickets")
    async getTickets(@Res() response: PlatformResponse){
        try{
            const tickets = await this.ticket.findTickets()
            return response.body(ResponseWrapper.SuccessResponse(`Records fetched successfully`,tickets))
        }catch (e: any){
            return response.body(ResponseWrapper.FailResponse(`Failed to fetch`,e.message))
        }
    }

    @Get("/getTicket")
    async findTicketById(@Res() response: PlatformResponse, @Required() @QueryParams('ticketNumber') ticketNumber: string){
        try{
            const ticket = await this.ticket.findByTicketNumber(ticketNumber)
            return response.body(ResponseWrapper.SuccessResponse(`Record fetched successfully`,ticket))
        }catch (e: any){
            return response.body(ResponseWrapper.FailResponse(`Failed to fetch records for id ${ticketNumber}`,e.message))
        }
    }

    @Delete('/deleteTicket')
    async deleteTicket(@Res() response: PlatformResponse, @Required() @QueryParams('_id') _id: string){
        try{
            const ticket = await this.ticket.deleteTicket(_id)
            return response.body(ResponseWrapper.SuccessResponse(`Record deleted successfully`,ticket))
        }catch (e: any){
            return response.body(ResponseWrapper.FailResponse(`Failed to delete profile with id ${_id}`,e.message))
        }
    }
}