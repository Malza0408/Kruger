import React, { useContext, useEffect, useState } from 'react';
import { Row, Col } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { get } from '../../api';
import { UserStateContext } from '../../App';
import useFilteringLanguage from '../../custom/useFilteringLanguage';
import Gather from './Gather';

const Gathers = () => {
    // 얘네가 무슨 프로젝트인지 가지고 있을꺼임. 아마 배열로
    const navigate = useNavigate();
    const userState = useContext(UserStateContext);
    const [projects, setProjects] = useState([]);
    // 언어 이미지의 경로 및 상태
    const [imgs, setImgs] = useState([
        {
            src: `${process.env.PUBLIC_URL}/gatherImg/js.png`,
            isFocusing: true,
            language: 'JavaScript'
        },
        {
            src: `${process.env.PUBLIC_URL}/gatherImg/node.png`,
            isFocusing: true,
            language: 'Node.js'
        },
        {
            src: `${process.env.PUBLIC_URL}/gatherImg/react.png`,
            isFocusing: true,
            language: 'React'
        },
        {
            src: `${process.env.PUBLIC_URL}/gatherImg/ts.png`,
            isFocusing: true,
            language: 'TypeScript'
        },
        {
            src: `${process.env.PUBLIC_URL}/gatherImg/vue.png`,
            isFocusing: true,
            language: 'Vue'
        },
        {
            src: `${process.env.PUBLIC_URL}/gatherImg/python.png`,
            isFocusing: true,
            language: 'Python'
        },
        {
            src: `${process.env.PUBLIC_URL}/gatherImg/django.png`,
            isFocusing: true,
            language: 'Django'
        }
    ]);
    // 포커싱 된게 몇개인지 추적한다.
    const [traceFocusing, setTraceFocusing] = useState(0);
    const [filteredLanguage, setFilteredLanguage] = useState([]);
    const [filteredProjects, setFilteredProjects] = useState([]);
    const filteringLanguage = useFilteringLanguage({
        setFilteredLanguage,
        setFilteredProjects,
        filteredLanguage,
        projects,
        filteredProjects
    });

    useEffect(() => {
        if (!userState.user) {
            navigate('/login');
        }

        const getRecruits = async () => {
            try {
                // 여기에 Project 불러오는 로직
                const recruitlist = await get('recruitlist');
                setProjects([...recruitlist.data]);
                // console.log(recruitlist.data[0]);
            } catch (error) {
                throw new Error(error);
            }
        };

        getRecruits();
    }, [filteredProjects, navigate, userState.user]);
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
                {traceFocusing === 0
                    ? projects?.map((project, index) => {
                          return (
                              <Gather key={index} project={project}></Gather>
                          );
                      })
                    : filteredProjects?.map((project, index) => {
                          return (
                              <Gather key={index} project={project}></Gather>
                          );
                      })}
            </Row>
        </>
    );
};

export default Gathers;
