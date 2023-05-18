import React from 'react';

const OfferBadges = ({ badgeList }) => {
  return (
    <div className="flex flex-row gap-2">
      {badgeList.map((badge, index) => {
        return <div className="badge text-[.8rem]">{badge.toUpperCase()}</div>;
      })}
    </div>
  );
};

export default OfferBadges;
