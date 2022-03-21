function updateMiddleware(req, res, next) {
    const { name, email, password, description, picture } = req.body ?? null;
    const { title, date, from_date, to_date } = req.body ?? null;
    const { school, major, position } = req.body ?? null;
    let toUpdate = {};

    try {
        if (name !== null && name !== undefined) toUpdate.name = name;
        if (email !== null && email !== undefined) toUpdate.email = email;
        if (password !== null && password !== undefined)
            toUpdate.password = password;
        if (description !== null && description !== undefined)
            toUpdate.description = description;
        if (picture !== null && picture !== undefined)
            toUpdate.picture = picture;
        if (title !== null && title !== undefined) toUpdate.title = title;
        if (date !== null && date !== undefined) toUpdate.date = date;
        if (from_date !== null && from_date !== undefined)
            toUpdate.from_date = from_date;
        if (to_date !== null && to_date !== undefined)
            toUpdate.to_date = to_date;
        if (school !== null && school !== undefined) toUpdate.school = school;
        if (major !== null && major !== undefined) toUpdate.major = major;
        if (position !== null && position !== undefined)
            toUpdate.position = position;

        const values = Object.values(toUpdate);
        console.log('toUpdate : ', toUpdate);
        if (values.length === 0) {
            const errorMessage = '수정할 내용이 없습니다.';
            res.status(400).json(errorMessage);
            return;
        }

        if (toUpdate.major) {
            if (toUpdate.major.first === '') {
                const errorMessage = '빈칸은 ㄴㄴ';
                res.status(400).json(errorMessage);
                return;
            }
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

export { updateMiddleware };
