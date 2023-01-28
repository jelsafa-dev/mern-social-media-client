import { Box, Typography, useMediaQuery, useTheme } from "@mui/material";
import Form from "./../components/Form";

const Login = () => {
  const isNonMobileScreens = useMediaQuery("(min-width: 1000px)");
  const theme = useTheme();

  return (
    <Box>
      <Box
        className="w-100 py-4 px-8 text-center"
        style={{ backgroundColor: theme.palette.background.alt }}
      >
        <Typography
          fontWeight="bold"
          fontSize="clamp(1rem, 2rem, 2.25rem)"
          color="primary"
        >
          Social Media
        </Typography>
      </Box>
      <Box
        width={isNonMobileScreens ? "50%" : "93%"}
        className="p-8 my-8 mx-auto rounded-[1.5rem]"
        backgroundColor={theme.palette.background.alt}
      >
        <Typography className="font-bold" variant="h5" sx={{ mb: "1.5rem" }}>
          Welcome to Social Media
        </Typography>
      </Box>
    </Box>
  );
};

export default Login;
