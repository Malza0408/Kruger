function profileUpdateMiddleware(req, res, next) {
    const { title, date, from_date, to_date, description } = req.body ?? null;
    let toUpdate = {};

    try {
        if (description !== null && description !== undefined)
            toUpdate.description = description;
        if (title !== null && title !== undefined) toUpdate.title = title;
        if (date !== null && date !== undefined) toUpdate.date = date;
        if (from_date !== null && from_date !== undefined)
            toUpdate.from_date = from_date;
        if (to_date !== null && to_date !== undefined)
            toUpdate.to_date = to_date;

        const values = Object.values(toUpdate);

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

export { profileUpdateMiddleware };
