import mongoose from "mongoose";
import myLogger from "../winstonLog/winston.js";
import {BAD_REQUEST, CREATED, NO_CONTENT, OK} from "../constant/HttpResponeCode.js";
import conflig from "../conflig/Conflig.js";

const {dbName, host, port, user, password, portNode} = conflig;
// const dbUrl = `mongodb://${user}:${password}@${host}:${port}/${dbName}?serverSelectionTimeoutMS=5000&connectTimeoutMS=10000&authSource=${dbName}&authMechanism=SCRAM-SHA-256`;
// const dbUrl = `mongodb://${user}:${password}@${host}:${port}/${dbName}`;

const dbUrl = `mongodb://${user}:${password}@${host}:${port}/${dbName}?retryWrites=true&serverSelectionTimeoutMS=5000&connectTimeoutMS=10000&authSource=sales&authMechanism=SCRAM-SHA-256`

export async function connect() {
    try {
        await mongoose.connect(dbUrl, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
    } catch (e) {
        myLogger.error("Connect to the database failed", e);
        throw e;
    }
};

export async function handelRespone(data, request, respone, next) {
    const statusCode = data.statusCode;
    const {method, url} = request;
    if (statusCode !== OK && statusCode !== CREATED && statusCode !== NO_CONTENT) {
        respone.status(statusCode || BAD_REQUEST).send({
            code: statusCode,
            error: data.data ? data.data : data.error,
            description: data.description
        });
    } else {
        respone.status(statusCode).send(data.data);
    }
};

export async function listener() {
    myLogger.info(`Listening on port ${portNode}`);
};