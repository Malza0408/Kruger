function educationUpdateMiddleware(req, res, next) {
    const { school, major, position } = req.body ?? null;
    let toUpdate = {};

    try {
        if (school !== null && school !== undefined) toUpdate.school = school;
        if (major !== null && major !== undefined) toUpdate.major = major;
        if (position !== null && position !== undefined)
            toUpdate.position = position;

        const values = Object.values(toUpdate);
        console.log('toUpdate : ', toUpdate);
        const positionArray = ['재학중', '학사졸업', '석사졸업', '박사졸업'];
        if (toUpdate.position && !positionArray.includes(toUpdate.position)) {
            const errorMessage = '잘못된 학위명입니다.';
            res.status(400).json(errorMessage);
        }

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

export { educationUpdateMiddleware };
