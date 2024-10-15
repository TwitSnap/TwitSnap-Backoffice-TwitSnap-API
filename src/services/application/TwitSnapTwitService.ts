import { TwitSnapTwitsAPIs } from '../../api/external/TwitSnapTwitsAPIs';

export class TwitSnapTwitService{
    private twitSnapTwitsAPIs: TwitSnapTwitsAPIs;

    constructor(TwitSnapTwitsAPIs: TwitSnapTwitsAPIs){
        this.twitSnapTwitsAPIs = TwitSnapTwitsAPIs;
    }
}