import React, { useState } from 'react';

import CertificateEditForm from './CertificateEditForm';
import CertificateCard from './CertificateCard';

const Certificate = () => {
    const [certificate, setCertificate] = useState({
        // DB get 전 로컬 테스트 데이터
        title: '운전면허', 
        description: '운전 잘 함', 
        date: '2022-03-15'
    });
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
                    // isEditable={isEditable}
                />
            )}
        </>
    );
};

export default Certificate;
