import { User } from '../db/models/NewUser';
import bcrypt from 'bcrypt';
import { v4 as uuidv4 } from 'uuid';
import jwt from 'jsonwebtoken';

class newUserService {
    static async addUser({ name, email, password }) {
        // 이메일 중복확인
        const previousUser = await User.findByEmail({ email });
        if (previousUser) {
            console.log(previousUser);
            const errorMessage = '이미 가입한 회원입니다.';
            return { errorMessage };
        }
        // id 유니크값부여, 생성
        const id = uuidv4();
        console.log('생성한 id', id);
        // 비밀번호 해쉬화
        const hashedPassword = await bcrypt.hash(password, 10);
        // console.log(hashedPassword);
        const newUser = { id, email, name, password: hashedPassword };
        console.log(newUser);
        console.log(typeof newUser);
        const createdUser = await User.createUser(newUser);
        createdUser.errorMessage = null;
        return createdUser;
    }
}
export { newUserService };
