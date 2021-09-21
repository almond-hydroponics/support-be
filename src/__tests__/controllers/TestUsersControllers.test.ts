import { PlatformTest } from '@tsed/common';
import * as SuperTest from 'supertest';
import { when } from 'jest-when';
import { Server } from '../../server';

jest.setTimeout(100000);
describe('User controller will', () => {
	beforeAll(() => {
		PlatformTest.create();
	});
	let request: any;
	beforeAll(
		PlatformTest.bootstrap(Server, {
			mongoose: [
				{
					id: 'default',
					url: 'mongodb+srv://almond:qddZMQcYdgwQD7g@cluster0.cgxzl.mongodb.net/test',
					connectionOptions: {
						useNewUrlParser: true,
						useUnifiedTopology: true,
						useCreateIndex: true,
						useFindAndModify: false,
					},
				},
				{
					id: 'almond',
					url: 'mongodb+srv://almond:qddZMQcYdgwQD7g@cluster0.cgxzl.mongodb.net/test',
					connectionOptions: {
						useNewUrlParser: true,
						useUnifiedTopology: true,
						useCreateIndex: true,
						useFindAndModify: false,
					},
				},
			],
		})
	);
	beforeAll(() => {
		request = SuperTest.agent(PlatformTest.callback());
	});
	afterAll(PlatformTest.reset);

	describe('GET /users/user', () => {
		it('should should return bad request if not loaded with user email', async () => {
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
});
