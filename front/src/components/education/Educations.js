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
            try {
                const list = await Api.get('educationlist', portfolioOwnerId);
                setEducations([...list.data]);
            } catch (error) {
                throw new Error(error);
            }
        };
        getEducationList();
    }, [portfolioOwnerId]);

    const handleOnClick = () => {
        setAddState(true);
    };

    return (
        <Card className="mvpCard">
            <Card.Body>
                <Card.Title className="mvpCardTitle">학력</Card.Title>
                {/* + 버튼으로 추가하면 educationBody 배열로 들어간다. 배열을 돌면서 렌더링 한다. */}
                {educations?.map((education) => {
                    return (
                        <Education
                            key={education.id}
                            portfolioOwnerId={portfolioOwnerId}
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
                    <div className="mt-3 text-center mb-4">
                        <div className="col-sm-12">
                            <Button
                                variant="primary"
                                onClick={handleOnClick}
                                className="mvpCardAddButton"
                            >
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
