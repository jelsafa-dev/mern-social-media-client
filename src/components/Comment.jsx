import { useNavigate } from "react-router-dom";

const Comment = ({ userId, firstName, lastName, userPicturePath, comment }) => {
  const API_URL = process.env.REACT_APP_API_URL;
  const navigate = useNavigate();

  return (
    <div className="flex gap-4 py-3 border-t">
      <img
        className="rounded-full w-[35px] h-[35px] max-w-[35px] max-h-[35px] object-cover"
        src={`${API_URL}/assets/${userPicturePath}`}
      />
      <div className="flex flex-col gap-1">
        <p
          className="font-bold text-sm hover:text-gray-500 cursor-pointer"
          onClick={() => {
            navigate(`/profile/${userId}`);
          }}
        >
          {firstName} {lastName}
        </p>
        <p className="text-sm text-gray-500 dark:text-gray-50">{comment}</p>
      </div>
    </div>
  );
};

export default Comment;
