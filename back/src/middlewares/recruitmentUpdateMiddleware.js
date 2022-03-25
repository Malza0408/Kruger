function recruitmentUpdateMiddleware(req, res, next) {
    const { title, detail, content, language } = req.body ?? null;

    try {
        if (title === null || title === undefined) {
            const { title, ...restUpdate } = req.body;
            req.body = restUpdate;
        }
        if (detail !== null && detail !== undefined) {
            const { detail, ...restUpdate } = req.body;
            req.body = restUpdate;
        }
        if (content !== null && content !== undefined) {
            const { content, restUpdate } = req.body;
            req.body = restUpdate;
        }
        if (language !== null && language !== undefined) {
            const { language, restUpdate } = req.body;
            req.body = restUpdate;
        }

        const values = Object.values(req.body);
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

export { recruitmentUpdateMiddleware };
