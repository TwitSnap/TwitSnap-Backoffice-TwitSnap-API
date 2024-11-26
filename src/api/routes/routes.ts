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

export default router;