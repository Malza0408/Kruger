import React, { useContext, useEffect, useState } from 'react';
import { Row, Col } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { get } from '../../api';
import { UserStateContext } from '../../App';
import useConditionalImgs from '../../custom/useConditionalImgs';
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

    // 내가 고른 언어가 무엇인지 보고,
    const filteringLanguage = useFilteringLanguage({
        setFilteredLanguage,
        setFilteredProjects,
        filteredLanguage,
        projects,
        filteredProjects
    });

    // 이미지의 classname은 condition에 따라 달라진다.
    // 클릭한 이미지의 focus를 바꿔주고, 몇개를 바꿨는지 추적한다.
    const conditionalImgs = useConditionalImgs({
        setTraceFocusing,
        setImgs,
        imgs,
        traceFocusing,
        filteringLanguage
    });

    useEffect(() => {
        if (!userState.user) {
            navigate('/login');
        }

        const getRecruits = async () => {
            try {
                const recruitlist = await get('recruitlist');
                setProjects([...recruitlist.data]);
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
                                onClick={conditionalImgs(index)}
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
