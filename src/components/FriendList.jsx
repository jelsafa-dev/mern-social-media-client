import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setFriends } from "state";
import Friend from "./Friend";

const FriendList = ({ className, userId }) => {
  const dispatch = useDispatch();
  const token = useSelector((state) => state.token);
  const friends = useSelector((state) => state.user.friends);

  const getFriends = async () => {
    const response = await fetch(
      `http://localhost:3001/users/${userId}/friends`,
      {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    const data = await response.json();
    dispatch(setFriends({ friends: data }));
  };

  useEffect(() => {
    getFriends();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  if (!Array.isArray(friends)) return null;

  return (
    <div
      className={`${className} bg-white dark:bg-slate-800 rounded-lg px-4 py-4 lg:px-6 lg:py-8 ring-1 ring-slate-900/5 shadow-sm`}
    >
      <h5 className="font-medium text-lg mb-6">Friends</h5>
      <div className="flex flex-col gap-6">
        {friends.map((friend) => (
          <Friend
            key={friend._id}
            friendId={friend._id}
            name={`${friend.firstName} ${friend.lastName}`}
            subtitle={friend.occupation}
            userPicturePath={friend.picturePath}
          />
        ))}
      </div>
    </div>
  );
};

export default FriendList;
