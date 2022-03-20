function updateMiddleware(req, res, next) {
    const { name, email, password, description, picture } = req.body ?? null;
    const { title, date, from_date, to_date } = req.body ?? null;
    const { school, major, position } = req.body ?? null;
    const toUpdate = {};

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
        if (school !== null && school !== undefined && school.length !== 0)
            toUpdate.school = school;
        if (major !== null && major !== undefined && major.length !== 0)
            toUpdate.major = major;
        if (position !== null && position !== undefined && school.length !== 0)
            toUpdate.position = position;

        req.toUpdate = toUpdate;

        next();
    } catch (error) {
        res.status(400).send('이 방법이 아닌 듯');
        return;
    }
}

export { updateMiddleware };
