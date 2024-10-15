import dotenv from 'dotenv';
import { Helpers } from "./helpers";

dotenv.config();

const requiredEnvVars = [
    "LOG_ROUTE", "LOGGING",
    "LOG_ERROR", "LOG_DEBUG", "LOG_INFO", "PORT"
];

Helpers.validateEnvVarsList(requiredEnvVars);

// ? Server config
export const PORT = process.env.PORT;

// ? Logger config
export const LOG_ROUTE = process.env.LOG_ROUTE;
export const LOGGING = process.env.LOGGING;
export const LOG_ERROR = process.env.LOG_ERROR;
export const LOG_DEBUG = process.env.LOG_DEBUG;
export const LOG_INFO = process.env.LOG_INFO;

// ? Other microservices info
