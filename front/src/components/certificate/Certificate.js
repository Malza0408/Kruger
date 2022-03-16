import React, { useState } from 'react';

import CertificateEditForm from './CertificateEditForm';
import CertificateCard from './CertificateCard';


const Certificate = ({ certificate, setCertificate, portfolioOwnerId, isEditable }) => {
    // DB get 전 로컬 테스트 데이터. 추후 삭제
    // const [certificate, setCertificate] = useState({
    //     id: 'ff9c3279-bbfe-4f9c-8cab-f0f399e6e358',
    //     title: '운전면허',
    //     description: '운전 잘 함',
    //     date: '2022-03-15'
    // });

    const [isEditing, setIsEditing] = useState(false);

    return (
        <>
            {isEditing ? (
                <CertificateEditForm
                    certificate={certificate}
                    setIsEditing={setIsEditing}
                    setCertificate={setCertificate}
                />
            ) : (
                <CertificateCard
                    certificate={certificate}
                    setIsEditing={setIsEditing}
                    isEditable={isEditable}
                />
            )}
        </>
    );
};

export default Certificate;
