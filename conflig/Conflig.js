import dotenv from "dotenv";

dotenv.config();

export const conflig = {
    dbName: process.env.HDUONG_SERVER_DBNAME,
    host: process.env.HDUONG_SERVER_HOSTDB,
    port: process.env.HDUONG_SERVER_PORTDB,
    user: process.env.HDUONG_SERVER_USERDB,
    password: process.env.HDUONG_SERVER_PASSWORDDB,
    portNode: process.env.HDUONG_SERVER_PORTNODE
};

export default conflig;