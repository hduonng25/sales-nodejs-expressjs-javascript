import appRoot from "app-root-path";
import winston from "winston";
import 'winston-daily-rotate-file';

const options = {
     file: {
          level: 'info',
          filename: `${appRoot}/logs/app.log`,
          handleExceptions: true,
          json: true,
          maxsize: 5242880, // 5MB
          colorize: false,
     },
     console: {
          level: 'debug',
          handleExceptions: true,
          json: false,
          colorize: true,
     },
};

const myLogger = new winston.createLogger({
     format: winston.format.combine(
          winston.format.splat(),
          winston.format.timestamp({
               format: "YYYY-MM-DD HH:mm:ss.SSS"
          }),
          winston.format.printf(info => `${info.timestamp} [${info.label === undefined ? "" : info.label}${info.funName === undefined ? "" : "-" + info.funName}] [${info.level}]: ${info.message}`)
     ),

     transports: [
          new winston.transports.DailyRotateFile({
               name: 'file',
               filename: `${appRoot}/logs/app.log`
          }),
          new winston.transports.Console(options.console)
     ],
     exitOnError: false,
});

myLogger.stream = {
     write: function (message, encoding) {

          myLogger.info(message);
     },
};

export default myLogger;