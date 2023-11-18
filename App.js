import express, { urlencoded } from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import api from "./routers/Index.js";
import { handelRespone, listener } from "./helper/Helper.js";
import conflig from "./conflig/Conflig.js";
import validate_api from "./middleware/Sanitization.js";

const app = express();

export const createApp = () => {
  const hostNode = "0.0.0.0";
  const portNode = conflig.portNode;
  app.use(cors());
  app.use(express.json());
  app.use(urlencoded({ extended: false }));
  app.use(cookieParser());
  app.use(validate_api, api);
  app.use((data, request, respone, next) => {
    handelRespone(data, request, respone, next);
  });

  app.listen(portNode, hostNode, listener);
};
