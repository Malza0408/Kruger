import React, { useEffect, useState } from 'react';
import { Row, Col } from 'react-bootstrap';
import * as Api from '../../api';
import Gather from './Gather';

const Gathers = (props) => {
    // 얘네가 무슨 프로젝트인지 가지고 있을꺼임. 아마 배열로
    const [projects, setProjects] = useState([
        {
            projects: ['js']
        },
        {
            projects: ['js', 'react']
        },
        {
            projects: ['node', 'react']
        },
        {
            projects: ['ts', 'react', 'node']
        },
        {
            projects: ['vue', 'node', 'js']
        },
        {
            projects: ['django', 'python']
        },
        {
            projects: ['python']
        },
        {
            projects: ['vue', 'ts']
        },
        {
            projects: ['node']
        },
        {
            projects: ['ts', 'js']
        },
        {
            projects: ['ts']
        }
    ]);
    // 언어 이미지의 경로 및 상태
    const [imgs, setImgs] = useState([
        {
            src: `${process.env.PUBLIC_URL}/gatherImg/js.png`,
            isFocusing: true,
            language: 'js'
        },
        {
            src: `${process.env.PUBLIC_URL}/gatherImg/node.png`,
            isFocusing: true,
            language: 'node'
        },
        {
            src: `${process.env.PUBLIC_URL}/gatherImg/react.png`,
            isFocusing: true,
            language: 'react'
        },
        {
            src: `${process.env.PUBLIC_URL}/gatherImg/ts.png`,
            isFocusing: true,
            language: 'ts'
        },
        {
            src: `${process.env.PUBLIC_URL}/gatherImg/vue.png`,
            isFocusing: true,
            language: 'vue'
        },
        {
            src: `${process.env.PUBLIC_URL}/gatherImg/python.png`,
            isFocusing: true,
            language: 'python'
        },
        {
            src: `${process.env.PUBLIC_URL}/gatherImg/django.png`,
            isFocusing: true,
            language: 'django'
        }
    ]);
    // 포커싱 된게 몇개인지 추적한다.
    const [traceFocusing, setTraceFocusing] = useState(0);
    const [filteredLanguage, setFilteredLanguage] = useState([]);
    const [filteredProjects, setFilteredProjects] = useState([]);
    const filteringLanguage = (language, isAddLanguage = true) => {
        if (language === 'none') {
            setFilteredLanguage([]);
            setFilteredProjects([]);
        } else {
            // 새로운 언어를 추가한다면
            if (isAddLanguage) {
                if (
                    filteredLanguage.find((element) => element === language) ===
                    undefined
                ) {
                    const newFilteredLang = [...filteredLanguage];
                    newFilteredLang.push(language);
                    const filterd = newFilteredLang
                        .map((lang) => {
                            const filteredP = projects.filter((project) => {
                                return project.projects.includes(lang);
                            });
                            return filteredP;
                        })
                        .flat();
                    console.log(filterd);

                    setFilteredProjects([...filterd]);
                    setFilteredLanguage(newFilteredLang);
                }
            } else {
                // 기존의 언어를 뺀다면
                const newFilteredLang = filteredLanguage.filter((lang) => {
                    return lang !== language;
                });
                const newFilteredProject = [...filteredProjects];
                const filtered = newFilteredProject.filter((project) => {
                    return !project.projects.includes(language);
                });
                // console.log(filtered);
                setFilteredLanguage(newFilteredLang);
                setFilteredProjects(filtered);
            }
        }
    };

    useEffect(() => {
        const getProjects = async () => {
            try {
                // 여기에 Project 불러오는 로직
                // const projects = await Api.get()
                // setProjects(projects);
            } catch (error) {
                throw new Error(error);
            }
        };
        // getProjects()
    }, []);
    return (
        <>
            <Row className="m-5">
                {imgs?.map((img, index) => {
                    return (
                        <Col key={index} className="text-center">
                            <img
                                src={img.src}
                                alt="languageItem"
                                width="66px"
                                height="66px"
                                className={`language-item${
                                    imgs[index].isFocusing === true
                                        ? ` onFocus`
                                        : ''
                                }`}
                                onClick={() => {
                                    const newItem = [...imgs];
                                    // 한개도 선택되지 않은 경우 하나 선택된다.
                                    if (traceFocusing === 0) {
                                        newItem.forEach((item) => {
                                            item.isFocusing = false;
                                        });
                                        newItem[index].isFocusing = true;
                                        setTraceFocusing(1);
                                        setImgs(newItem);
                                        filteringLanguage(
                                            newItem[index].language
                                        );
                                        // 하나가 선택된 경우에
                                    } else if (traceFocusing === 1) {
                                        // 이미 선택되어 있던 언어를 선택했다면 focusing을 없앤다.
                                        if (
                                            newItem[index].isFocusing === true
                                        ) {
                                            newItem.forEach((item) => {
                                                item.isFocusing = true;
                                            });
                                            setTraceFocusing(0);
                                            setImgs(newItem);
                                            filteringLanguage('none');
                                            // 새로운 언어를 선택했다면 focusing을 추가해 준다.
                                        } else {
                                            newItem[index].isFocusing = true;
                                            setTraceFocusing(
                                                (current) => current + 1
                                            );
                                            setImgs(newItem);
                                            filteringLanguage(
                                                newItem[index].language
                                            );
                                        }
                                        // 두개 이상이 선택되어 있는 경우에
                                    } else {
                                        // 이미 선택되어 있던 언어였다면 focusing을 없앤다.
                                        if (
                                            newItem[index].isFocusing === true
                                        ) {
                                            newItem[index].isFocusing = false;
                                            setTraceFocusing(
                                                (current) => current - 1
                                            );
                                            setImgs(newItem);
                                            filteringLanguage(
                                                newItem[index].language,
                                                false
                                            );
                                            // 새로운 언어를 선택했다면 focusing을 추가해 준다.
                                        } else {
                                            newItem[index].isFocusing = true;
                                            setTraceFocusing(
                                                (current) => current + 1
                                            );
                                            setImgs(newItem);
                                            filteringLanguage(
                                                newItem[index].language
                                            );
                                        }
                                    }
                                }}
                            ></img>
                        </Col>
                    );
                })}
            </Row>
            <Row xs="auto" className="jusify-content-center">
                {filteredProjects.length === 0
                    ? projects?.map((project, index) => {
                          return (
                              <Gather
                                  key={index}
                                  project={project.projects}
                              ></Gather>
                          );
                      })
                    : filteredProjects?.map((project, index) => {
                          return (
                              <Gather
                                  key={index}
                                  project={project.projects}
                              ></Gather>
                          );
                      })}
            </Row>
        </>
    );
};

export default Gathers;
