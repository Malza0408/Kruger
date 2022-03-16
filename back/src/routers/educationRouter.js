import is from "@sindresorhus/is";
import { Router } from "express";
import { login_required } from "../middlewares/login_required";
import { userAuthService } from "../services/userService";
import { educationService } from '../services/educationService';

const educationRouter = Router();

educationRouter.post('/create', (req, res, next) => {
    try{
        if(is.emptyObject(req.body)){
            throw new Error(
                "headers의 Content-Type을 application/json으로 설정해주세요"
              );
        }
        const user_id = req.body.user_id
        const school = req.body.school
        const major = req.body.major
        const position = req.body.position
        // const position_option = ['재학중', '학사졸업', '석사졸업', '박사졸업']
        // if(!position_option.includes(position)){
        //     res.status(400).send('옵션 선택을 잘못했습니다. 다시 확인해주세요.')
        // }
        console.log('data 받아옴')
        // const user = req.currentUserId
        // console.log(user)
        const newEducation = educationService.createEducation({ 
            user_id, 
            school, 
            major, 
            position })
        if(newEducation.errorMessage){
            throw new Error(newEducation.errorMessage)
        }
        res.status(201).json(newEducation)
    } catch (error){
        next(error)
    }
})

export { educationRouter };