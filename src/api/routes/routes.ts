import { Router } from "express";
import {twitSnapController} from "../../utils/container/container";

const router = Router();

// ? Twits
router.get("/v1/twits", twitSnapController.getTwits);
router.get("/v1/twits/:twitId", twitSnapController.getTwit);
router.post("/v1/twits/:twitId/block", twitSnapController.blockOrUnblockTwit);

// ? Users
router.post("/v1/users", twitSnapController.getUsers);
router.get("/v1/users/:userId", twitSnapController.getUser);
router.post("/v1/users/:userId/ban", twitSnapController.banOrUnbanUser);

export default router;