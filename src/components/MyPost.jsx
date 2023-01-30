import {
  EditOutlined,
  DeleteOutlined,
  AttachFileOutlined,
  GifBoxOutlined,
  ImageOutlined,
  MicOutlined,
  MoreHorizOutlined,
} from "@mui/icons-material";
import Dropzone from "react-dropzone";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setPosts } from "state";
import UserImage from "./UserImage";

const MyPost = ({ picturePath }) => {
  const dispatch = useDispatch();
  const [isImage, setIsImage] = useState(false);
  const [image, setImage] = useState(null);
  const [post, setPost] = useState("");
  const { _id } = useSelector((state) => state.user);
  const token = useSelector((state) => state.token);

  const handlePost = async () => {
    const formData = new FormData();
    formData.append("userId", _id);
    formData.append("description", post);
    if (image) {
      formData.append("picture", image);
      formData.append("picturePath", image.name);
    }

    const response = await fetch(`http://localhost:3001/posts`, {
      method: "POST",
      headers: { Authorization: `Bearer ${token}` },
      body: formData,
    });
    const posts = await response.json();
    dispatch(setPosts({ posts }));
    setImage(null);
    setPost("");
  };

  return (
    <div className="bg-white dark:bg-slate-800 rounded-lg px-6 py-8 ring-1 ring-slate-900/5 shadow-sm">
      <div className="flex items-center gap-6">
        <UserImage image={picturePath} />
        <div className="w-full rounded-full py-4 px-8 bg-gray-100">
          <input
            className="w-full bg-transparent focus:outline-none"
            placeholder="What's on your mind..."
            onChange={(e) => setPost(e.target.value)}
            value={post}
          />
        </div>
      </div>
      {isImage && (
        <div className="border-2 border-dashed rounded p-4 mt-4">
          <Dropzone
            acceptedFiles=".jpg,.jpeg,.png"
            multiple={false}
            onDrop={(acceptedFiles) => setImage(acceptedFiles[0])}
          >
            {({ getRootProps, getInputProps }) => (
              <div className="flex cursor-pointer w-100 gap-4">
                <div
                  {...getRootProps()}
                  className="text-gray-500 hover:text-gray-400"
                >
                  {!image ? (
                    <p>Add Image Here...</p>
                  ) : (
                    <div className="flex items-center gap-4">
                      <EditOutlined />
                      <p>{image.name}</p>
                    </div>
                  )}
                </div>
                {image && (
                  <button
                    className="text-gray-500 hover:text-gray-400"
                    onClick={() => setImage(null)}
                  >
                    <DeleteOutlined />
                  </button>
                )}
              </div>
            )}
          </Dropzone>
        </div>
      )}
      <div className="border-b w-100 my-5" />
      <div className="flex justify-between items-center">
        <div
          className="flex justify-between items-center gap-1 text-gray-500 hover:text-gray-400 cursor-pointer"
          onClick={() => setIsImage(!isImage)}
        >
          <ImageOutlined />
          <p>Image</p>
        </div>
        <div className="flex justify-between items-center gap-1 text-gray-500 hover:text-gray-400 cursor-pointer">
          <GifBoxOutlined />
          <p>Clip</p>
        </div>
        <div className="flex justify-between items-center gap-1 text-gray-500 hover:text-gray-400 cursor-pointer">
          <AttachFileOutlined />
          <p>Attachment</p>
        </div>
        <div className="flex justify-between items-center gap-1 text-gray-500 hover:text-gray-400 cursor-pointer">
          <MicOutlined />
          <p>Audio</p>
        </div>
        <button
          className="bg-indigo-500  hover:bg-indigo-600  p-2 rounded-full shadow py-2 px-4 text-xs text-white cursor-pointer"
          disabled={!post}
          onClick={handlePost}
        >
          POST
        </button>
      </div>
    </div>
  );
};

export default MyPost;
