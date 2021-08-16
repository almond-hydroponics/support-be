
import {PlatformExpress} from "@tsed/platform-express";
import {Server} from "./server";
import {LoggerService} from "./services/LoggerService";
const log = new LoggerService("ServerBootstrap")
async function bootstrap() {
    try {
        log.debug("Start server...");
        const platform = await PlatformExpress.bootstrap(Server, {
            // extra settings
        });
        await platform.listen();
        log.debug("Server initialized");
    } catch (er) {
        log.error(er);
    }
}

bootstrap().then(r => console.log('done bootstrapping'));
