import {injectable} from "tsyringe";
import {ExternalApiInterface} from "./ExternalApiInterface";
import {HttpRequester} from "./HttpRequester";
import {TWITSNAP_URL, GET_SERVICES_PATH, GET_SERVICE_PATH, CHANGE_SERVICE_STATUS_PATH, CREATE_SERVICE_PATH} from "../../utils/config";
import {AxiosResponse} from "axios";
import {ResourceNotFoundError} from "../../services/application/errors/ResourceNotFoundError";
import {ExternalServiceHTTPError} from "../errors/ExternalServiceHTTPError";

@injectable()
export class TwitSnapServiceRegistryAPIs extends ExternalApiInterface {
    constructor(httpRequester: HttpRequester) {
        super(httpRequester);
    }

    public createService = async (serviceName: string, serviceDescription: string): Promise<any> => {
        const url = TWITSNAP_URL + CREATE_SERVICE_PATH

        const data = {
            name: serviceName,
            description: serviceDescription
        }

        return await this.httpRequester.postToUrl(url, data, this.createServiceErrorHandler, undefined, this.createServiceExtractor);
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
        const url = TWITSNAP_URL + GET_SERVICE_PATH + "/" + serviceId
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
        const url = TWITSNAP_URL + GET_SERVICES_PATH
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

    public changeServiceStatus = async (serviceId: string, status: string): Promise<void> => {
        const url = TWITSNAP_URL + CHANGE_SERVICE_STATUS_PATH

        const data = {
            id: serviceId,
            status: status
        }

        return await this.httpRequester.postToUrl(url, data, this.changeServiceStatusErrorHandler, undefined, this.changeServiceStatusExtractor);
    }

    private changeServiceStatusErrorHandler = (e: any): void => {
        this.standardErrorHandler(e, this.changeServiceStatusResponseStatusErrorHandler);
    };

    private changeServiceStatusResponseStatusErrorHandler = (status: number): Error => {
        return this.standardResponseStatusErrorHandler(status, "updateService");
    };

    private changeServiceStatusExtractor = (response: void | AxiosResponse<any, any>): any => {
        return response?.data;
    }
}