import is from "@sindresorhus/is";
import { Router } from "express";
import { login_required } from "../middlewares/login_required";
import { awardAuthService } from "../services/awardService";

const awardAuthRouter = Router();

awardAuthRouter.post("/award/create", async (req, res, next) => {
    try {
        if (is.emptyObject(req.body)) {
            throw new Error(
              "headers의 Content-Type을 application/json으로 설정해주세요"
            );
        }

        const user_id = req.currentUserId
        const title = req.body.title
        const description = req.body.description

        const newAward = await awardAuthService.addAward({
            user_id,
            title,
            description,
        })

        if (newAward.errorMessage) {
            throw new Error(newAward.errorMessage);
          }
      
          res.status(201).json(newAward);      
    } catch (error) {
        next(error)
    }
})