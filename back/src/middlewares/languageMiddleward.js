function languageMiddleware(req, res, next) {
    try {
        const { language } = req.body;
        if (!language) {
            next();
            return;
        }
        // js, ts, react, node,  vue, python, django
        const languageType = [
            'JavaScript',
            'TypeScript',
            'Node.js',
            'React',
            'Vue',
            'Python',
            'Django'
        ];

        // languageType에 없는 언어가 있을 경우 오류처리
        for (const lan of language) {
            if (languageType.indexOf(lan) === -1) {
                const errorMessage = '지원하는 언어가 아닙니다.';
                return res.status(400).json(errorMessage);
            }
        }

        next();
    } catch (error) {
        res.status(400).json('이 방법이 아닌가봐');
    }
}

export { languageMiddleware };
