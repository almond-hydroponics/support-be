import { Injectable } from '@tsed/di';
import { Inject } from '@tsed/common';
import { BadRequest, Exception, NotFound } from '@tsed/exceptions';
import { Types, ObjectId } from 'mongoose';
import * as mongoose from 'mongoose';
import { ObjectID } from '@tsed/mongoose';
import { ProfileRepository } from '../repositories/ProfileRepository';
import { UserModel } from '../models/UserModel';
import { User } from '../entities/User';
import { LoggerService } from './LoggerService';
import { Role } from '../entities/Role';
import { RolesRepository } from '../repositories/RolesRepository';

@Injectable()
export class ProfileService {
	log = new LoggerService('Profile Service');

	constructor(
		@Inject() private profileRepository: ProfileRepository,
		@Inject() private roleRepo: RolesRepository
	) {}

	async createProfile(profile: UserModel): Promise<UserModel> {
		const user: User = JSON.parse(JSON.stringify(profile));
		const roles = Array.from(user.roles);

		for (const i in roles) {
			const role = await this.roleRepo.findRoleById(roles[i]);
			if (!role) {
				throw new Exception(
					200,
					'Selected Role does not exist. Please create and select it on profile creation'
				);
			}
		}

		return await this.profileRepository
			.createOrUpdateProfile(user)
			.then(() => profile);
	}

	async findAllProfiles(): Promise<UserModel[]> {
		const profiles = await this.profileRepository
			.findProfiles()
			.then((data) => {
				this.log.error(` ===> log${data}`);
				return data;
			});
		return JSON.parse(JSON.stringify(profiles));
	}

	async findById(_id: string): Promise<UserModel> {
		const profile = await this.profileRepository
			.findProfileById(_id)
			.then((data) => data);
		return JSON.parse(JSON.stringify(profile));
	}

	async delete(_id: string): Promise<void> {
		const profile = await this.profileRepository
			.deleteProfile(_id)
			.then((data) => data);
		return JSON.parse(JSON.stringify(profile));
	}
}
