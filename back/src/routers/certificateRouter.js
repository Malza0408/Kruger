import is from "@sindresorhus/is";
import { Router } from "express";
import { login_required } from "../middlewares/login_required";
import { certificateAuthService } from "../services/certificateService";

const certificateAuthRouter = Router();

certificateAuthRouter.post(
    "/certificate/create",
    login_required,
    async (req, res, next) => {
    try {
        if (is.emptyObject(req.body)) {
            throw new Error(
              "headers의 Content-Type을 application/json으로 설정해주세요"
            );
        }
        // login_required에서 currentUserId에 로그인 유저의 id를 넣어둠
        const user_id = req.currentUserId
        const title = req.body.title
        const description = req.body.description
        const date = req.body.date
        console.log(user_id, title, description, date)

        const newCertificate = await certificateAuthService.addCertificate({
            user_id,
            title,
            description,
            date,
        })

        if (newCertificate.errorMessage) {
            throw new Error(newCertificate.errorMessage);
          }
      
          res.status(201).json(newCertificate);      
    } catch (error) {
        next(error)
    }
})

  
  export { certificateAuthRouter };