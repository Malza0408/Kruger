import { reset } from 'nodemon';

function languageMiddleware(req, res, next) {
    const { language } = req.body;
    try {
        // js, ts, react, node,  vue, python, django
        const languageType = [
            'js',
            'ts',
            'react',
            'node',
            'vue',
            'python',
            'django'
        ];

        language.map((v) => {
            if (languageType.indexOf(v) === -1) {
                res.status(400).json('지원하는 언어가 아닙니다.');
            }
        });

        next();
    } catch (error) {
        res.status(400).json('이 방법이 아닌듯');
    }
}

export { languageMiddleware };
