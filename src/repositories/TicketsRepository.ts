import { Inject } from '@tsed/common';
import { MongooseModel } from '@tsed/mongoose';
import { Exception } from '@tsed/exceptions';
import { LoggerService } from '../services/LoggerService';
import { Ticket } from '../entities/Ticket';

export class TicketsRepository {
	log = new LoggerService('Tickets Repository');

	constructor(
		@Inject(Ticket)
		private ticketModel: MongooseModel<Ticket>
	) {}

	async createOrUpdateTicket(ticket: Ticket) {
		if (ticket._id !== undefined) {
			return await this.ticketModel
				.findByIdAndUpdate(ticket._id, ticket)
				.exec();
		}
		return await this.ticketModel.create(ticket);
	}

	async findTickets() {
		return await this.ticketModel.find({ isDeleted: false }).exec();
	}

	async findByTicketNumber(ticketNo: string) {
		const ticket = await this.ticketModel
			.findOne({ ticketNo, isDeleted: false })
			.then();
		if (!ticket) throw new Exception(200, `Ticket ${ticketNo} was not found`);
		return ticket;
	}

	async findByTicketById(_id: string) {
		const ticket = await this.ticketModel
			.findOne({ _id, isDeleted: false })
			.then();
		if (!ticket) throw new Exception(200, `Ticket ${_id} was not found`);
		return ticket;
	}

	async deleteTicket(_id: string) {
		return await this.ticketModel
			.findByIdAndUpdate(_id, { isDeleted: true }, (err, doc) => {
				if (err) {
					throw new Exception(
						200,
						'There was an error performing the operation'
					);
				}
				this.log.debug(`User ticket to be deleted ${_id}`);
			})
			.exec();
	}
}
