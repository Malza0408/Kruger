import React, { useState } from 'react';

import AwardCard from './AwardCard';
import AwardEditForm from './AwardEditForm';

const Award = ({ key, award, awards, setAwards }) => {
  // useState 훅을 통해 isEditing 상태를 생성함.
  const [isEditing, setIsEditing] = useState(false);

  return (
    <>
      {isEditing ? (
        <AwardEditForm
          key={key}
          setIsEditing={setIsEditing}
          award={award}
          awards={awards}
          setAwards={setAwards}
        />
      ) : (
        <AwardCard setIsEditing={setIsEditing} award={award} />
      )}
    </>
  );
};

export default Award;
