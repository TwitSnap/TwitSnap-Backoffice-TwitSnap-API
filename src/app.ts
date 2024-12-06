import "reflect-metadata";
import express from "express";
import router from "./api/routes/routes";
import {errorMiddleware} from "./api/errors/handling/ErrorHandler";
import {logger} from "./utils/container/container";
import {PORT} from "./utils/config";
import swaggerUi from "swagger-ui-express";
import swaggerDocument from './utils/swagger/docs/swaggerDocs.json';

const app = express();

app.use(express.json());
app.use(router)
app.use(errorMiddleware);

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.listen(PORT, () => { logger.logInfo(`Server is running on port ${PORT}`); });