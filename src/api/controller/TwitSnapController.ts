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

    getTwits = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const offset = this.getQueryParamOrBadRequestError(req, "offset") as string;
            const limit = this.getQueryParamOrBadRequestError(req, "limit") as string;
            const userId = req.query.userId as string | ""; // ? Si no llega el parametro userId (es opcional), se asigna un string vacio

            const twits = await this.twitSnapTwitService.getTwits(offset, limit, userId);

            this.okResponse(res, twits);
        } catch (e) {
            next(e);
        }
    };

    getTwit = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const twitId = this.getParamOrBadRequestError(req, "twitId") as string;
            const twit = await this.twitSnapTwitService.getTwit(twitId);

            this.okResponse(res, twit);
        } catch (e) {
            next(e);
        }
    };

    blockOrUnblockTwit = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const twitId = this.getParamOrBadRequestError(req, "twitId") as string;
            await this.twitSnapTwitService.blockOrUnblockTwit(twitId);

            this.okNoContentResponse(res);
        } catch (e) {
            next(e);
        }
    };

    getUsers = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const offset = this.getQueryParamOrBadRequestError(req, "offset") as string;
            const limit = this.getQueryParamOrBadRequestError(req, "limit") as string;

            const users = await this.twitSnapUserService.getUsers(offset, limit);

            this.okResponse(res, users);
        } catch (e) {
            next(e);
        }
    };

    getUser = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const userId = this.getParamOrBadRequestError(req, "userId") as string;
            const user = await this.twitSnapUserService.getUser(userId);

            this.okResponse(res, user);
        } catch (e) {
            next(e);
        }
    };

    banOrUnbanUser = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const userId = this.getParamOrBadRequestError(req, "userId") as string;
            await this.twitSnapUserService.banOrUnbanUser(userId);

            this.okNoContentResponse(res);
        } catch (e) {
            next(e);
        }
    };
}
