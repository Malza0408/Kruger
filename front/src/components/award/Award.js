import React, { useState } from 'react';

import AwardCard from './AwardCard';
import AwardEditForm from './AwardEditForm';

const Award = ({ isEditing, setIsEditing, isAdding, setIsAdding }) => {
  return (
    <>
      {isEditing ? (
        <AwardEditForm setIsEditing={setIsEditing} />
      ) : (
        <AwardCard
          setIsEditing={setIsEditing}
          isAdding={isAdding}
          setIsAdding={setIsAdding}
        />
      )}
    </>
  );
};

export default Award;
