import { useCallback } from 'react';

const useConditionalImgs = ({
    setTraceFocusing,
    setImgs,
    imgs,
    traceFocusing,
    filteringLanguage
}) => {
    const conditionalImgs = useCallback(
        (index) => {
            return () => {
                const newItem = [...imgs];
                // 언어가 한개도 선택되지 않은 경우 하나 선택된다.
                if (traceFocusing === 0) {
                    newItem.forEach((item) => {
                        item.isFocusing = false;
                    });
                    newItem[index].isFocusing = true;
                    setTraceFocusing(1);
                    setImgs(newItem);
                    filteringLanguage(newItem[index].language);
                    // 하나의 언어가 선택된 경우에
                } else if (traceFocusing === 1) {
                    // 이미 선택되어 있던 언어를 선택했다면 focusing을 없앤다.
                    if (newItem[index].isFocusing === true) {
                        newItem.forEach((item) => {
                            item.isFocusing = true;
                        });
                        setTraceFocusing(0);
                        setImgs(newItem);
                        filteringLanguage('none');
                        // 새로운 언어를 선택했다면 focusing을 추가해 준다.
                    } else {
                        newItem[index].isFocusing = true;
                        setTraceFocusing((current) => current + 1);
                        setImgs(newItem);
                        filteringLanguage(newItem[index].language);
                    }
                    // 두개 이상의 언어가 선택되어 있는 경우에
                } else {
                    // 이미 선택되어 있던 언어였다면 focusing을 없앤다.
                    if (newItem[index].isFocusing === true) {
                        newItem[index].isFocusing = false;
                        setTraceFocusing((current) => current - 1);
                        setImgs(newItem);
                        filteringLanguage(newItem[index].language, false);
                        // 새로운 언어를 선택했다면 focusing을 추가해 준다.
                    } else {
                        newItem[index].isFocusing = true;
                        setTraceFocusing((current) => current + 1);
                        setImgs(newItem);
                        filteringLanguage(newItem[index].language);
                    }
                }
            };
        },
        [filteringLanguage, imgs, setImgs, setTraceFocusing, traceFocusing]
    );

    return conditionalImgs;
};

export default useConditionalImgs;
