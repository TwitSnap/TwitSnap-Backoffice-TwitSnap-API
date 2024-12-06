import { Router } from "express";
import {twitSnapController} from "../../utils/container/container";

const router = Router();

// ? Twits
router.get("/v1/ts/twits", twitSnapController.getTwits);
router.get("/v1/ts/twits/:twitId", twitSnapController.getTwit);
router.post("/v1/ts/twits/:twitId/block", twitSnapController.blockOrUnblockTwit);

// ? Users
router.get("/v1/ts/users", twitSnapController.getUsers);
router.get("/v1/ts/users/:userId", twitSnapController.getUser);
router.post("/v1/ts/users/:userId/ban", twitSnapController.banOrUnbanUser);
router.get("/v1/ts/users/metrics", twitSnapController.getMetrics);

// ? Service registry
router.get("/v1/ts/service", twitSnapController.getServices);
router.post("/v1/ts/service", twitSnapController.createService);
router.get("/v1/ts/service/:id", twitSnapController.getService);
router.post("/v1/ts/service/status", twitSnapController.changeServiceStatus);

export default router;