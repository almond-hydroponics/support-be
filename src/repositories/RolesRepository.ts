import { Inject } from '@tsed/common';
import { MongooseModel } from '@tsed/mongoose';
import { Exception } from '@tsed/exceptions';
import { Role } from '../entities/Role';
import { LoggerService } from '../services/LoggerService';

export class RolesRepository {
	log = new LoggerService('Roles Repository');

	@Inject(Role) private model: MongooseModel<Role>;

	async createOrUpdateRole(role: Role) {
		if (role._id !== undefined) {
			return await this.model.findByIdAndUpdate(role._id, role).exec();
		}
		return this.model.create(role);
	}

	async findRoles() {
		return await this.model.find({ isDeleted: false }).exec();
	}

	async findRoleById(_id) {
		const role = await this.model.findOne({ _id }).then();
		if (!role) throw new Exception(200, `Role ${_id} was not found`);
		return role;
	}

	async deleteRole(_id: string) {
		return await this.model
			.findByIdAndUpdate(_id, { isDeleted: true }, (err, model) => {
				if (err) {
					throw new Exception(200, 'Error encountered updating the role');
				}
				return model;
			})
			.exec();
	}
}
