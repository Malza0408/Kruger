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

        language.map((v) => {
            if (languageType.indexOf(v) === -1) {
                res.status(400).json('지원하는 언어가 아닙니다.');
            }
        });

        next();
    } catch (error) {
        res.status(400).json('이 방법이 아닌가봐');
    }
}

export { languageMiddleware };
