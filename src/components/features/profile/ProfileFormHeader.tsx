import React from "react";

const ProfileFormHeader = ({ title }) => {
  return (
    <div className="form-page__header">
      <img
        src="/assets/edit.svg"
        width={36}
        height={36}
        alt="edit"
        className="invert-white"
      />
      <h2 className="form-page__title">{title}</h2>
    </div>
  );
};

export default ProfileFormHeader;
