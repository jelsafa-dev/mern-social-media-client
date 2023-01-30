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
      <div className="block sm:flex w-100 p-8 gap-8 justify-center">
        <div className="lg:min-w-[400px] md:max-w-[420px] hidden md:block">
          <User userId={userId} picturePath={user.picturePath} />
          <div className="my-4" />
          <FriendList userId={userId} />
        </div>
        <div className="lg:min-w-[400px] lg:max-w-[420px]">
          <MyPost picturePath={user.picturePath} />
          <div className="my-4" />
          <Posts userId={userId} isProfile />
        </div>
      </div>
    </div>
  );
};

export default Profile;
