import { useCallback } from 'react';

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
                        newFilteredLang.push(language);
                        const filtered = newFilteredLang
                            .map((lang) => {
                                const filteredP = projects.filter((project) => {
                                    return project.language.includes(lang);
                                });
                                return filteredP;
                            })
                            .flat();
                        const set = new Set(filtered);
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
