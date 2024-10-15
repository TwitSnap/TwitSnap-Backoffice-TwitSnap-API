import { TwitSnapTwitsAPIs } from '../../api/external/TwitSnapTwitsAPIs';
import {injectable} from "tsyringe";

@injectable()
export class TwitSnapTwitService{
    private twitSnapTwitsAPIs: TwitSnapTwitsAPIs;

    constructor(TwitSnapTwitsAPIs: TwitSnapTwitsAPIs){
        this.twitSnapTwitsAPIs = TwitSnapTwitsAPIs;
    }

    public async getTwits(offset: string, limit: string, userId: string): Promise<any> {
        return await this.twitSnapTwitsAPIs.getTwits(offset, limit, userId);
    }

    public async getTwit(twitId: string): Promise<any> {
        return await this.twitSnapTwitsAPIs.getTwit(twitId);
    }

    public async blockOrUnblockTwit(twitId: string): Promise<void> {
        await this.twitSnapTwitsAPIs.blockOrUnblockTwit(twitId);
    }
}