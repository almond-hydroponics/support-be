const mongooseConfig = [
    {
        id: "almond", // Recommended: define default connection. All models without dbName will be assigned to this connection
        url: "mongodb://127.0.0.1:27017/almond",
        connectionOptions: {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true,
        }
    },
    {
        id: "default", // Recommended: define default connection. All models without dbName will be assigned to this connection
        url: "mongodb://127.0.0.1:27017/support",
        connectionOptions: {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true,
        }
    }
]

export {
    mongooseConfig
}
