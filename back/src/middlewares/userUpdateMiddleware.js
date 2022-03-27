function userUpdateMiddleware(req, res, next) {
    const { name, email, password, description, picture } = req.body ?? null;

    try {
        // 해당 요소가 null이거나 undefined면 req.body에서 제거해줌
        if (description === null || description === undefined) {
            const { description, ...restUpdate } = req.body;
            req.body = restUpdate;
        }
        if (name === null || name === undefined) {
            const { name, ...restUpdate } = req.body;
            req.body = restUpdate;
        }
        if (email === null || email === undefined) {
            const { email, ...restUpdate } = req.body;
            req.body = restUpdate;
        }
        if (password === null || password === undefined) {
            const { password, ...restUpdate } = req.body;
            req.body = restUpdate;
        }
        if (picture === null || picture === undefined) {
            const { picture, ...restUpdate } = req.body;
            req.body = restUpdate;
        }

        // req.body의 값들의 배열을 만들어줌
        const values = Object.values(req.body);

        // 수정할 내용이 없으면 오류처리
        if (values.length === 0) {
            const errorMessage = '수정할 내용이 없습니다.';
            return res.status(400).json(errorMessage);
        }

        // 하나라도 빈칸("")이 있을 경우 오류처리
        if (values.includes('')) {
            const errorMessage = '빈칸은 ㄴㄴ.';
            return res.status(400).json(errorMessage);
        }

        next();
    } catch (error) {
        res.status(400).send('이 방법이 아닌 듯');
        return;
    }
}

export { userUpdateMiddleware };
