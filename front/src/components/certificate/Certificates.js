import React, { useState } from 'react';
import { Card } from 'react-bootstrap';

import Certificate from './Certificate';

const Certificates = () => {
    return (
        <>
            <Card>
                <Card.Body>
                    <Card.Title>자격증</Card.Title>
                    <Certificate />
                </Card.Body>
            </Card>
        </>
    );
};

export default Certificates;
