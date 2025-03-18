const ProfileFormHeader = ({ title }: { title: string }) => {
  return (
    <div className="profile-edit__header">
      <img
        src="/assets/edit.svg"
        width={36}
        height={36}
        alt="edit"
        className="invert-white"
      />
      <h2 className="profile-edit__title">{title}</h2>
    </div>
  );
};

export default ProfileFormHeader;
