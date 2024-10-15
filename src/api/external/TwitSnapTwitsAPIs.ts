import {HttpRequester} from "./HttpRequester";
import {ExternalApiInterface} from "./ExternalApiInterface";
import {AxiosResponse} from "axios";

export class TwitSnapTwitsAPIs extends ExternalApiInterface{
    constructor(httpRequester: HttpRequester){
        super(httpRequester);
    }

    /**
     * Get twits from the external service.
     *
     * @param offset - The offset for the twits.
     * @param limit - The limit for the twits.
     * @param userId - The user id.
     */
    public async getTwits(offset: string, limit: string, userId: string): Promise<any> {
        const url = "url/" + "endpoint/" + "?offset=" + offset + "&limit=" + limit + "&userId=" + userId;

        //TODO Pendiente hacer la extract function de esto
        return await this.httpRequester.getToUrl(url, undefined, this.getTwitsErrorHandler, this.getTwitsExtractor);
    }

    /**
     * Get a twit from the external service.
     *
     * @param twitId - The twit id.
     */
    public async getTwit(twitId: string): Promise<any> {
        const url = "url/" + "endpoint/" + twitId;

        return await this.httpRequester.getToUrl(url, undefined, this.getTwitErrorHandler, this.getTwitExtractor);
    }

    /**
     * Block or unblock a twit from the external service.
     *
     * @param twitId - The twit id.
     */
    public async blockOrUnblockTwit(twitId: string): Promise<void> {
        const url = "url" + "endpoint";

        const data = {
            twitId: twitId,
        }

        await this.httpRequester.postToUrl(url, data, this.blockOrUnblockTwitErrorHandler);
    }

    private getTwitExtractor = (response: void | AxiosResponse<any, any>): any => {
        //TODO. Ajustar tambien el tipo de dato del return
    }

    private getTwitsExtractor = (response: void | AxiosResponse<any, any>): any => {
        //TODO. Ajustar tambien el tipo de dato del return
    }

    /**
     * Only for operation: blockOrUnblockTwit
     *
     * Handles errors related to the external HTTP request.
     * @param {any} e - The error object from the failed request.
     * @throws {ExternalServiceHTTPError} If the request returned an unexpected status code.
     */
    private blockOrUnblockTwitErrorHandler = (e: any): void => {
        this.standardErrorHandler(e, this.blockOrUnblockTwitResponseStatusErrorHandler);
    }

    /**
     * Only for operation: blockOrUnblockTwit
     *
     * Generates an error based on the response status for blockOrUnblockTwit.
     *
     * @param {number} status - The HTTP status code.
     * @returns {Error} The generated error object.
     */
    private blockOrUnblockTwitResponseStatusErrorHandler = (status: number): Error => {
        return this.standardResponseStatusErrorHandler(status, "blockOrUnblockTwit");
    }

    /**
     * Only for operation: getTwits
     *
     * Handles errors related to the external HTTP request.
     * @param {any} e - The error object from the failed request.
     * @throws {ExternalServiceHTTPError} If the request returned an unexpected status code.
     */
    private getTwitsErrorHandler = (e: any): void => {
        this.standardErrorHandler(e, this.getTwitsResponseStatusErrorHandler);
    }

    /**
     * Only for operation: getTwits
     *
     * Generates an error based on the response status for getTwits.
     *
     * @param {number} status - The HTTP status code.
     * @returns {Error} The generated error object.
     */
    private getTwitsResponseStatusErrorHandler = (status: number): Error => {
        return this.standardResponseStatusErrorHandler(status, "getTwits");
    }

    /**
     * Only for operation: getTwit
     *
     * Handles errors related to the external HTTP request.
     * @param {any} e - The error object from the failed request.
     * @throws {ExternalServiceHTTPError} If the request returned an unexpected status code.
     */
    private getTwitErrorHandler = (e: any): void => {
        this.standardErrorHandler(e, this.getTwitResponseStatusErrorHandler);
    }

    /**
     * Only for operation: getTwit
     *
     * Generates an error based on the response status for getTwit.
     *
     * @param {number} status - The HTTP status code.
     * @returns {Error} The generated error object.
     */
    private getTwitResponseStatusErrorHandler = (status: number): Error => {
        return this.standardResponseStatusErrorHandler(status, "getTwit");
    }
}