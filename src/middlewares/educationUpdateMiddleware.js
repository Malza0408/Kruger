function educationUpdateMiddleware(req, res, next) {
    const { school, major, position } = req.body ?? null;

    try {
        // 해당 요소가 null이거나 undefined면 req.body에서 제거해줌
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

        // req.body의 값들의 배열을 만들어줌
        const values = Object.values(req.body);

        //req.body에 있는 position이 정해진 요소 중 하나가 아니면 오류처리
        const positionArray = ['재학중', '학사졸업', '석사졸업', '박사졸업'];
        if (req.body.position && !positionArray.includes(req.body.position)) {
            const errorMessage = '잘못된 학위명입니다.';
            return res.status(400).json(errorMessage);
        }

        // 수정할 내용이 없으면 오류처리
        if (values.length === 0) {
            const errorMessage = '수정할 내용이 없습니다.';
            return res.status(400).json(errorMessage);
        }

        // 전공이 비어있을 경우 오류처리(이중전공은 제외)
        if (req.body.major) {
            if (req.body.major.first === '') {
                const errorMessage = '빈칸은 ㄴㄴ';
                return res.status(400).json(errorMessage);
            }
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

export { educationUpdateMiddleware };
