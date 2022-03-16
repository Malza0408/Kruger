import { Education } from '../db'
import { User } from '../db'
import { v4 as uuidv4 } from "uuid";


class educationService {
    static async createEducation({ user_id, school, major, position }){
        console.log('서비스 연결')

        // const education = await Education.findByUserId({ user_id })
        // console.log(education)
        // console.log('service data 받음.')
        // if (education){
        //     const errorMessage = '이미 학력이 등록 된 상태입니다.'
        //     return { errorMessage }
        // }
        // const user = user
        const id = uuidv4();
        // const user = await User.findById(user_id)
        // console.log(user._id)
        
        console.log('학력등록')
        const newEducation = { id, user_id, school, major, position }
        const createdNewEducation = await Education.create({ newEducation })
        console.log('education 생성')
        createdNewEducation.errorMessage = null

        return createdNewEducation
    }
}

export { educationService };