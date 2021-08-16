import {Configuration, Inject, PlatformApplication} from "@tsed/common";
import * as bodyParser from "body-parser";
import * as compress from "compression";
import * as cookieParser from "cookie-parser";
import * as methodOverride from "method-override";
import "@tsed/mongoose";
import "@tsed/ajv";
import {CustomResponseFilter} from "./ResponseFilter";

const rootDir = __dirname;

@Configuration({
    rootDir,
    acceptMimes: ["application/json"],
    httpPort: "127.0.0.1:8081",
    httpsPort: "127.0.0.1:8082",
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
        errorFormatter: (error) => `At ${error.modelName}${error.params}, value '${error.data}' ${error.message}`,
        verbose: true
    },
    mongoose: [
        {
            id: "almond", // Recommended: define default connection. All models without dbName will be assigned to this connection
            url: "mongodb://127.0.0.1:27017/almond",
            connectionOptions: {
                useNewUrlParser: true,
                useUnifiedTopology: true,
                useCreateIndex: true,
            }
        }
    ]
})
export class Server {
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
            .use(cookieParser())
            .use(compress({}))
            .use(methodOverride())
            .use(bodyParser.json())
            .use(bodyParser.urlencoded({
                extended: true
            }));
    }
}
