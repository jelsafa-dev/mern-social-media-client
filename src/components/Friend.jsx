import { PersonAddOutlined, PersonRemoveOutlined } from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setFriends } from "state";

const Friend = ({ friendId, name, subtitle, userPicturePath }) => {
  const API_URL = process.env.REACT_APP_API_URL;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { _id } = useSelector((state) => state.user);
  const token = useSelector((state) => state.token);
  const friends = useSelector((state) => state.user.friends);

  if (!Array.isArray(friends)) return null;

  const isFriend = friends.find((friend) => friend._id === friendId);
  const isUser = friendId === _id;

  const patchFriend = async () => {
    const response = await fetch(`${API_URL}/users/${_id}/${friendId}`, {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    dispatch(setFriends({ friends: data }));
  };

  return (
    <div className="flex justify-between items-center">
      <div
        className="flex justify-between items-center gap-4 cursor-pointer"
        onClick={() => {
          navigate(`/profile/${friendId}`);
          navigate(0);
        }}
      >
        <img
          className={`max-h-[40px] max-w-[40px] h-[40px] w-[40px] object-cover rounded-full`}
          alt="user"
          src={`${API_URL}/assets/${userPicturePath}`}
        />
        <div className="flex flex-col gap-1">
          <h5 className="font-semibold text-gray-500 text-base">{name}</h5>
          <span className="text-xs text-gray-400">{subtitle}</span>
        </div>
      </div>
      {!isUser && (
        <button
          className="bg-indigo-500 hover:bg-indigo-600 p-2 rounded-full shadow hidden md:block"
          onClick={() => patchFriend()}
        >
          {isFriend ? (
            <PersonRemoveOutlined className="text-white" />
          ) : (
            <PersonAddOutlined className="text-white" />
          )}
        </button>
      )}
    </div>
  );
};

export default Friend;
