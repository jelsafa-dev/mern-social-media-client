const UserImage = ({ image }) => {
  return (
    <div className={`max-h-[55px] max-w-[55px] h-[55px] w-[55px]`}>
      <img
        className={`max-h-[55px] max-w-[55px] h-[55px] w-[55px] object-cover rounded-full`}
        alt="user"
        src={`http://localhost:3001/assets/user.jpeg`}
      />
    </div>
  );
};

export default UserImage;
