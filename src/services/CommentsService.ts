import { Inject } from '@tsed/common';
import { Injectable } from '@tsed/di';
import { Exception } from '@tsed/exceptions';
import { LoggerService } from './LoggerService';
import { CommentsRepository } from '../repositories/CommentsRepository';
import { CommentsModel } from '../models/CommentsModel';
import { Comments } from '../entities/Comment';
import { Ticket } from '../entities/Ticket';
import { TicketService } from './TicketService';
import { Statuses } from '../enums/Statuses';
import { ProfileService } from './ProfileService';

@Injectable()
export class CommentsService {
	log = new LoggerService('Comments Service');

	@Inject() private commentsRepo: CommentsRepository;

	@Inject() private ticketService: TicketService;

	@Inject() private profile: ProfileService;

	async createOrUpdateComment(cm: CommentsModel): Promise<CommentsModel> {
		const r: Comments = JSON.parse(JSON.stringify(cm));
		const ticket: Ticket = await this.ticketService.findByTicketId(cm.ticketId);
		await this.profile.findById(cm.userId).then((user) => {
			if (!user) throw new Exception(200, 'User does not exist');
		});

		if (ticket.status === Statuses.DONE) {
			throw new Exception(
				200,
				`Ticket no ${ticket.ticketNo} has been closed and done`
			);
		}
		if (!ticket) {
			throw new Exception(200, 'The following ticket is not available');
		}
		return await this.commentsRepo
			.createOrUpdateComment(r)
			.then((data) => data);
	}

	async findCommentByTicketId(userId): Promise<CommentsModel> {
		const cm = await this.commentsRepo
			.findCommentByTicketId(userId)
			.then((data) => data);
		return JSON.parse(JSON.stringify(cm));
	}

	async deleteComment(commentId: string): Promise<void> {
		const cm = await this.commentsRepo
			.deleteComment(commentId)
			.then((data) => data);
		return JSON.parse(JSON.stringify(cm));
	}
}
