import {HttpRequester} from "./HttpRequester";
import {ExternalApiInterface} from "./ExternalApiInterface";
import {AxiosResponse} from "axios";
import {ExternalServiceHTTPError} from "./ExternalServiceHTTPError";
import {ResourceNotFoundError} from "../../services/application/errors/ResourceNotFoundError";
import {injectable} from "tsyringe";
import {TWITSNAP_URL, BLOCK_TWEET_PATH, GET_TWEETS_PATH, GET_TWIT_PATH} from "../../utils/config";

@injectable()
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
        //TODO Definir url
        const url = TWITSNAP_URL + GET_TWEETS_PATH + "?offset=" + offset + "&limit=" + limit + "&user_id=" + userId;

        return await this.httpRequester.getToUrl(url, undefined, this.getTwitsErrorHandler, this.getTwitsExtractor);
    }

    /**
     * Get a twit from the external service.
     *
     * @param twitId - The twit id.
     */
    public async getTwit(twitId: string): Promise<any> {
        //TODO Definir url
        const url = TWITSNAP_URL + GET_TWIT_PATH + twitId;

        return await this.httpRequester.getToUrl(url, undefined, this.getTwitErrorHandler, this.getTwitExtractor);
    }

    /**
     * Block or unblock a twit from the external service.
     *
     * @param twitId - The twit id.
     */
    public async blockOrUnblockTwit(twitId: string): Promise<void> {
        //TODO Definir url
        const url = TWITSNAP_URL + BLOCK_TWEET_PATH + "post?post_id=" + twitId;

        await this.httpRequester.postToUrl(url, undefined, this.blockOrUnblockTwitErrorHandler);
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
        switch (status) {
            case 404:
                return new ResourceNotFoundError("User not found.");
            default:
                return new ExternalServiceHTTPError(`API Call getUser has failed with status ${status}.`);
        }
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
        switch (status) {
            case 404:
                return new ResourceNotFoundError("Twit not found.");
            default:
                return new ExternalServiceHTTPError(`API Call getTwit has failed with status ${status}.`);
        }
    }
}