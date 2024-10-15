import {HttpRequester} from "./HttpRequester";
import {TwitSnapAPIs} from "./TwitSnapAPIs";

export class TwitSnapTwitsAPIs extends TwitSnapAPIs{
    constructor(httpRequester: HttpRequester){
        super(httpRequester);
    }

    public async getTwits(offset: string, limit: string): Promise<void> {
        const url = "url/" + "endpoint/" + "?offset=" + offset + "&limit=" + limit;

        //TODO Pendiente hacer la extract function de esto
        await this.httpRequester.getToUrl(url, undefined, this.getTwitsErrorHandler, null);
    }

    public async getTwit(twitId: string): Promise<void> {
        const url = "url/" + "endpoint/" + twitId;

        //TODO Pendiente hacer la extract function de esto
        await this.httpRequester.getToUrl(url, undefined, this.getTwitErrorHandler, null);
    }

    public async blockOrUnblockTwit(twitId: string): Promise<void> {
        const url = "url" + "endpoint";

        const data = {
            twitId: twitId,
        }

        await this.httpRequester.postToUrl(url, data, this.blockOrUnblockTwitErrorHandler);
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