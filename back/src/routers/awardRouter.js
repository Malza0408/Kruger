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

awardAuthRouter.get(
    "/awards/:id",
    login_required,
    async (req, res, next) => {
      try {
        const award_id = req.params.id;
        const currentAwardInfo = await awardAuthService.getAwardInfo({ award_id });
  
        if (currentUserInfo.errorMessage) {
          throw new Error(currentUserInfo.errorMessage);
        }
  
        res.status(200).send(currentAwardInfo);
      } catch (error) {
        next(error);
      }
    }
)

awardAuthRouter.put(
    "/awards/:id",
    login_required,
    async function (req, res, next) {
      try {
        // URI로부터 사용자 id를 추출함.
        const award_id = req.params.id;
        // body data 로부터 업데이트할 사용자 정보를 추출함.
        const title = req.body.title ?? null;
        const description = req.body.description ?? null;
  
        const toUpdate = { title, description };
  
        // 해당 사용자 아이디로 사용자 정보를 db에서 찾아 업데이트함. 업데이트 요소가 없을 시 생략함
        const updatedAward = await awardAuthService.setAward({ award_id, toUpdate });
  
        if (updatedAward.errorMessage) {
          throw new Error(updatedAward.errorMessage);
        }
  
        res.status(200).json(updatedAward);
      } catch (error) {
        next(error);
      }
    }
);
  