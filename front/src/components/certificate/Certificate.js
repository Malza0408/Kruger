import React, { useState } from 'react';

import CertificateEditForm from './CertificateEditForm';
import CertificateCard from './CertificateCard';

const Certificate = ({ certificate, setCertificate, portfolioOwnerId, isEditable }) => {
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
