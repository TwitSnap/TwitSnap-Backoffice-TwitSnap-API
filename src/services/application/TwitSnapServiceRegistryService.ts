import { injectable } from "tsyringe";
import {TwitSnapServiceRegistryAPIs} from "../../api/external/TwitSnapServiceRegistryAPIs";

@injectable()
export class TwitSnapServiceRegistryService{
    private twitSnapServiceRegistryAPIs: TwitSnapServiceRegistryAPIs;

    constructor(TwitSnapServiceRegistryAPIs: TwitSnapServiceRegistryAPIs) {
        this.twitSnapServiceRegistryAPIs = TwitSnapServiceRegistryAPIs;
    }

    public createService = async (serviceName: string, serviceDescription: string): Promise<any> => {
        return await this.twitSnapServiceRegistryAPIs.createService(serviceName, serviceDescription);
    };

    public getService = async (serviceId: string): Promise<any> => {
        return await this.twitSnapServiceRegistryAPIs.getService(serviceId);
    };

    public getServices = async (): Promise<any> => {
        return await this.twitSnapServiceRegistryAPIs.getServices();
    }

    public changeServiceStatus = async (serviceId: string, status: string): Promise<void> => {
        await this.twitSnapServiceRegistryAPIs.changeServiceStatus(serviceId, status);
    }
}