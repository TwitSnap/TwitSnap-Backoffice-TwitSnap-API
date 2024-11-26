import { HttpRequester } from "./HttpRequester";
import { ExternalApiInterface } from "./ExternalApiInterface";
import { AxiosResponse } from "axios";
import { ResourceNotFoundError } from "../../services/application/errors/ResourceNotFoundError";
import { ExternalServiceHTTPError } from "../errors/ExternalServiceHTTPError";
import { injectable } from "tsyringe";
import { TWITSNAP_URL, BAN_USER_PATH, GET_USER_PATH, GET_USERS_PATH } from "../../utils/config";

@injectable()
export class TwitSnapUsersAPIs extends ExternalApiInterface {
    constructor(httpRequester: HttpRequester) {
        super(httpRequester);
    }

    /**
     * Get users from the external service.
     *
     * @param offset - The offset for the users.
     * @param limit - The limit for the users.
     */
    getUsers = async (offset: string, limit: string): Promise<any> => {
        const url = TWITSNAP_URL + GET_USERS_PATH + "?offset=" + offset + "&limit=" + limit;
        return await this.httpRequester.getToUrl(url, undefined, this.getUsersErrorHandler, this.getUsersExtractor);
    };

    /**
     * Get a user from the external service.
     *
     * @param userId - The user id.
     */
    getUser = async (userId: string): Promise<any> => {
        const url = TWITSNAP_URL + GET_USER_PATH + userId;
        return await this.httpRequester.getToUrl(url, undefined, this.getUserErrorHandler, this.getUserExtractor);
    };

    /**
     * Ban or unban a user from the external service.
     *
     * @param userId - The user id.
     */
    banOrUnbanUser = async (userId: string): Promise<void> => {
        const url = TWITSNAP_URL + BAN_USER_PATH + userId + "/ban";
        await this.httpRequester.postToUrl(url, undefined, this.banOrUnbanUserErrorHandler);
    };

    private getUserExtractor = (response: void | AxiosResponse<any, any>): any => {
        return response?.data;
    };

    private getUsersExtractor = (response: void | AxiosResponse<any, any>): any => {
        return response?.data;
    };

    private banOrUnbanUserErrorHandler = (e: any): void => {
        this.standardErrorHandler(e, this.banOrUnbanUserResponseStatusErrorHandler);
    };

    private banOrUnbanUserResponseStatusErrorHandler = (status: number): Error => {
        switch (status) {
            case 404:
                return new ResourceNotFoundError("Twit not found.");
            default:
                return new ExternalServiceHTTPError(`API Call banOrUnbanUser has failed with status ${status}.`);
        }
    };

    private getUsersErrorHandler = (e: any): void => {
        this.standardErrorHandler(e, this.getUsersResponseStatusErrorHandler);
    };

    private getUsersResponseStatusErrorHandler = (status: number): Error => {
        return this.standardResponseStatusErrorHandler(status, "getUsers");
    };

    private getUserErrorHandler = (e: any): void => {
        this.standardErrorHandler(e, this.getUserResponseStatusErrorHandler);
    };

    private getUserResponseStatusErrorHandler = (status: number): Error => {
        switch (status) {
            case 404:
                return new ResourceNotFoundError("Twit not found.");
            default:
                return new ExternalServiceHTTPError(`API Call getUser has failed with status ${status}.`);
        }
    };
}