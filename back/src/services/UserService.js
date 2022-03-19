import { User } from '../db'; // from을 폴더(db) 로 설정 시, 디폴트로 index.js 로부터 import함.
import bcrypt from 'bcrypt';
import { v4 as uuidv4 } from 'uuid';
import jwt from 'jsonwebtoken';
import { sendMail } from './MailService';

class UserService {
    static async addUser({ name, email, password }) {
        // 이메일 중복 확인
        const user = await User.findByEmail({ email });
        if (user) {
            const errorMessage =
                '이 이메일은 현재 사용중입니다. 다른 이메일을 입력해 주세요.';
            throw new Error(errorMessage);
        }

        // 비밀번호 해쉬화
        const hashedPassword = await bcrypt.hash(password, 10);

        // id 는 유니크 값 부여
        const id = uuidv4();
        const newUser = { id, name, email, password: hashedPassword };

        // db에 저장
        const createdNewUser = await User.create({ newUser });

        return createdNewUser;
    }

    static async getUsers() {
        const users = await User.findAll();
        return users;
    }

    static async getUser({ email, password }) {
        // 이메일 db에 존재 여부 확인
        const user = await User.findByEmail({ email });
        if (!user) {
            const errorMessage =
                '등록되지 않은 아이디이거나 아이디 또는 비밀번호를 잘못 입력했습니다.';
            throw new Error(errorMessage);
        }

        // 비밀번호 일치 여부 확인
        const correctPasswordHash = user.password;
        const isPasswordCorrect = await bcrypt.compare(
            password,
            correctPasswordHash
        );
        if (!isPasswordCorrect) {
            const errorMessage =
                '등록되지 않은 아이디이거나 아이디 또는 비밀번호를 잘못 입력했습니다.';
            throw new Error(errorMessage);
        }

        // 로그인 성공 -> JWT 웹 토큰 생성
        const secretKey = process.env.JWT_SECRET_KEY || 'jwt-secret-key';
        const token = jwt.sign({ user_id: user.id }, secretKey);

        // 반환할 loginuser 객체를 위한 변수 설정
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

    static async getUserInfo({ user_id }) {
        const user = await User.findById({ user_id });

        // db에서 찾지 못한 경우, 에러 메시지 반환
        if (!user) {
            const errorMessage =
                '해당 이메일은 가입 내역이 없습니다. 다시 한 번 확인해 주세요.';
            throw new Error(errorMessage);
        }

        return user;
    }

    static async setUser({ user_id, toUpdate }) {
        // 우선 해당 id 의 유저가 db에 존재하는지 여부 확인
        let user = await User.findById({ user_id });

        // db에서 찾지 못한 경우, 에러 메시지 반환
        if (!user) {
            const errorMessage =
                '가입 내역이 없습니다. 다시 한 번 확인해 주세요.';
            throw new Error(errorMessage);
        }

        // 업데이트 대상에 name이 있다면, 즉 name 값이 null 이 아니라면 업데이트 진행
        if (toUpdate.name) {
            const fieldToUpdate = 'name';
            const newValue = toUpdate.name;
            user = await User.updateById({ user_id, fieldToUpdate, newValue });
        }

        if (toUpdate.email) {
            const fieldToUpdate = 'email';
            const newValue = toUpdate.email;
            user = await User.updateById({ user_id, fieldToUpdate, newValue });
        }

        if (toUpdate.password) {
            const fieldToUpdate = 'password';
            // 새로운 비밀번호 해쉬화
            const newHashedPassword = await bcrypt.hash(toUpdate.password, 10);
            const newValue = newHashedPassword;
            user = await User.updateById({ user_id, fieldToUpdate, newValue });
        }

        if (toUpdate.description) {
            const fieldToUpdate = 'description';
            const newValue = toUpdate.description;
            user = await User.updateById({ user_id, fieldToUpdate, newValue });
        }

        return user;
    }

    static async resetPassword({ email }) {
        let user = await User.findByEmail({ email });
        console.log(email);
        const subject = '포트폴리오 공유 웹 서비스';
        // 등록되지 않은 회원일 경우 이메일 내용
        if (!user) {
            const text = `귀하의 이메일은 저희 서비스에 등록되어 있지 않습니다. 회원가입을 해주세요 :)`;
            await sendMail(email, subject, text);
            return;
        }

        const fieldToUpdate = 'password';

        // uuidv4로 랜덤한 문자열을 가져오고 너무 길지 않게 10글자로만 새로운 비밀번호를 보내줌
        const randomPassword = uuidv4();
        const newPassword = randomPassword.slice(0, 10);
        const newHashedPassword = await bcrypt.hash(newPassword, 10);

        const newValue = newHashedPassword;

        await User.updateByEmail({ email, fieldToUpdate, newValue });

        // 등록된 회원일 경우 이메일 내용
        const text = `귀하의 새로운 비밀번호는 ${newPassword} 입니다. 로그인 후 비밀번호를 변경해주세요.`;
        await sendMail(email, subject, text);
        return;
    }

    static async deleteUser({ user_id }) {
        await User.deleteById({ user_id });
        return;
    }
}

export { UserService };
