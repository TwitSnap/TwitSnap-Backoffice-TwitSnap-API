import { HttpRequester } from "./HttpRequester";
import { ExternalApiInterface } from "./ExternalApiInterface";
import { AxiosResponse } from "axios";
import { ExternalServiceHTTPError } from "../errors/ExternalServiceHTTPError";
import { ResourceNotFoundError } from "../../services/application/errors/ResourceNotFoundError";
import { injectable } from "tsyringe";
import { TWITSNAP_URL, BLOCK_TWEET_PATH, GET_TWEETS_PATH, GET_TWIT_PATH } from "../../utils/config";

@injectable()
export class TwitSnapTwitsAPIs extends ExternalApiInterface {
    constructor(httpRequester: HttpRequester) {
        super(httpRequester);
    }

    getTwits = async (offset: string, limit: string, userId: string): Promise<any> => {
        const url = TWITSNAP_URL + GET_TWEETS_PATH + "?offset=" + offset + "&limit=" + limit + "&user_id=" + userId;
        //let url = TWITSNAP_URL + GET_TWEETS_PATH + "?offset=" + offset + "&limit=" + limit + "&user_id=" + userId;
        //if(userId !== "") url = TWITSNAP_URL + GET_TWEETS_PATH + "?offset=" + offset + "&limit=" + limit + "&user_id=" + userId;

        return await this.httpRequester.getToUrl(url, undefined, this.getTwitsErrorHandler, this.getTwitsExtractor);
    };

    getTwit = async (twitId: string): Promise<any> => {
        const url = TWITSNAP_URL + GET_TWIT_PATH + twitId;
        return await this.httpRequester.getToUrl(url, undefined, this.getTwitErrorHandler, this.getTwitExtractor);
    };

    blockOrUnblockTwit = async (twitId: string): Promise<void> => {
        const url = TWITSNAP_URL + BLOCK_TWEET_PATH + "post?post_id=" + twitId;
        await this.httpRequester.postToUrl(url, undefined, this.blockOrUnblockTwitErrorHandler);
    };

    private getTwitExtractor = (response: void | AxiosResponse<any, any>): any => {
        return response?.data;
    };

    private getTwitsExtractor = (response: void | AxiosResponse<any, any>): any => {
        return response?.data;
    };

    private blockOrUnblockTwitErrorHandler = (e: any): void => {
        this.standardErrorHandler(e, this.blockOrUnblockTwitResponseStatusErrorHandler);
    };

    private blockOrUnblockTwitResponseStatusErrorHandler = (status: number): Error => {
        switch (status) {
            case 404:
                return new ResourceNotFoundError("Twit not found.");
            default:
                return new ExternalServiceHTTPError(`API Call getUser has failed with status ${status}.`);
        }
    };

    private getTwitsErrorHandler = (e: any): void => {
        this.standardErrorHandler(e, this.getTwitsResponseStatusErrorHandler);
    };

    private getTwitsResponseStatusErrorHandler = (status: number): Error => {
        return this.standardResponseStatusErrorHandler(status, "getTwits");
    };

    private getTwitErrorHandler = (e: any): void => {
        this.standardErrorHandler(e, this.getTwitResponseStatusErrorHandler);
    };

    private getTwitResponseStatusErrorHandler = (status: number): Error => {
        switch (status) {
            case 404:
                return new ResourceNotFoundError("Twit not found.");
            default:
                return new ExternalServiceHTTPError(`API Call getTwit has failed with status ${status}.`);
        }
    };
}