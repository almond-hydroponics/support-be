import { PlatformTest } from '@tsed/common';
import * as SuperTest from 'supertest';
import { when } from 'jest-when';
import { Server } from '../../server';
import { mongooseTest, timeOut } from '../test_configs/config';

timeOut();
describe('User controller test', () => {
	beforeAll(() => {
		PlatformTest.create();
	});
	let request: any;
	beforeAll(PlatformTest.bootstrap(Server, mongooseTest));
	beforeAll(() => {
		request = SuperTest.agent(PlatformTest.callback());
	});
	afterAll(PlatformTest.reset);

	describe('GET /users/user', () => {
		it('should return bad request if not loaded with user email', async () => {
			const fn = jest.fn();
			when(fn).calledWith(1).mockReturnValue('yay!');
			const response = await request.get('/api/users/user').expect(400);
			console.log(JSON.stringify(response));
			expect(typeof response.body).toEqual('object');
		});
	});

	describe('GET /users/user', () => {
		it('should successfully return results on querying endpoint ', async () => {
			const response = await request
				.get('/api/users/user?email=test@gmail.com')
				.expect(200);
			console.log(JSON.stringify(response));
			expect(typeof response.body).toEqual('object');
		});
	});

	describe('GET /users/', () => {
		it('should load users from Almond Backend system', async () => {
			const response = await request.get('/api/users/').expect(200);
			console.log(JSON.stringify(response));
			expect(typeof response.body).toEqual('object');
		});
	});
});
