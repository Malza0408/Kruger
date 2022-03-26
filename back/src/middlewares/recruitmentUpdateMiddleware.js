function recruitmentUpdateMiddleware(req, res, next) {
    const { title, detail, content, language } = req.body ?? null;
    console.log(req.body);

    try {
        // 해당 요소가 null이거나 undefined면 req.body에서 제거해줌
        if (detail === null || detail === undefined) {
            const { detail, ...restUpdate } = req.body;
            req.body = restUpdate;
        }
        if (title === null || title === undefined) {
            const { title, ...restUpdate } = req.body;
            req.body = restUpdate;
        }
        if (content === null || content === undefined) {
            const { content, ...restUpdate } = req.body;
            req.body = restUpdate;
        }
        if (language === null || language === undefined) {
            const { language, ...restUpdate } = req.body;
            req.body = restUpdate;
        }

        // req.body의 값들의 배열을 만들어줌
        const values = Object.values(req.body);
        if (values.length === 0) {
            const errorMessage = '수정할 내용이 없습니다.';
            return res.status(400).json(errorMessage);
        }

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

export { recruitmentUpdateMiddleware };
