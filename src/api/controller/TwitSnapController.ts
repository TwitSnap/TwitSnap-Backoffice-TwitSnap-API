import { Controller } from "./Controller";
import { HttpResponseSender } from "./HttpResponseSender";
import { TwitSnapTwitService } from "../../services/application/TwitSnapTwitService";
import { TwitSnapUserService } from "../../services/application/TwitSnapUserService";
import { NextFunction, Request, Response } from "express";
import { injectable } from "tsyringe";

@injectable()
export class TwitSnapController extends Controller {
    private twitSnapTwitService: TwitSnapTwitService;
    private twitSnapUserService: TwitSnapUserService;

    constructor(
        TwitSnapTwitService: TwitSnapTwitService,
        TwitSnapUserService: TwitSnapUserService,
        responseSender: HttpResponseSender
    ) {
        super(responseSender);
        this.twitSnapTwitService = TwitSnapTwitService;
        this.twitSnapUserService = TwitSnapUserService;
    }

    public getMetrics = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const metricType = this.getOptionalQueryParamAsString(req, "metric_type");
            const metrics = await this.twitSnapUserService.getMetrics(metricType);

            this.okResponse(res, metrics);
        } catch (e) {
            next(e);
        }
    };

    public getTwits = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const offset = this.getQueryParamOrBadRequestError(req, "offset") as string;
            const limit = this.getQueryParamOrBadRequestError(req, "limit") as string;
            const userId = this.getOptionalQueryParamAsString(req, "userId");

            const twits = await this.twitSnapTwitService.getTwits(offset, limit, userId);

            this.okResponse(res, twits);
        } catch (e) {
            next(e);
        }
    };

    public getTwit = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const twitId = this.getParamOrBadRequestError(req, "twitId") as string;
            const twit = await this.twitSnapTwitService.getTwit(twitId);

            this.okResponse(res, twit);
        } catch (e) {
            next(e);
        }
    };

    public blockOrUnblockTwit = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const twitId = this.getParamOrBadRequestError(req, "twitId") as string;
            await this.twitSnapTwitService.blockOrUnblockTwit(twitId);

            this.okNoContentResponse(res);
        } catch (e) {
            next(e);
        }
    };

    public getUsers = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const offset = this.getQueryParamOrBadRequestError(req, "offset") as string;
            const limit = this.getQueryParamOrBadRequestError(req, "limit") as string;

            const users = await this.twitSnapUserService.getUsers(offset, limit);

            this.okResponse(res, users);
        } catch (e) {
            next(e);
        }
    };

    public getUser = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const userId = this.getParamOrBadRequestError(req, "userId") as string;
            const user = await this.twitSnapUserService.getUser(userId);

            this.okResponse(res, user);
        } catch (e) {
            next(e);
        }
    };

    public banOrUnbanUser = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const userId = this.getParamOrBadRequestError(req, "userId") as string;
            await this.twitSnapUserService.banOrUnbanUser(userId);

            this.okNoContentResponse(res);
        } catch (e) {
            next(e);
        }
    };
}
