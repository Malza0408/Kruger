const InputEmpty = (e) => {
    return (
        {
            isTitleEmpty: !(e?.title), 
            isDescriptionEmpty: !(e?.description),
            isSchoolEmpty: !(e?.school), 
            isMajorEmpty: !(e?.major), 
            isPositionEmpty: !(e?.position), 
        }
    )
}

export default InputEmpty;
