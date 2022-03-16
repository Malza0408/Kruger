import React, { useState } from 'react';
import { Card, Button } from 'react-bootstrap';
import EducationBody from './EducationBody';

const Education = ({ portfolioOwnerId, isEditable }) => {
    const [educationBody, setEducationBody] = useState([]);

    // + 버튼으로 추가하면 EducationBody 추가해준다.
    const addEducation = () => {
        setEducationBody([
            ...educationBody,
            <EducationBody key={educationBody.length} />,
        ]);
    };
    return (
        <Card>
            <Card.Body>
                <EducationBody portfolioOwnerId={portfolioOwnerId} />
                {/* + 버튼으로 추가하면 educationBody 배열로 들어간다. 배열을 돌면서 렌더링 */}
                {educationBody?.map((body, index) => {
                    return body;
                })}
                {/* Education을 추가하는 버튼 */}
                <div className='mt-3 text-center mb-1'>
                    <div className='col-sm-12'>
                        <Button variant='primary' onClick={addEducation}>
                            +
                        </Button>
                    </div>
                </div>
            </Card.Body>
        </Card>
    );
};

export default Education;
