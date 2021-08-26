import { SwaggerSettings } from '@tsed/swagger';

const swaggerConfig: SwaggerSettings[] = [
	{
		path: '/api-docs',
		specVersion: '3.0.3',
		cssPath: './src/themes/material-theme.css',
		spec: {
			info: {
				contact: {
					name: 'API Support',
					url: 'http://www.example.com/support',
					email: 'support@example.com',
				},
				license: {
					name: 'Apache 2.0',
					url: 'https://www.apache.org/licenses/LICENSE-2.0.html',
				},
				version: '1.0.0',
				title: 'Almond Support API',
				description:
					'This is an API that supports the customer support on Almond hydroponics system',
			},
			servers: [
				{
					url: 'http://0.0.0.0:3000/',
					description: 'Development server',
				},
				{
					url: 'https://staging',
					description: 'Staging server',
				},
				{
					url: 'https://api.prod',
					description: 'Production server',
				},
			],
		},
	},
];

export { swaggerConfig };
