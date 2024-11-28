import { TwitSnapUsersAPIs } from '../../api/external/TwitSnapUsersAPIs';
import { injectable } from "tsyringe";

@injectable()
export class TwitSnapUserService {
    private twitSnapUsersAPIs: TwitSnapUsersAPIs;

    constructor(TwitSnapTwitsAPIs: TwitSnapUsersAPIs) {
        this.twitSnapUsersAPIs = TwitSnapTwitsAPIs;
    }

    public getUsers = async (offset: string, limit: string): Promise<any> => {
        return await this.twitSnapUsersAPIs.getUsers(offset, limit);
    };

    public getUser = async (userId: string): Promise<any> => {
        return await this.twitSnapUsersAPIs.getUser(userId);
    };

    public banOrUnbanUser = async (userId: string): Promise<void> => {
        await this.twitSnapUsersAPIs.banOrUnbanUser(userId);
    };

    public getMetrics = async (metricType: string): Promise<any> => {
        return await this.twitSnapUsersAPIs.getMetrics(metricType);
    }
}