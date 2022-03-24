const useGetLangFromDropDown = ({ langInputValue, setLangInputValue }) => {
    return (lang) => {
        if (!langInputValue.length) {
            setLangInputValue((current) => {
                return current + `${lang}`;
            });
        } else {
            setLangInputValue((current) => {
                return current + ` / ${lang}`;
            });
        }
    };
};

export default useGetLangFromDropDown;
