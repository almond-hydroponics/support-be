const mongooseTest = {
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
};

const testTimeOut = () => {
	return jest.setTimeout(100000);
};

export { mongooseTest, testTimeOut };
