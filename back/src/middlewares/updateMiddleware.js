function updateMiddleware(req, res, next) {
    const { name, email, password, description, picture } = req.body ?? null;
    const { title, date, from_date, to_date } = req.body ?? null;
    const { school, major, position } = req.body ?? null;
    const toUpdate = {};

    try {
        if (name !== null && name !== undefined && name.length !== 0)
            toUpdate.name = name;
        if (email !== null && email !== undefined && email.length !== 0)
            toUpdate.email = email;
        if (
            password !== null &&
            password !== undefined &&
            password.length !== 0
        )
            toUpdate.password = password;
        if (
            description !== null &&
            description !== undefined &&
            description.length !== 0
        )
            toUpdate.description = description;
        if (picture !== null && picture !== undefined && picture.length !== 0)
            toUpdate.picture = picture;
        if (title !== null && title !== undefined && title.length !== 0)
            toUpdate.title = title;
        if (date !== null && date !== undefined && date.length !== 0)
            toUpdate.date = date;
        if (
            from_date !== null &&
            from_date !== undefined &&
            from_date.length !== 0
        )
            toUpdate.from_date = from_date;
        if (to_date !== null && to_date !== undefined && to_date.length !== 0)
            toUpdate.to_date = to_date;
        if (school !== null && school !== undefined && school.length !== 0)
            toUpdate.school = school;
        if (major !== null && major !== undefined && major.length !== 0)
            toUpdate.major = major;
        if (
            position !== null &&
            position !== undefined &&
            position.length !== 0
        )
            toUpdate.position = position;

        const keys = Object.keys(toUpdate);
        if (keys.length === 0) {
            const errorMessage = '수정할 내용이 없습니다.';
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
