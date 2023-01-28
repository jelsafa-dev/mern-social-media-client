import { useState } from "react";
import {
  Box,
  IconButton,
  InputBase,
  Typography,
  Select,
  MenuItem,
  FormControl,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import {
  Search,
  Message,
  DarkMode,
  LightMode,
  Notifications,
  Help,
  Menu,
  Close,
} from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import { toggleMode, setLogout } from "state";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const [isMobileMenuToggled, setIsMobileMenuToggle] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.user);
  const isNonMobileScreens = useMediaQuery("(min-width: 1000px)");

  const theme = useTheme();
  const { neutral, background, primary } = theme.palette;

  const fullName = `${user?.firstName} ${user?.lastName}`;
  return (
    <div
      className={`flex justify-between items-center py-1 px-8`}
      style={{ backgroundColor: background.alt }}
    >
      <div className={`flex justify-between items-center gap-7`}>
        <Typography
          fontWeight="bold"
          fontSize="clamp(1rem, 2rem, 2.25rem)"
          color="primary"
          onClick={() => navigate("/home")}
          sx={{
            "&hover": {
              color: primary.light,
              cursor: "pointer",
            },
          }}
        >
          Social Media
        </Typography>
        {isNonMobileScreens && (
          <div
            className={`flex justify-between items-center rounded-[9px] gap-12 py-0 px-6`}
            style={{ backgroundColor: neutral.light }}
          >
            <InputBase placeholder="Search..." />
            <IconButton>
              <Search />
            </IconButton>
          </div>
        )}
      </div>

      {isNonMobileScreens ? (
        <div className="flex justify-between items-center gap-8">
          <IconButton onClick={() => dispatch(toggleMode())}>
            {theme.palette.mode === "dark" ? (
              <DarkMode sx={{ fontSize: "25px" }} />
            ) : (
              <LightMode sx={{ color: primary.dark, fontSize: "25px" }} />
            )}
          </IconButton>
          <Message sx={{ fontSize: "25px" }} />
          <Notifications sx={{ fontSize: "25px" }} />
          <Help sx={{ fontSize: "25px" }} />
          <FormControl variant="standard" value={fullName}>
            <Select
              value={fullName}
              sx={{
                backgroundColor: neutral.light,
                width: "150px",
                borderRadius: "0.25rem",
                p: "0.25 1rem",
                "& .MuiSvgIcon-root": {
                  pr: "0.25rem",
                  width: "3rem",
                },
                "& .MuiSelect-select:focus": {
                  backgroundColor: neutral.light,
                },
              }}
              input={<InputBase />}
            >
              <MenuItem value={fullName}>
                <Typography>{fullName}</Typography>
              </MenuItem>
              <MenuItem onClick={() => dispatch(setLogout())}>
                <Typography>Log Out</Typography>
              </MenuItem>
            </Select>
          </FormControl>
        </div>
      ) : (
        <IconButton onClick={() => setIsMobileMenuToggle(!isMobileMenuToggled)}>
          <Menu />
        </IconButton>
      )}

      {!isNonMobileScreens && isMobileMenuToggled && (
        <Box
          position="fixed"
          right="0"
          bottom="0"
          height="100%"
          zIndex="10"
          maxWidth="500px"
          minWidth="300px"
          backgroundColor={background.default}
        >
          <Box display="flex" justifyContent="flex-end" p="1rem">
            <IconButton
              onClick={() => setIsMobileMenuToggle(!isMobileMenuToggled)}
            >
              <Close />
            </IconButton>
          </Box>

          <div className="flex flex-col justify-center items-center gap-12">
            <IconButton
              sx={{ fontSize: "25px" }}
              onClick={() => dispatch(toggleMode())}
            >
              {theme.palette.mode === "dark" ? (
                <DarkMode sx={{ fontSize: "25px" }} />
              ) : (
                <LightMode sx={{ color: primary.dark, fontSize: "25px" }} />
              )}
            </IconButton>
            <Message sx={{ fontSize: "25px" }} />
            <Notifications sx={{ fontSize: "25px" }} />
            <Help sx={{ fontSize: "25px" }} />
            <FormControl variant="standard" value={fullName}>
              <Select
                value={fullName}
                sx={{
                  backgroundColor: neutral.light,
                  width: "150px",
                  borderRadius: "0.25rem",
                  p: "0.25 1rem",
                  "& .MuiSvgIcon-root": {
                    pr: "0.25rem",
                    width: "3rem",
                  },
                  "& .MuiSelect-select:focus": {
                    backgroundColor: neutral.light,
                  },
                }}
                input={<InputBase />}
              >
                <MenuItem value={fullName}>
                  <Typography>{fullName}</Typography>
                </MenuItem>
                <MenuItem onClick={() => dispatch(setLogout())}>
                  <Typography>Log Out</Typography>
                </MenuItem>
              </Select>
            </FormControl>
          </div>
        </Box>
      )}
    </div>
  );
};

export default Navbar;
