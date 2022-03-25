function educationUpdateMiddleware(req, res, next) {
    const { school, major, position } = req.body ?? null;

    try {
        if (school === null || school === undefined) {
            const { school, ...restUpdate } = req.body;
            req.body = restUpdate;
            console.log(req.body);
        }
        if (major === null || major === undefined) {
            const { major, ...restUpdate } = req.body;
            req.body = restUpdate;
        }
        if (position === null || position === undefined) {
            const { position, ...restUpdate } = req.body;
            req.body = restUpdate;
        }

        const values = Object.values(toUpdate);

        const positionArray = ['재학중', '학사졸업', '석사졸업', '박사졸업'];
        if (req.body.position && !positionArray.includes(req.body.position)) {
            const errorMessage = '잘못된 학위명입니다.';
            return res.status(400).json(errorMessage);
        }

        if (values.length === 0) {
            const errorMessage = '수정할 내용이 없습니다.';
            return res.status(400).json(errorMessage);
        }

        if (req.body.major) {
            if (req.body.major.first === '') {
                const errorMessage = '빈칸은 ㄴㄴ';
                return res.status(400).json(errorMessage);
            }
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

export { educationUpdateMiddleware };
