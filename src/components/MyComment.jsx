import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setPost } from "state";

const MyComment = ({ postId }) => {
  const dispatch = useDispatch();
  const [comment, setComment] = useState("");
  const token = useSelector((state) => state.token);
  const user = useSelector((state) => state.user);

  const handleComment = async () => {
    const response = await fetch(
      `http://localhost:3001/posts/${postId}/comments`,
      {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId: user._id, comment }),
      }
    );
    const post = await response.json();
    dispatch(setPost({ post }));
    setComment("");
  };

  return (
    <div className="flex gap-4 py-3 border-t mt-2">
      <img
        className="rounded-full w-[40px] h-[40px] max-w-[40px] max-h-[40px] object-cover"
        src={`http://localhost:3001/assets/${user.picturePath}`}
      />
      <div className="w-full rounded-full py-2 px-4 bg-gray-100">
        <input
          className="w-full bg-transparent focus:outline-none"
          placeholder="Write a comment..."
          onChange={(e) => setComment(e.target.value)}
          onKeyDown={async (e) => {
            if (e.key === "Enter") {
              await handleComment();
            }
          }}
          value={comment}
        />
      </div>
    </div>
  );
};

export default MyComment;
