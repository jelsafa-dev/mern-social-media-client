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

const MyPost = ({ picturePath }) => {
  const API_URL = process.env.REACT_APP_API_URL;
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

    const response = await fetch(`${API_URL}/posts`, {
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
    <div className="bg-white dark:bg-slate-800 rounded-lg px-4 py-4 lg:px-6 lg:py-8 ring-1 ring-slate-900/5 shadow-sm">
      <div className="flex items-center gap-4">
        <img
          className={`h-[45px] w-[45px] object-cover rounded-full`}
          alt="user"
          src={`${API_URL}/assets/${picturePath}`}
        />
        <div className="w-full rounded-full py-4 px-6 bg-gray-100">
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
              <div className="flex cursor-pointer w-100 gap-4 justify-between">
                <div
                  {...getRootProps()}
                  className="text-gray-500 hover:text-gray-400"
                >
                  {!image ? (
                    <p>Add Image Here...</p>
                  ) : (
                    <div className="flex items-center gap-4">
                      <EditOutlined />
                      <p className="truncate hover:text-clip max-w-xs">
                        {image.name}
                      </p>
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
          className="flex justify-between items-center gap-1 text-gray-500 hover:text-gray-400 dark:text-gray-100 cursor-pointer"
          onClick={() => setIsImage(!isImage)}
        >
          <ImageOutlined />
          <p>Image</p>
        </div>
        <div className="hidden md:flex justify-between items-center gap-1 text-gray-500 hover:text-gray-400 dark:text-gray-100 cursor-pointer">
          <GifBoxOutlined />
          <p>Clip</p>
        </div>
        <div className="hidden md:flex justify-between items-center gap-1 text-gray-500 hover:text-gray-400 dark:text-gray-100 cursor-pointer">
          <AttachFileOutlined />
          <p>Attachment</p>
        </div>
        <div className="hidden md:flex justify-between items-center gap-1 text-gray-500 hover:text-gray-400 dark:text-gray-100 cursor-pointer">
          <MicOutlined />
          <p>Audio</p>
        </div>

        <div className="flex md:hidden justify-between items-center gap-1 text-gray-500 hover:text-gray-400 cursor-pointer">
          <MoreHorizOutlined />
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
