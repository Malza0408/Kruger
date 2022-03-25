function profileUpdateMiddleware(req, res, next) {
    const { title, date, from_date, to_date, description } = req.body ?? null;

    try {
        if (description === null || description === undefined) {
            const { description, ...restUpdate } = req.body;
            req.body = restUpdate;
        }
        if (title === null || title === undefined) {
            const { title, ...restUpdate } = req.body;
            req.body = restUpdate;
        }
        if (date === null || date === undefined) {
            const { date, ...restUpdate } = req.body;
            req.body = restUpdate;
        }
        if (from_date === null || from_date === undefined) {
            const { from_date, ...restUpdate } = req.body;
            req.body = restUpdate;
        }
        if (to_date === null || to_date === undefined) {
            const { to_date, ...restUpdate } = req.body;
            req.body = restUpdate;
        }

        const values = Object.values(req.body);

        if (values.length === 0) {
            const errorMessage = '수정할 내용이 없습니다.';
            return res.status(400).json(errorMessage);
        }

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

export { profileUpdateMiddleware };
