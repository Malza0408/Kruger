function updateMiddleware(req, res, next) {
    const { name, email, password, description, picture } = req.body ?? null;
    const { title, date, from_date, to_date } = req.body ?? null;
    const { school, major, position } = req.body ?? null;
    let toUpdate = {};

    try {
        // if (name !== null && name !== undefined && name.length !== 0)
        //     toUpdate.name = name;
        // if (email !== null && email !== undefined && email.length !== 0)
        //     toUpdate.email = email;
        // if (
        //     password !== null &&
        //     password !== undefined &&
        //     password.length !== 0
        // )
        //     toUpdate.password = password;
        // if (
        //     description !== null &&
        //     description !== undefined &&
        //     description.length !== 0
        // )
        //     toUpdate.description = description;
        // if (picture !== null && picture !== undefined && picture.length !== 0)
        //     toUpdate.picture = picture;
        // if (title !== null && title !== undefined && title.length !== 0)
        //     toUpdate.title = title;
        // if (date !== null && date !== undefined && date.length !== 0)
        //     toUpdate.date = date;
        // if (
        //     from_date !== null &&
        //     from_date !== undefined &&
        //     from_date.length !== 0
        // )
        //     toUpdate.from_date = from_date;
        // if (to_date !== null && to_date !== undefined && to_date.length !== 0)
        //     toUpdate.to_date = to_date;
        // if (school !== null && school !== undefined && school.length !== 0)
        //     toUpdate.school = school;
        // if (major !== null && major !== undefined && major.length !== 0)
        //     toUpdate.major = major;
        // if (
        //     position !== null &&
        //     position !== undefined &&
        //     position.length !== 0
        // )
        //     toUpdate.position = position;

        // if (name === null || name === undefined || name.length === 0) {
        //     // return res.status(400).json({
        //     //     data: null,
        //     //     code: 400,
        //     //     message: '학교를 입력해주세요.'
        //     // });
        //     const errorMessage = '성함을 입력해주세요.';
        //     return res.status(400).json(errorMessage);
        // }
        // toUpdate.name = name;
        // if (email === null || email === undefined || email.length === 0) {
        //     // return res.status(400).json({
        //     //     data: null,
        //     //     code: 400,
        //     //     message: '학교를 입력해주세요.'
        //     // });
        //     const errorMessage = '이메일을 입력해주세요.';
        //     return res.status(400).json(errorMessage);
        // }
        // toUpdate.email = email;
        // if (
        //     password === null ||
        //     password === undefined ||
        //     password.length === 0
        // ) {
        //     // return res.status(400).json({
        //     //     data: null,
        //     //     code: 400,
        //     //     message: '학교를 입력해주세요.'
        //     // });
        //     const errorMessage = '비밀번호를 입력해주세요.';
        //     return res.status(400).json(errorMessage);
        // }
        // toUpdate.password = password;
        // if (
        //     description === null ||
        //     description === undefined ||
        //     description.length === 0
        // ) {
        //     // return res.status(400).json({
        //     //     data: null,
        //     //     code: 400,
        //     //     message: '학교를 입력해주세요.'
        //     // });
        //     const errorMessage = '설명을 입력해주세요.';
        //     return res.status(400).json(errorMessage);
        // }
        // toUpdate.description = description;
        // if (picture === null || picture === undefined || picture.length === 0) {
        //     // return res.status(400).json({
        //     //     data: null,
        //     //     code: 400,
        //     //     message: '학교를 입력해주세요.'
        //     // });
        //     const errorMessage = '소스를 입력해주세요.';
        //     return res.status(400).json(errorMessage);
        // }
        // toUpdate.picture = picture;
        // if (title === null || title === undefined || title.length === 0) {
        //     // return res.status(400).json({
        //     //     data: null,
        //     //     code: 400,
        //     //     message: '학교를 입력해주세요.'
        //     // });
        //     const errorMessage = '제목을 입력해주세요.';
        //     return res.status(400).json(errorMessage);
        // }
        // toUpdate.title = title;
        // if (date === null || date === undefined || date.length === 0) {
        //     // return res.status(400).json({
        //     //     data: null,
        //     //     code: 400,
        //     //     message: '학교를 입력해주세요.'
        //     // });
        //     const errorMessage = '날짜를 입력해주세요.';
        //     return res.status(400).json(errorMessage);
        // }
        // toUpdate.date = date;
        // if (
        //     from_date === null ||
        //     from_date === undefined ||
        //     from_date.length === 0
        // ) {
        //     // return res.status(400).json({
        //     //     data: null,
        //     //     code: 400,
        //     //     message: '학교를 입력해주세요.'
        //     // });
        //     const errorMessage = '시작날짜를 입력해주세요.';
        //     return res.status(400).json(errorMessage);
        // }
        // toUpdate.from_date = from_date;
        // if (to_date === null || to_date === undefined || to_date.length === 0) {
        //     // return res.status(400).json({
        //     //     data: null,
        //     //     code: 400,
        //     //     message: '학교를 입력해주세요.'
        //     // });
        //     const errorMessage = '끝날짜를 입력해주세요.';
        //     return res.status(400).json(errorMessage);
        // }
        // toUpdate.to_date = to_date;
        // if (school === null || school === undefined || school.length === 0) {
        //     // return res.status(400).json({
        //     //     data: null,
        //     //     code: 400,
        //     //     message: '학교를 입력해주세요.'
        //     // });
        //     const errorMessage = '학교를 입력해주세요.';
        //     return res.status(400).json(errorMessage);
        // }
        // toUpdate.school = school;
        // if (major === null || major === undefined || major.length === 0) {
        //     // return res.status(400).json({
        //     //     data: null,
        //     //     code: 400,
        //     //     message: '전공을 입력해주세요.'
        //     // });
        //     const errorMessage = '전공을 입력해주세요.';
        //     return res.status(400).json(errorMessage);
        // }
        // toUpdate.major = major;
        // if (
        //     position === null ||
        //     position === undefined ||
        //     position.length === 0
        // ) {
        //     // return res.status(400).json({
        //     //     data: null,
        //     //     code: 400,
        //     //     message: '상태를 입력해주세요.'
        //     // });
        //     const errorMessage = '포지션을 입력해주세요.';
        //     return res.status(400).json(errorMessage);
        // }
        // toUpdate.position = position;

        // const keys = Object.keys(toUpdate);
        // console.log('toUpdate : ', toUpdate);
        // if (keys.length === 0) {
        //     const errorMessage = '수정할 내용이 없습니다.';
        //     res.status(400).json(errorMessage);
        //     return;
        // }

        const requestBody = req.body;
        toUpdate = Object.values(requestBody);
        if (toUpdate.includes('')) {
            const errorMessage = '빈칸은 ㄴㄴ.';
            return res.status(400).json(errorMessage);
        }
        // console.log('여기!', Object.keys(requestBody));
        req.toUpdate = requestBody;
        next();
    } catch (error) {
        res.status(400).send('이 방법이 아닌 듯');
        return;
    }
}

export { updateMiddleware };
