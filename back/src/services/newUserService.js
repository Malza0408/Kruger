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
    static async getUser({ email, password }) {
        const user = await User.findByEmail({ email });
        if (!user) {
            const errorMessage = '가입 내역이 없습니다.';
            return { errorMessage };
        }
        const correctPassword = user.password;
        const isPasswordCorrect = await bcrypt.compare(
            password,
            correctPassword
        );
        if (!isPasswordCorrect) {
            const errorMessage = '잘못 입력하셨습니다.';
            return { errorMessage };
        }
        //로그인 성공 -> JWT 웹 토큰 생성
        const secretKey = process.env.JWT_SECRET_KEY || 'jwt-secret-key';
        const token = jwt.sign({ user_id: user.id }, secretKey);
        const id = user.id;
        const name = user.name;
        const description = user.description;
        const loginUser = {
            token,
            id,
            email,
            name,
            description,
            errorMessage: null
        };
        return loginUser;
    }
    static async getUsers() {
        const userList = await User.getAllUsers();
        return userList;
    }
    static async getUser({ currentUserId }) {
        const user = await User.getUserInfo({ currentUserId });
        if (!user) {
            const errorMessage = '해당하는 유저가 없습니다.';
            return { errorMessage };
        }
        return user;
    }
}
export { newUserService };
