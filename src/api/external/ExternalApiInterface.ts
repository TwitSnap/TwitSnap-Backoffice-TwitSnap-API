import {HttpRequester} from "./HttpRequester";
import {ExternalServiceInternalError} from "../../services/application/errors/ExternalServiceInternalError";
import {ExternalServiceConnectionError} from "../../services/application/errors/ExternalServiceConnectionError";
import {logger} from "../../utils/container/container";
import {ExternalServiceHTTPError} from "./ExternalServiceHTTPError";

export abstract class ExternalApiInterface {
    httpRequester: HttpRequester;

    protected constructor(httpRequester: HttpRequester){
        this.httpRequester = httpRequester;
    }

    /**
     * Handles errors related to the external HTTP request.
     * @param {any} e - The error object from the failed request.
     * @param {(status: number) => Error} responseStatusErrorHandler - The error handler for the response status.
     * @throws {Error} The generated error object.
     */
    protected standardErrorHandler = (e: any, responseStatusErrorHandler: ((status: number) => Error)): void => {
        let error;

        if(e.response){
            error = responseStatusErrorHandler(e.response.status);
        } else if(e.request){
            error = new ExternalServiceInternalError("Timeout while waiting for an external service.");
        } else {
            error = new ExternalServiceConnectionError("Error while connecting to an external service.")
        }

        logger.logErrorFromEntity(("Caught error: " + e.message), this.constructor);
        logger.logErrorFromEntity(("Throwing error: " + error.message), this.constructor);

        throw error;
    }

    /**
     * Generates an error based on the response status for an API call.
     *
     * @param status - The HTTP status code.
     * @param apiName - The name of the API that was called.
     * @returns The generated error object.
     */
    protected standardResponseStatusErrorHandler = (status: number, apiName: string): Error => {
        switch (status) {
            default:
                return new ExternalServiceHTTPError(`API Call ${apiName} has failed with status ${status}.`);
        }
    }
}