import { PlatformResponse, PlatformTest } from '@tsed/common';
import * as SuperTest from 'supertest';
import { Server } from '../../server';
import {
	Configuration,
	Inject,
	PlatformAcceptMimesMiddleware,
	PlatformApplication,
} from '@tsed/common';
import { UsersController } from '../../controllers/UsersController';
import { UserService } from '../../services/UserService';
import any = jasmine.any;

// describe("Rest", () => {
//   // bootstrap your Server to load all endpoints before run your test
//     beforeAll(async () => {
//       await PlatformTest.create()
//       await PlatformTest.invoke(UsersController, [])
//     })
//
//   let request: SuperTest.SuperTest<SuperTest.Test>;
//
//   beforeAll(PlatformTest.bootstrap(Server));
//   beforeAll(() => {
//     request = SuperTest(PlatformTest.callback());
//   });
//   afterAll(PlatformTest.reset);
//
//   describe("GET /users/user", () => {
//     it("should do something", async () => {
//       const response = await request.get("/users/user").expect(200);
//       expect(typeof response.body).toEqual("array");
//     });
//   });
// });

// describe("Rest", () => {
//   jest.setTimeout(100000);
//   // bootstrap your Server to load all endpoints before run your test
//   let request: SuperTest.SuperTest<SuperTest.Test>;
//   beforeAll(PlatformTest.bootstrap(Server));
//   beforeAll(() => {
//     PlatformTest.invoke(UsersController, [])
//     request = SuperTest(PlatformTest.callback());
//   });
//   afterAll(PlatformTest.reset);
//
//   describe("GET /users/user", () => {
//     it("should do something", async () => {
//       const response = await request.get("/users/user")
//       expect(typeof response.body).toEqual("object");
//     });
//   });
// });

// describe("MyCtrl", () => {
//   // bootstrap your Server to load all endpoints before run your test
//   beforeEach(PlatformTest.create);
//   afterEach(PlatformTest.reset);
//
//   it("should do something", async () => {
//     const locals = [
//       {
//         token: UserService,
//         use: {
//           getUserByEmail: () => {
//             return "test";
//           }
//         }
//       }
//     ];
//
//     // give the locals map to the invoke method
//     const instance: UsersController = await PlatformTest.invoke(UsersController, locals);
//
//     // and test it
//     expect(!!instance).toEqual(true);
//     expect(instance.getUserByEmail()).toEqual("test");
//   });
// });

const rootDir = __dirname;

describe(`User controller will`, () => {
	beforeAll(async () => {
		await PlatformTest.create();
		await PlatformTest.invoke(UsersController, []);
	});
	let request: any;
	beforeAll(PlatformTest.bootstrap(Server, Configuration));
	beforeAll(() => {
		request = SuperTest.agent(PlatformTest.callback());
	});
	afterAll(PlatformTest.reset);

	describe('GET /users/user', () => {
		it('should should return bad request if not loaded with user email', async () => {
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
