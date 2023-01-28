import { Box, useMediaQuery } from "@mui/material";
import { useSelector } from "react-redux";
import Navbar from "./../components/Navbar";
import User from "./../components/User";
import MyPost from "./../components/MyPost";
import Posts from "./../components/Posts";
import Advert from "../components/Advert";
import FriendList from "../components/FriendList";

const Home = () => {
  const isNonMobileScreens = useMediaQuery("(min-width:1000px)");
  const { _id, picturePath } = useSelector((state) => state.user);
  const advert = useSelector((state) => state.advert);

  return (
    <Box>
      <Navbar />
      <Box
        width="100%"
        padding="2rem 6%"
        display={isNonMobileScreens ? "flex" : "block"}
        gap="0.5rem"
        justifyContent="space-between"
      >
        <Box flexBasis={isNonMobileScreens ? "26%" : undefined}>
          <User userId={_id} picturePath={picturePath} />
        </Box>
        <Box
          flexBasis={isNonMobileScreens ? "42%" : undefined}
          mt={isNonMobileScreens ? undefined : "2rem"}
        >
          <MyPost picturePath={picturePath} />
          <Posts userId={_id} />
        </Box>
        {isNonMobileScreens && (
          <Box flexBasis="26%">
            <Advert {...advert} />
            <div className="my-4" />
            <FriendList userId={_id} />
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default Home;
