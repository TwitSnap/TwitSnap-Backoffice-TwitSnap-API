import {HttpRequester} from "./HttpRequester";
import {TwitSnapAPIs} from "./TwitSnapAPIs";

export class TwitSnapUsersAPIs extends TwitSnapAPIs{
    constructor(httpRequester: HttpRequester) {
        super(httpRequester);
    }

    public async getUsers(offset: string, limit: string): Promise<void> {
        const url = "url/" + "endpoint/" + "?offset=" + offset + "&limit=" + limit;

        await this.httpRequester.getToUrl(url, undefined, this.getUsersErrorHandler, null);
    }

    public async getUser(userId: string): Promise<void> {
        const url = "url/" + "endpoint/" + userId;

        await this.httpRequester.getToUrl(url, undefined, this.getUserErrorHandler, null);
    }

    public async banOrUnbanUser(userId: string): Promise<void> {
        const url = "url/" + "endpoint/" + userId;

        await this.httpRequester.postToUrl(url, undefined, this.banOrUnbanUserErrorHandler);
    }

    /**
     * Only for operation: banOrUnbanUser
     *
     * Handles errors related to the external HTTP request.
     * @param {any} e - The error object from the failed request.
     * @throws {ExternalServiceHTTPError} If the request returned an unexpected status code.
     */
    private banOrUnbanUserErrorHandler = (e: any): void => {
        this.standardErrorHandler(e, this.banOrUnbanUserResponseStatusErrorHandler);
    }

    /**
     * Only for operation: banOrUnbanUser
     *
     * Generates an error based on the response status for blockOrUnblockTwit.
     *
     * @param {number} status - The HTTP status code.
     * @returns {Error} The generated error object.
     */
    private banOrUnbanUserResponseStatusErrorHandler = (status: number): Error => {
        return this.standardResponseStatusErrorHandler(status, "banOrUnbanUser");
    }

    /**
     * Only for operation: getUsers
     *
     * Handles errors related to the external HTTP request.
     * @param {any} e - The error object from the failed request.
     * @throws {ExternalServiceHTTPError} If the request returned an unexpected status code.
     */
    private getUsersErrorHandler = (e: any): void => {
        this.standardErrorHandler(e, this.getUsersResponseStatusErrorHandler);
    }

    /**
     * Only for operation: getUsers
     *
     * Generates an error based on the response status for getUsers.
     *
     * @param {number} status - The HTTP status code.
     * @returns {Error} The generated error object.
     */
    private getUsersResponseStatusErrorHandler = (status: number): Error => {
        return this.standardResponseStatusErrorHandler(status, "getUsers");
    }

    /**
     * Only for operation: getUser
     *
     * Handles errors related to the external HTTP request.
     * @param {any} e - The error object from the failed request.
     * @throws {ExternalServiceHTTPError} If the request returned an unexpected status code.
     */
    private getUserErrorHandler = (e: any): void => {
        this.standardErrorHandler(e, this.getUserResponseStatusErrorHandler);
    }

    /**
     * Only for operation: getUser
     *
     * Generates an error based on the response status for getTwit.
     *
     * @param {number} status - The HTTP status code.
     * @returns {Error} The generated error object.
     */
    private getUserResponseStatusErrorHandler = (status: number): Error => {
        return this.standardResponseStatusErrorHandler(status, "getUser");
    }
}