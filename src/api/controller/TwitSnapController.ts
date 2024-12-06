import { Controller } from "./Controller";
import { HttpResponseSender } from "./HttpResponseSender";
import { TwitSnapTwitService } from "../../services/application/TwitSnapTwitService";
import { TwitSnapUserService } from "../../services/application/TwitSnapUserService";
import { NextFunction, Request, Response } from "express";
import { injectable } from "tsyringe";
import {TwitSnapServiceRegistryService} from "../../services/application/TwitSnapServiceRegistryService";

@injectable()
export class TwitSnapController extends Controller {
    private twitSnapTwitService: TwitSnapTwitService;
    private twitSnapUserService: TwitSnapUserService;
    private twitSnapServiceRegistryService: TwitSnapServiceRegistryService;

    constructor(
        TwitSnapTwitService: TwitSnapTwitService,
        TwitSnapUserService: TwitSnapUserService,
        TwitSnapServiceRegistryService: TwitSnapServiceRegistryService,
        responseSender: HttpResponseSender
    ) {
        super(responseSender);
        this.twitSnapTwitService = TwitSnapTwitService;
        this.twitSnapUserService = TwitSnapUserService;
        this.twitSnapServiceRegistryService = TwitSnapServiceRegistryService;
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

    public createService = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const name = this.getFieldOrBadRequestError(req, 'name') as string;
            const description = this.getFieldOrBadRequestError(req, 'description') as string;
            const service = await this.twitSnapServiceRegistryService.createService(name, description);

            this.createdResponse(res, service);
        } catch (e) {
            next(e);
        }
    }

    public getService = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const serviceId = this.getParamOrBadRequestError(req, 'id') as string;
            const service = await this.twitSnapServiceRegistryService.getService(serviceId);

            this.okResponse(res, service);
        } catch (e) {
            next(e);
        }
    }

    public getServices = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const services = await this.twitSnapServiceRegistryService.getServices();
            this.okResponse(res, services);
        } catch (e) {
            next(e);
        }
    }

    public changeServiceStatus = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const id = this.getFieldOrBadRequestError(req, 'id') as string;
            const status = this.getFieldOrBadRequestError(req, 'status') as string;

            await this.twitSnapServiceRegistryService.changeServiceStatus(id, status);
            this.okNoContentResponse(res);
        } catch (e) {
            next(e);
        }
    }
}
