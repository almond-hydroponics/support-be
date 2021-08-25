const mongooseConfig = [
    {
        id: "almond",
        url: "mongodb://127.0.0.1:27017/almond",
        connectionOptions: {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true,
            useFindAndModify: false
        }
    },
    {
        id: "default",
        url: "mongodb://127.0.0.1:27017/support",
        connectionOptions: {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true,
            useFindAndModify: false
        }
    }
]

export {
    mongooseConfig
}
