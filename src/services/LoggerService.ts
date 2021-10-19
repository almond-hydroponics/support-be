import { Logger } from '@tsed/common';

export class LoggerService {
	logger: Logger;

	constructor(name: string) {
		this.logger = new Logger(`${name}`);
		LoggerService.initializeLoggerChannel(this.logger);
	}

	info = (msg: string) => {
		this.logger.info(`${msg}`);
	};

	warn = (msg: string) => {
		this.logger.warn(`${msg}`);
	};

	error = (msg: string) => {
		this.logger.error(`${msg}`);
	};

	debug = (msg: string) => {
		this.logger.debug(`${msg}`);
	};

	private static initializeLoggerChannel(logger: Logger) {
		logger.appenders.set('std-log', {
			type: 'console',
			layout: {
				type: 'colored',
				pattern: '%d %p %c %x{user} %m%n',
				tokens: {
					user: (e) => `Mfuon ${e}`,
				},
			},
			level: ['debug', 'info', 'trace'],
		});
	}
}
