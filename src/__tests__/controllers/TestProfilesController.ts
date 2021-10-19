
import { mongooseTest, testTimeOut } from '../test_configs/config';
import { PlatformTest } from '@tsed/common';
import { Server } from '../../server';
import * as SuperTest from 'supertest';
import { createProfileTestData } from '../test_configs/commons';
import { testLogger } from '../test_configs/loggers';

testTimeOut();
describe('Profiles controller test', () => {
	beforeAll(() => {
		PlatformTest.create();
	});
	let request: any;
	beforeAll(PlatformTest.bootstrap(Server, mongooseTest));
	beforeAll(() => {
		request = SuperTest.agent(PlatformTest.callback());
	});
	afterAll(PlatformTest.reset);

	describe('POST createOrUpdate profiles', () => {
		it('should should assert that creating or updating user works', async () => {
			const response = await request
				.post('/api/profile/createUpdate')
				.send(createProfileTestData)
				.expect(200);
			testLogger(JSON.stringify(response));
			expect(typeof response.body).toEqual('object');
		});
	});

	describe('GET one profile', () => {
		it('should successfully return one profile ', async () => {
			const response = await request
				.get('/api/profile/getProfile?_id=id')
				.expect(200);
			testLogger(JSON.stringify(response));
			expect(typeof response.body).toEqual('object');
		});
	});

	describe('delete one profile', () => {
		it('should successfully delete one profile ', async () => {
			const response = await request
				.delete('/api/profile/deleteProfile?_id=611e65b10d629e38fe2efe3b')
				.expect(200);
			testLogger(JSON.stringify(response));
			expect(typeof response.body).toEqual('object');
		});
	});

	describe('GET profiles', () => {
		it('should successfully return a list of profiles ', async () => {
			const response = await request.get('/api/profile/profiles').expect(200);
			testLogger(JSON.stringify(response));
			expect(typeof response.body).toEqual('object');
		});
	});
});
