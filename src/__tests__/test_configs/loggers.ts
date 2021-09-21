import { LoggerService } from '../../services/LoggerService';

const testLogger = (msg) => {
	const log = new LoggerService(`Integration Test Log`);
	return log.debug(`\n🧪 🧪 🧪 \n ${msg} \n🧪 🧪 🧪`);
};
export { testLogger };
