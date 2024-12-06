import dotenv from 'dotenv';
import { Helpers } from "./helpers";

dotenv.config();

const requiredEnvVars = [
    "LOG_ROUTE", "LOGGING",
    "LOG_ERROR", "LOG_DEBUG", "LOG_INFO", "PORT",
    "TWITSNAP_URL", "BAN_USER_PATH", "GET_USER_PATH", "GET_USERS_PATH", "GET_METRICS_PATH",
    "BLOCK_TWEET_PATH", "GET_TWIT_PATH", "GET_TWEETS_PATH",
    "GET_SERVICE_PATH", "GET_SERVICES_PATH", "CHANGE_SERVICE_STATUS_PATH", "CREATE_SERVICE_PATH"
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
export const TWITSNAP_URL = process.env.TWITSNAP_URL as string;

export const BAN_USER_PATH = process.env.BAN_USER_PATH as string;
export const GET_USER_PATH = process.env.GET_USER_PATH as string;
export const GET_USERS_PATH = process.env.GET_USERS_PATH as string;
export const GET_METRICS_PATH = process.env.GET_METRICS_PATH as string;

export const BLOCK_TWEET_PATH = process.env.BLOCK_TWEET_PATH as string;
export const GET_TWIT_PATH = process.env.GET_TWIT_PATH as string;
export const GET_TWEETS_PATH = process.env.GET_TWEETS_PATH as string;

export const GET_SERVICE_PATH = process.env.GET_SERVICE_PATH as string;
export const GET_SERVICES_PATH = process.env.GET_SERVICES_PATH as string;
export const CHANGE_SERVICE_STATUS_PATH = process.env.CHANGE_SERVICE_STATUS_PATH as string;
export const CREATE_SERVICE_PATH = process.env.CREATE_SERVICE_PATH as string;
