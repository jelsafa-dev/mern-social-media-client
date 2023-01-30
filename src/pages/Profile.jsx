import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import Navbar from "./../components/Navbar";
import FriendList from "../components/FriendList";
import MyPost from "./../components/MyPost";
import Posts from "./../components/Posts";
import User from "../components/User";

const Profile = () => {
  const [user, setUser] = useState(null);
  const { userId } = useParams();
  const token = useSelector((state) => state.token);

  const getUser = async () => {
    const response = await fetch(`http://localhost:3001/users/${userId}`, {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await response.json();
    setUser(data);
  };

  useEffect(() => {
    getUser();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  if (!user) return null;

  return (
    <div className="bg-gray-50 dark:bg-slate-900">
      <Navbar />
      <div className="block sm:flex w-100 p-4 lg:p-8 gap-4 lg:gap-8 justify-center">
        <div className="sm:min-w-[270px] sm:max-w-[320px] lg:min-w-[340px] lg:max-w-[420px]">
          <User userId={userId} picturePath={user.picturePath} />
          <div className="my-4" />
          <FriendList className="hidden md:block" userId={userId} />
        </div>
        <div className="sm:min-w-[440px] sm:max-w-[460px] lg:min-w-[640px] lg:max-w-[680px]">
          <MyPost picturePath={user.picturePath} />
          <div className="my-4" />
          <Posts userId={userId} isProfile />
        </div>
      </div>
    </div>
  );
};

export default Profile;
