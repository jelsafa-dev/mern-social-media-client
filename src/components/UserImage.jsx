const UserImage = ({ image }) => {
  const API_URL = process.env.REACT_APP_API_URL;
  const size = `max-h-[40px] max-w-[40px] h-[40px] w-[40px] lg:max-h-[55px] lg:max-w-[55px] lg:h-[55px] lg:w-[55px]`;
  return (
    <div className={size}>
      <img
        className={`${size} object-cover rounded-full`}
        alt="user"
        src={`${API_URL}/assets/${image}`}
      />
    </div>
  );
};

export default UserImage;
