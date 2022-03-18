import React, { useEffect, useState } from 'react';
import { Card, Button } from 'react-bootstrap';
import Education from './Education';
import * as Api from '../../api';
import EducationAddForm from './EducationAddForm';

const Educations = ({ portfolioOwnerId, isEditable }) => {
    const [educations, setEducations] = useState([]);
    const [isAddState, setAddState] = useState(false);

    useEffect(() => {
        const getEducationList = async () => {
            const list = await Api.get(`educationlist/${portfolioOwnerId}`);
            setEducations([...list.data]);
        };
        console.log('테스트');
        getEducationList();
    }, [portfolioOwnerId]);

    const handleOnClick = () => {
        setAddState(true);
    };

    return (
        <Card>
            <Card.Body>
                <Card.Title>학력</Card.Title>
                {/* + 버튼으로 추가하면 educationBody 배열로 들어간다. 배열을 돌면서 렌더링 한다. */}
                {educations?.map((education) => {
                    return (
                        <Education
                            key={education.id}
                            education={education}
                            setEducations={setEducations}
                            isEditable={isEditable}
                        />
                    );
                })}
                {/* 학력을 추가하는 상태일때 렌더링 시킨다. */}
                {isAddState && (
                    <EducationAddForm
                        setAddState={setAddState}
                        setEducations={setEducations}
                        portfolioOwnerId={portfolioOwnerId}
                    />
                )}
                {/* 권한이 있을 경우에만 add 버튼을 활성화 시킨다. */}
                {isEditable && (
                    <div className='mt-3 text-center mb-1'>
                        <div className='col-sm-12'>
                            <Button variant='primary' onClick={handleOnClick}>
                                +
                            </Button>
                        </div>
                    </div>
                )}
            </Card.Body>
        </Card>
    );
};

export default Educations;
