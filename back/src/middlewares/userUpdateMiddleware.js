function userUpdateMiddleware(req, res, next) {
    const { name, email, password, description, picture } = req.body ?? null;
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

export { userUpdateMiddleware };
