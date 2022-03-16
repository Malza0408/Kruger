import React, { useState } from 'react';

import AwardCard from './AwardCard';
import AwardEditForm from './AwardEditForm';

const Award = ({ award, setAwards, isEditable }) => {
  // useState 훅을 통해 isEditing 상태를 생성함.
  const [isEditing, setIsEditing] = useState(false);

  return (
    <>
      {/* 편집 상태일때는 AwardEditForm을 렌더링 아닐때는 AwardCard를 렌더링 */}
      {isEditing ? (
        <AwardEditForm
          setIsEditing={setIsEditing}
          award={award}
          setAwards={setAwards}
        />
      ) : (
        <AwardCard
          setIsEditing={setIsEditing}
          award={award}
          isEditable={isEditable}
        />
      )}
    </>
  );
};

export default Award;
