import { useNavigate } from "react-router-dom";

const Comment = ({
  postUserId,
  firstName,
  lastName,
  userPicturePath,
  comment,
}) => {
  const navigate = useNavigate();

  return (
    <div className="flex gap-4 py-3 border-t">
      <img
        className="rounded-full w-[40px] h-[40px] max-w-[40px] max-h-[40px] object-cover"
        src={`http://localhost:3001/assets/${userPicturePath}`}
      />
      <div className="flex flex-col gap-1">
        <p
          className="font-bold text-sm hover:text-gray-500 cursor-pointer"
          onClick={() => {
            navigate(`/profile/${postUserId}`);
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
