import { mongooseTest, testTimeOut } from '../test_configs/config';
import { PlatformTest } from '@tsed/common';
import { Server } from '../../server';
import * as SuperTest from 'supertest';
import { createCommentTestData } from '../test_configs/commons';
import { testLogger } from '../test_configs/loggers';

testTimeOut();
describe('Comments controller test', () => {
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
		it('should should assert that creating or updating comment works', async () => {
			const response = await request
				.post('/api/comment/createUpdateComment')
				.send(createCommentTestData)
				.expect(200);
			testLogger(JSON.stringify(response));
			expect(typeof response.body).toEqual('object');
		});
	});

	describe('get one comment', () => {
		it('should successfully return comments belonging to a ticket ', async () => {
			const response = await request
				.get('/api/comment/commentByTicketId?ticketId=id')
				.expect(200);
			testLogger(JSON.stringify(response));
			expect(typeof response.body).toEqual('object');
		});
	});

	describe('delete one comment', () => {
		it('should successfully delete one comment ', async () => {
			const response = await request
				.delete('/api/comment/deleteComment?commentId=611e65b10d629e38fe2efe3b')
				.expect(200);
			testLogger(JSON.stringify(response));
			expect(typeof response.body).toEqual('object');
		});
	});
});
