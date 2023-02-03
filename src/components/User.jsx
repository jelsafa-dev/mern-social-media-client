import {
  ManageAccountsOutlined,
  EditOutlined,
  LocationOnOutlined,
  WorkOutlineOutlined,
} from "@mui/icons-material";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const User = ({ userId, picturePath }) => {
  const API_URL = process.env.REACT_APP_API_URL;
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  const token = useSelector((state) => state.token);

  const getUser = async () => {
    const response = await fetch(`${API_URL}/users/${userId}`, {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await response.json();
    setUser(data);
  };

  useEffect(() => {
    getUser();
  }, []);

  if (!user) {
    return null;
  }

  const {
    firstName,
    lastName,
    location,
    occupation,
    viewedProfile,
    impressions,
    friends,
  } = user;

  if (!Array.isArray(friends)) {
    return null;
  }

  return (
    <div className="bg-white dark:bg-slate-800 rounded-lg px-4 py-4 lg:px-6 lg:py-8 ring-1 ring-slate-900/5 shadow-sm">
      <div
        className="flex justify-between items-center gap-2 pb-4"
        onClick={() => navigate(`/profile/${userId}`)}
      >
        <div className="flex justify-between items-center gap-2">
          <img
            className={`max-h-[40px] max-w-[40px] h-[40px] w-[40px] object-cover rounded-full`}
            alt="user"
            src={`${API_URL}/assets/${picturePath}`}
          />
          <div className="flex flex-col">
            <h4 className="font-medium text-lg cursor-pointer hover:text-gray-500">
              {firstName} {lastName}
            </h4>
            <span className="text-gray-400 dark:text-gray-100">
              {friends.length} friends
            </span>
          </div>
        </div>
        <ManageAccountsOutlined />
      </div>
      <div className="border-b w-100" />
      <div className="flex flex-col py-4">
        <div className="flex items-center gap-4 mb-2">
          <LocationOnOutlined
            fontSize="large"
            className="text-gray-500 dark:text-gray-100"
          />
          <p className="text-gray-400 dark:text-gray-50">{location}</p>
        </div>
        <div className="flex items-center gap-4 mb-2">
          <WorkOutlineOutlined
            fontSize="large"
            className="text-gray-500 dark:text-gray-100"
          />
          <p className="text-gray-400 dark:text-gray-50">{occupation}</p>
        </div>
      </div>
      <div className="border-b w-100" />
      <div className="flex flex-col py-4">
        <div className="flex justify-between items-center gap-4 mb-2">
          <p className="text-gray-400 dark:text-gray-50">
            Who's viewed your profile
          </p>
          <p className="text-gray-500 dark:text-gray-100 font-medium">
            {viewedProfile}
          </p>
        </div>
        <div className="flex justify-between items-center gap-4 mb-2">
          <p className="text-gray-400 dark:text-gray-50">
            Impressions of your post
          </p>
          <p className="text-gray-500 dark:text-gray-100 font-medium">
            {impressions}
          </p>
        </div>
      </div>
      <div className="border-b w-100" />
      <div className="flex flex-col py-4">
        <p className="font-medium mb-4 text-base">Social Profiles</p>
        <div className="flex justify-between items-center gap-4 mb-2">
          <div className="flex justify-between items-center gap-4">
            <img src="../assets/twitter.png" alt="twitter" />
            <div className="flex flex-col">
              <p className="font-medium text-gray-600 dark:text-gray-50">
                Twitter
              </p>
              <p className="text-gray-400">username</p>
            </div>
          </div>
          <EditOutlined className="text-gray-600 cursor-pointer" />
        </div>
        <div className="flex justify-between items-center gap-4 mb-2">
          <div className="flex justify-between items-center gap-4">
            <img src="../../assets/linkedin.png" alt="linkedin" />
            <div className="flex flex-col">
              <p className="font-medium text-gray-600 dark:text-gray-50">
                Linkedin
              </p>
              <p className="text-gray-400">username</p>
            </div>
          </div>
          <EditOutlined className="text-gray-600 cursor-pointer" />
        </div>
      </div>
    </div>
  );
};

export default User;
