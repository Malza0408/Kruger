function userUpdateMiddleware(req, res, next) {
    const { name, email, password, description, picture } = req.body ?? null;

    try {
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

        const values = Object.values(req.body);
        console.log('toUpdate : ', req.body);
        if (values.length === 0) {
            const errorMessage = '수정할 내용이 없습니다.';
            res.status(400).json(errorMessage);
            return;
        }

        if (values.includes('')) {
            const errorMessage = '빈칸은 ㄴㄴ.';
            res.status(400).json(errorMessage);
            return;
        }

        next();
    } catch (error) {
        res.status(400).send('이 방법이 아닌 듯');
        return;
    }
}

export { userUpdateMiddleware };
