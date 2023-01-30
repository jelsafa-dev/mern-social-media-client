import {
  ChatBubbleOutlineOutlined,
  FavoriteBorderOutlined,
  FavoriteOutlined,
  ShareOutlined,
} from "@mui/icons-material";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setPost } from "state";
import Friend from "./Friend";

const Post = ({
  postId,
  postUserId,
  name,
  description,
  location,
  picturePath,
  userPicturePath,
  likes,
  comments,
}) => {
  const [isComments, setIsComments] = useState(false);
  const dispatch = useDispatch();
  const token = useSelector((state) => state.token);
  const loggedInUserId = useSelector((state) => state.user._id);
  const isLiked = Boolean(likes[loggedInUserId]);
  const likeCount = Object.keys(likes).length;

  const patchLike = async () => {
    const response = await fetch(`http://localhost:3001/posts/${postId}/like`, {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ userId: loggedInUserId }),
    });
    const updatedPost = await response.json();
    dispatch(setPost({ post: updatedPost }));
  };

  return (
    <div className="bg-white dark:bg-slate-800 rounded-lg px-6 py-8 ring-1 ring-slate-900/5 shadow-sm my-4">
      <Friend
        friendId={postUserId}
        name={name}
        subtitle={location}
        userPicturePath={userPicturePath}
      />
      <p className="mt-4">{description}</p>
      {picturePath && (
        <img
          className="w-100 h-auto rounded-lg mt-3"
          alt="post"
          src={`http://localhost:3001/assets/${picturePath}`}
        />
      )}
      <div className="flex justify-between items-center mt-4">
        <div className="flex justify-between items-center gap-4">
          <div className="flex justify-between items-center gap-1">
            <button onClick={patchLike}>
              {isLiked ? (
                <FavoriteOutlined className="text-red-600" />
              ) : (
                <FavoriteBorderOutlined />
              )}
            </button>
            <p>{likeCount}</p>
          </div>
          <div className="flex justify-between items-center gap-1">
            <button onClick={() => setIsComments(!isComments)}>
              <ChatBubbleOutlineOutlined />
            </button>
            <p>{comments && comments.length}</p>
          </div>
        </div>
      </div>
      {isComments && (
        <div className="mt-2">
          {comments &&
            comments.map((comment, i) => (
              <div key={`${name}-${i}`}>
                <p className="mx-2 pl-2">{comment}</p>
              </div>
            ))}
        </div>
      )}
    </div>
  );
};

export default Post;
