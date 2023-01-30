import { useSelector } from "react-redux";
import Navbar from "./../components/Navbar";
import MyPost from "./../components/MyPost";
import Posts from "./../components/Posts";
import Advert from "../components/Advert";
import FriendList from "../components/FriendList";
import User from "./../components/User";

const Home = () => {
  const { _id, picturePath } = useSelector((state) => state.user);

  return (
    <div className="bg-gray-50 dark:bg-slate-900">
      <Navbar />
      <div className="block sm:flex w-100 p-4 lg:p-8 gap-4 lg:gap-8 justify-center">
        <div className="min-w-[270px] max-w-[320px] lg:min-w-[340px] lg:max-w-[420px] hidden sm:block">
          <User userId={_id} picturePath={picturePath} />
        </div>
        <div className="sm:min-w-[440px] sm:max-w-[460px] lg:min-w-[640px] lg:max-w-[680px]">
          <MyPost picturePath={picturePath} />
          <Posts userId={_id} />
        </div>
        <div className="min-w-[240px] max-w-[280px] lg:min-w-[340px] lg:max-w-[420px] hidden md:block">
          <Advert />
          <div className="my-4" />
          <FriendList userId={_id} />
        </div>
      </div>
    </div>
  );
};

export default Home;
