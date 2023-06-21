import { Box, Typography, useTheme, useMediaQuery } from "@mui/material";
import Form from "./Form.jsx";

const LoginPage = () => {
    const theme = useTheme();
    const isNonMobileScreens = useMediaQuery("(min-width: 1000px)");
    return (
        < Box >
            <Box
                width="100%"
                backgroundColor={theme.palette.background.alt}
                p="1rem 6%"
                textAlign="center"
            >
                <Typography
                    fontWeight="bold"
                    fontSize="32px"
                    color="primary"
                >
                    Sociopedia
                </Typography>
            </Box>

            <Box
                width={isNonMobileScreens ? "50%" : "93%"}
                p="2rem"
                m="2rem auto"
                borderRadius="1.5rem"
                backgroundColor={theme.palette.background.alt}
            >
                <Typography fontWeight="500" variant="h2" sx={{ mb: "1.5rem" }}>
                    Welcome to Sociopedia!
                </Typography>
                <Typography fontWeight="500" variant="h5" sx={{ mb: "1.5rem" }}>
                    Caution: If you are creating an account, please do not use any real passwords. This app is still a work-in-progress.
                </Typography>
                <Typography fontWeight="500" variant="h5" sx={{ mb: "1.5rem" }}>
                    The first login may take up to a minute due to slow on-demand server hosting.
                </Typography>
                <p><strong>Demo Credentials</strong><br></br>Username: demo@demo.com<br></br> Password: password123!</p>
                <Form />
            </Box>
        </Box>
    );
};

export default LoginPage;