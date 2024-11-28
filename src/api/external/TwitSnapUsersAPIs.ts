import { HttpRequester } from "./HttpRequester";
import { ExternalApiInterface } from "./ExternalApiInterface";
import { AxiosResponse } from "axios";
import { ResourceNotFoundError } from "../../services/application/errors/ResourceNotFoundError";
import { ExternalServiceHTTPError } from "../errors/ExternalServiceHTTPError";
import { injectable } from "tsyringe";
import { TWITSNAP_URL, BAN_USER_PATH, GET_USER_PATH, GET_USERS_PATH, GET_METRICS_PATH } from "../../utils/config";

@injectable()
export class TwitSnapUsersAPIs extends ExternalApiInterface {
    constructor(httpRequester: HttpRequester) {
        super(httpRequester);
    }

    /**
     * Get metrics from the external service.
     *
     * @param metricType - The metric type.
     */
    public getMetrics = async (metricType: string): Promise<any> => {
        let url = TWITSNAP_URL + GET_METRICS_PATH
        if (metricType) url += "?metric_type=" + metricType;

        return await this.httpRequester.getToUrl(url, undefined, this.getMetricsErrorHandler, this.getMetricsExtractor);
    }

    private getMetricsExtractor = (response: void | AxiosResponse<any, any>): any => {
        return response?.data;
    };

    private getMetricsErrorHandler = (e: any): void => {
        this.standardErrorHandler(e, this.getMetricsResponseStatusErrorHandler);
    };

    private getMetricsResponseStatusErrorHandler = (status: number): Error => {
        return this.standardResponseStatusErrorHandler(status, "getMetrics");
    };

    /**
     * Get users from the external service.
     *
     * @param offset - The offset for the users.
     * @param limit - The limit for the users.
     */
    public getUsers = async (offset: string, limit: string): Promise<any> => {
        const url = TWITSNAP_URL + GET_USERS_PATH + "?offset=" + offset + "&limit=" + limit;
        return await this.httpRequester.getToUrl(url, undefined, this.getUsersErrorHandler, this.getUsersExtractor);
    };

    /**
     * Get a user from the external service.
     *
     * @param userId - The user id.
     */
    public getUser = async (userId: string): Promise<any> => {
        const url = TWITSNAP_URL + GET_USER_PATH + userId;
        return await this.httpRequester.getToUrl(url, undefined, this.getUserErrorHandler, this.getUserExtractor);
    };

    /**
     * Ban or unban a user from the external service.
     *
     * @param userId - The user id.
     */
    public banOrUnbanUser = async (userId: string): Promise<void> => {
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
                return new ResourceNotFoundError("User not found.");
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
                return new ResourceNotFoundError("User not found.");
            default:
                return new ExternalServiceHTTPError(`API Call getUser has failed with status ${status}.`);
        }
    };
}