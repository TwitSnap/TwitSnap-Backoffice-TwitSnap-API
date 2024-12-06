import {injectable} from "tsyringe";
import {ExternalApiInterface} from "./ExternalApiInterface";
import {HttpRequester} from "./HttpRequester";
import {GET_METRICS_PATH, TWITSNAP_URL} from "../../utils/config";
import {AxiosResponse} from "axios";
import {ResourceNotFoundError} from "../../services/application/errors/ResourceNotFoundError";
import {ExternalServiceHTTPError} from "../errors/ExternalServiceHTTPError";

@injectable()
export class TwitSnapTwitsAPIs extends ExternalApiInterface {
    constructor(httpRequester: HttpRequester) {
        super(httpRequester);
    }

    public createService = async (serviceName: string, serviceDescription: string): Promise<any> => {
        const url = TWITSNAP_URL + GET_METRICS_PATH //TODO UPDATE PATH

        const data = {
            name: serviceName,
            description: serviceDescription
        }

        await this.httpRequester.postToUrl(url, data, this.createServiceErrorHandler, undefined, this.createServiceExtractor);
    }

    private createServiceErrorHandler = (e: any): void => {
        this.standardErrorHandler(e, this.createServiceResponseStatusErrorHandler);
    };

    private createServiceResponseStatusErrorHandler = (status: number): Error => {
        return this.standardResponseStatusErrorHandler(status, "createService");
    };

    private createServiceExtractor = (response: void | AxiosResponse<any, any>): any => {
        return response?.data;
    }

    public getService = async (serviceId: string): Promise<any> => {
        const url = TWITSNAP_URL + GET_METRICS_PATH + "/" + serviceId //TODO UPDATE PATH
        return await this.httpRequester.getToUrl(url, undefined, this.getServiceErrorHandler, this.getServiceExtractor);
    }

    private getServiceErrorHandler = (e: any): void => {
        this.standardErrorHandler(e, this.getServiceResponseStatusErrorHandler);
    };

    private getServiceResponseStatusErrorHandler = (status: number): Error => {
        switch (status) {
            case 404:
                return new ResourceNotFoundError("Service not found.");
            default:
                return new ExternalServiceHTTPError(`API Call getService has failed with status ${status}.`);
        }
    };

    private getServiceExtractor = (response: void | AxiosResponse<any, any>): any => {
        return response?.data;
    }

    public getServices = async (): Promise<any> => {
        const url = TWITSNAP_URL + GET_METRICS_PATH //TODO UPDATE PATH
        return await this.httpRequester.getToUrl(url, undefined, this.getServicesErrorHandler, this.getServicesExtractor);
    }

    private getServicesErrorHandler = (e: any): void => {
        this.standardErrorHandler(e, this.getServicesResponseStatusErrorHandler);
    };

    private getServicesResponseStatusErrorHandler = (status: number): Error => {
        return this.standardResponseStatusErrorHandler(status, "getServices");
    }

    private getServicesExtractor = (response: void | AxiosResponse<any, any>): any => {
        return response?.data;
    }

    public updateService = async (serviceId: string, status: string): Promise<void> => {
        const url = TWITSNAP_URL + GET_METRICS_PATH //TODO UPDATE PATH

        const data = {
            id: serviceId,
            status: status
        }

        await this.httpRequester.postToUrl(url, data, this.updateServiceErrorHandler, undefined, this.updateServiceExtractor);
    }

    private updateServiceErrorHandler = (e: any): void => {
        this.standardErrorHandler(e, this.updateServiceResponseStatusErrorHandler);
    };

    private updateServiceResponseStatusErrorHandler = (status: number): Error => {
        return this.standardResponseStatusErrorHandler(status, "updateService");
    };

    private updateServiceExtractor = (response: void | AxiosResponse<any, any>): any => {
        return response?.data;
    }
}