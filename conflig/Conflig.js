import dotenv from "dotenv";

dotenv.config();
export const conflig = {
    dbName: process.env.DBNAME,
    host: process.env.HOSTDB,
    port: process.env.PORTDB,
    user: process.env.USERDB,
    password: process.env.PASSWORDDB,
    portNode: process.env.PORTNODE
};

export default conflig;