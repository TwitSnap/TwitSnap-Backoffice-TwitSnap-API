import {HttpRequester} from "./HttpRequester";
import {ExternalApiInterface} from "./ExternalApiInterface";
import {AxiosResponse} from "axios";
import {ResourceNotFoundError} from "../../services/application/errors/ResourceNotFoundError";
import {ExternalServiceHTTPError} from "../errors/ExternalServiceHTTPError";
import {injectable} from "tsyringe";
import {TWITSNAP_URL, BAN_USER_PATH, GET_USER_PATH, GET_USERS_PATH} from "../../utils/config";

@injectable()
export class TwitSnapUsersAPIs extends ExternalApiInterface{
    constructor(httpRequester: HttpRequester) {
        super(httpRequester);
    }

    /**
     * Get users from the external service.
     *
     * @param offset - The offset for the users.
     * @param limit - The limit for the users.
     */
    public async getUsers(offset: string, limit: string): Promise<any> {
        const url = TWITSNAP_URL + GET_USERS_PATH + "?offset=" + offset + "&limit=" + limit;

        return await this.httpRequester.getToUrl(url, undefined, this.getUsersErrorHandler, this.getUsersExtractor);
    }

    /**
     * Get a user from the external service.
     *
     * @param userId - The user id.
     */
    public async getUser(userId: string): Promise<any> {
        const url = TWITSNAP_URL + GET_USER_PATH + userId;

        return await this.httpRequester.getToUrl(url, undefined, this.getUserErrorHandler, this.getUserExtractor);
    }

    /**
     * Ban or unban a user from the external service.
     *
     * @param userId - The user id.
     */
    public async banOrUnbanUser(userId: string): Promise<void> {
        const url = TWITSNAP_URL + BAN_USER_PATH + userId + "/ban";

        await this.httpRequester.postToUrl(url, undefined, this.banOrUnbanUserErrorHandler);
    }

    private getUserExtractor = (response: void | AxiosResponse<any, any>): any => {
        return response?.data;
    }

    private getUsersExtractor = (response: void | AxiosResponse<any, any>): any => {
        return response?.data;
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
        switch (status) {
            case 404:
                return new ResourceNotFoundError("Twit not found.");
            default:
                return new ExternalServiceHTTPError(`API Call banOrUnbanUser has failed with status ${status}.`);
        }
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
        switch (status) {
            case 404:
                return new ResourceNotFoundError("Twit not found.");
            default:
                return new ExternalServiceHTTPError(`API Call getUser has failed with status ${status}.`);
        }
    }
}