
import {PlatformExpress} from "@tsed/platform-express";
import {Server} from "./server";
import {LoggerService} from "./services/LoggerService";
const log = new LoggerService("Server Configs")
async function bootstrap() {
    try {
        log.info("===> Starting server...!");
        log.info("===> Initialising...!");
        const platform = await PlatformExpress.bootstrap(Server, {});
        await platform.listen().then(() => {
            log.info("===> Initialising Done!");
        });
    } catch (er) {
        log.error("===> Failed to start Server...!");
        log.error(er);
    }
}

bootstrap().then(() => {
    log.info("===> Server Configurations loaded successfully !");
});
