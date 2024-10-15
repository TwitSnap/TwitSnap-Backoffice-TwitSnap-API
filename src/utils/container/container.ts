import { container } from "tsyringe";
import "reflect-metadata";
import {Logger} from "../logger/Logger";
import {Encrypter} from "../encrypter/Encrypter";
import {BcryptEncrypter} from "../encrypter/BcryptEncrypter";
import {LoggingStrategy} from "../logger/LoggingStrategy";
import {WinstonLoggerStrategy} from "../logger/WinstonLoggerStrategy";
import {LOGGING, LOG_DEBUG, LOG_ERROR, LOG_INFO} from "../config";

// ? Register all dependencies
container.registerSingleton<Encrypter>("Encrypter", BcryptEncrypter);

container.register<LoggingStrategy>("LoggingStrategy", { useClass: WinstonLoggerStrategy});
container.register<boolean>("logging", {useValue: (LOGGING === "true") });
container.register<boolean>("logDebug", {useValue: (LOG_DEBUG === "true") });
container.register<boolean>("logError", {useValue: (LOG_ERROR === "true") });
container.register<boolean>("logInfo", {useValue: (LOG_INFO === "true") });

// ? Get instances
export const logger = container.resolve(Logger);