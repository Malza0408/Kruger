import { useCallback } from 'react';
/**
 *
 * @param {filteredLanguage: gatherRoom페이지에서 언어 아이콘을 클릭하면
 *          ['Javascript, Node.js, React ... '] 와 같이 추가된다.}
 * @param {projects: gatherRoom에 posting된 프로젝트가 담겨져 있다.}
 * @param {filteredProjects: filtering된 프로젝트를 렌더링 하기 위해 담는다.}
 * @returns
 */
const useFilteringLanguage = ({
    setFilteredLanguage,
    setFilteredProjects,
    filteredLanguage,
    projects,
    filteredProjects
}) => {
    const filteringLanguage = useCallback(
        (language, isAddLanguage = true) => {
            if (language === 'none') {
                setFilteredLanguage([]);
                setFilteredProjects([]);
            } else {
                // 새로운 언어를 추가한다면
                if (isAddLanguage) {
                    if (
                        filteredLanguage.find(
                            (element) => element === language
                        ) === undefined
                    ) {
                        const newFilteredLang = [...filteredLanguage];
                        // 새로운 언어 넣어주고
                        newFilteredLang.push(language);
                        // 언어를 포함하고 있는 프로젝트를 찾아서 필터된 프로젝트에 넣기 위함.
                        const filtered = newFilteredLang
                            .map((lang) => {
                                const filteredP = projects.filter((project) => {
                                    return project.language.includes(lang);
                                });
                                return filteredP;
                            })
                            .flat();
                        const set = new Set(filtered);
                        // 중복을 걸러주고 프로젝트와 언어 세팅
                        setFilteredProjects([...set]);
                        setFilteredLanguage(newFilteredLang);
                    }
                } else {
                    // 기존의 언어를 뺀다면
                    const newFilteredLang = filteredLanguage.filter((lang) => {
                        return lang !== language;
                    });
                    const newFilteredProject = [...filteredProjects];
                    const filtered = newFilteredLang
                        .map((lang) => {
                            const filteredP = newFilteredProject.filter(
                                (project) => {
                                    return project.language.includes(lang);
                                }
                            );
                            return filteredP;
                        })
                        .flat();
                    const set = new Set(filtered);
                    // console.log('빼기: ', set);
                    setFilteredProjects([...set]);
                    setFilteredLanguage(newFilteredLang);
                }
            }
        },
        [
            filteredLanguage,
            filteredProjects,
            projects,
            setFilteredLanguage,
            setFilteredProjects
        ]
    );

    return filteringLanguage;
};

export default useFilteringLanguage;
