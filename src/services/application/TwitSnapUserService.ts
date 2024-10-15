import { TwitSnapUsersAPIs } from '../../api/external/TwitSnapUsersAPIs';

export class TwitSnapUserService{
    private twitSnapUsersAPIs: TwitSnapUsersAPIs;

    constructor(TwitSnapTwitsAPIs: TwitSnapUsersAPIs){
        this.twitSnapUsersAPIs = TwitSnapTwitsAPIs;
    }

    public async getUsers(offset: string, limit: string): Promise<any> {
        return await this.twitSnapUsersAPIs.getUsers(offset, limit);
    }

    public async getUser(userId: string): Promise<any> {
        return await this.twitSnapUsersAPIs.getUser(userId);
    }

    public async banOrUnbanUser(userId: string): Promise<void> {
        await this.twitSnapUsersAPIs.banOrUnbanUser(userId);
    }
}