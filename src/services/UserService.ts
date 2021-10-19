import { Injectable } from '@tsed/di';
import { Inject } from '@tsed/common';
import { AlmondUser } from '../models/AlmondUser';
import { UserRepository } from '../repositories/UserRepository';

@Injectable()
export class UserService {
	@Inject() private userRepository: UserRepository;

	async getUserByEmail(email: string) {
		const list = await this.userRepository.findByEmail(email);
		return list[0];
	}

	async getAllUsersFromAlmond(): Promise<AlmondUser[]> {
		return await this.userRepository.findAll();
	}
}
