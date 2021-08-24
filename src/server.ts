import {
    Configuration,
    Inject,
    PlatformAcceptMimesMiddleware,
    PlatformApplication
} from "@tsed/common";
import * as bodyParser from "body-parser";
import * as compress from "compression";
import * as cookieParser from "cookie-parser";
import * as methodOverride from "method-override";
import "@tsed/mongoose";
import "@tsed/ajv";
import {CustomResponseFilter} from "./utils/ResponseFilter";
import * as cors from "cors";
import {SwaggerModule} from "@tsed/swagger";
import {mongooseConfig} from "./configs/mongo";
import {swaggerConfig} from "./configs/swagger";

const rootDir = __dirname;

@Configuration({
    rootDir,
    acceptMimes: ["application/json"],
    httpPort: process.env.PORT || 3000,
    httpsPort: false, // CHANGE
    componentsScan: [
        `${rootDir}/services/**/**.ts`,
        `${rootDir}/middlewares/**/**.ts`
    ],
    responseFilters: [
        CustomResponseFilter
    ],
    mount: {
        "/api": [
            `${rootDir}/controllers/**/*.ts`
        ],
        "/api/v0": [ // versioning
            `${rootDir}/controllers/v0/users/*.js`,
            `!${rootDir}/controllers/v0/groups/old/*.ts` // Exclusion
        ]
    },
    ajv: {
        errorFormatter: (error) => ` Model: ->  ${error.modelName} \n Parameter -> ${error.params} \n Error -> ${error.data} \n Message -> ${error.message}`,
        verbose: false
    },
    swagger: swaggerConfig,
    mongoose: mongooseConfig,
    imports: [SwaggerModule]
})

export class Server{
    @Inject()
    app: PlatformApplication;

    @Configuration()
    settings: Configuration;

    /**
     * This method let you configure the express middleware required by your application to works.
     * @returns {Server}
     */
    public $beforeRoutesInit(): void | Promise<any> {
        this.app
            .use(cors())
            .use(PlatformAcceptMimesMiddleware)
            .use(cookieParser())
            .use(compress({}))
            .use(methodOverride())
            .use(bodyParser.json())
            .use(bodyParser.urlencoded({
                extended: true
            }));

        return null;
    }
}
