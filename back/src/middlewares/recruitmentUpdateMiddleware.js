function recruitmentUpdateMiddleware(req, res, next) {
    const { title, detail, content, language } = req.body ?? null;
    let toUpdate = {};

    try {
        if (title !== null && title !== undefined) toUpdate.title = title;
        if (detail !== null && detail !== undefined) toUpdate.detail = detail;
        if (content !== null && content !== undefined)
            toUpdate.content = content;
        if (language !== null && language !== undefined)
            toUpdate.language = language;

        const values = Object.values(toUpdate);
        console.log('toUpdate : ', toUpdate);
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

        req.toUpdate = toUpdate;
        next();
    } catch (error) {
        res.status(400).send('이 방법이 아닌 듯');
        return;
    }
}

export { recruitmentUpdateMiddleware };
