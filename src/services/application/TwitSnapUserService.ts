import { TwitSnapUsersAPIs } from '../../api/external/TwitSnapUsersAPIs';

export class TwitSnapUserService{
    private twitSnapUsersAPIs: TwitSnapUsersAPIs;

    constructor(TwitSnapTwitsAPIs: TwitSnapUsersAPIs){
        this.twitSnapUsersAPIs = TwitSnapTwitsAPIs;
    }
}