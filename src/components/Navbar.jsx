import { useState } from "react";
import {
  Search,
  Message,
  DarkMode,
  LightMode,
  Notifications,
  Help,
  Menu,
  Close,
  ArrowDropDown,
  ArrowDropUp,
} from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import { toggleMode, setLogout } from "state";
import { useNavigate } from "react-router-dom";
import { Title } from "./Title";

const Navbar = () => {
  const [isMobileMenuToggled, setIsMobileMenuToggle] = useState(false);
  const [isProfileToggled, setIsProfileToggle] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.user);
  const mode = useSelector((state) => state.mode);

  const fullName = `${user?.firstName} ${user?.lastName}`;

  const handleLogout = () => {
    dispatch(setLogout());
    localStorage.removeItem("token");
  };

  return (
    <nav
      className={`flex justify-between items-center py-1 px-4 md:px-8 shadow-sm bg-white dark:bg-slate-800`}
    >
      <div className={`flex justify-between items-center gap-7`}>
        <Title />
        <div className="hidden md:flex w-full rounded-full py-2 px-6 bg-gray-100">
          <input
            className="w-full bg-transparent focus:outline-none"
            placeholder="Search..."
          />
          <button className="text-gray-600">
            <Search />
          </button>
        </div>
      </div>

      <div className="hidden sm:flex justify-between items-center gap-8">
        <button onClick={() => dispatch(toggleMode())}>
          {mode === "dark" ? (
            <DarkMode sx={{ fontSize: "25px" }} />
          ) : (
            <LightMode sx={{ fontSize: "25px" }} />
          )}
        </button>
        <Message sx={{ fontSize: "25px" }} />
        <Notifications sx={{ fontSize: "25px" }} />
        <Help sx={{ fontSize: "25px" }} />
        <button
          className="rounded py-2 px-4 bg-gray-100 hover:bg-gray-200 text-gray-600"
          onClick={() => setIsProfileToggle(!isProfileToggled)}
        >
          <span className="font-medium">{fullName}</span>
          {isMobileMenuToggled ? (
            <ArrowDropUp sx={{ fontSize: "22px" }} className="ml-2" />
          ) : (
            <ArrowDropDown sx={{ fontSize: "22px" }} className="ml-2" />
          )}
        </button>
      </div>

      {isProfileToggled && (
        <div className="absolute right-8 top-[3rem] w-40 border rounded py-2 bg-white shadow-lg">
          <button
            className="hover:bg-gray-100 w-full px-4 py-2 text-left text-gray-900"
            onClick={handleLogout}
          >
            Log Out
          </button>
        </div>
      )}

      <button
        className="sm:hidden"
        onClick={() => setIsMobileMenuToggle(!isMobileMenuToggled)}
      >
        <Menu />
      </button>

      {isMobileMenuToggled && (
        <div className="fixed top-0 left-0 w-full h-full bg-slate-800 bg-opacity-90 z-10 slide-bottom flex justify-items-center items-center">
          <Close
            className="absolute top-8 right-8 cursor-pointer shadow-sm text-slate-50 hover:text-slate-400"
            sx={{ fontSize: "30px" }}
            onClick={() => setIsMobileMenuToggle(!isMobileMenuToggled)}
          />
          <div className="flex flex-col items-center justify-center w-full gap-4">
            <button
              onClick={() => {
                dispatch(toggleMode());
                setIsMobileMenuToggle(false);
              }}
              className="shadow-sm text-base text-slate-50 hover:text-slate-400"
            >
              {mode === "dark" ? (
                <DarkMode className="mr-1" sx={{ fontSize: "20px" }} />
              ) : (
                <LightMode className="mr-1" sx={{ fontSize: "20px" }} />
              )}
              {mode === "dark" ? "Dark" : "Light"}
            </button>
            <button
              onClick={() => {
                setIsMobileMenuToggle(false);
              }}
              className="shadow-sm text-base text-slate-50 hover:text-slate-400"
            >
              Message
            </button>
            <button
              onClick={() => {
                setIsMobileMenuToggle(false);
              }}
              className="shadow-sm text-base text-slate-50 hover:text-slate-400"
            >
              Notifications
            </button>
            <button
              onClick={() => {
                setIsMobileMenuToggle(false);
              }}
              className="shadow-sm text-base text-slate-50 hover:text-slate-400"
            >
              Help
            </button>
            <button
              onClick={() => {
                handleLogout();
                setIsMobileMenuToggle(false);
              }}
              className="shadow-sm text-base text-slate-50 hover:text-slate-400"
            >
              Log Out
            </button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
