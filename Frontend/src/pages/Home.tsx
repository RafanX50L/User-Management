import {
  Container,
  Box,
  Typography,
  Button,
  Paper,
  AppBar,
  Toolbar,
} from "@mui/material";

import { AccountCircle} from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  // Login/Logout handling
  const handleLogin = () => {
    console.log("working");
    navigate("/login");
  };


  return (
    <Box sx={{ flexGrow: 1 }}>
      {/* App Bar */}
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            User Dashbord
          </Typography>

          <Button color="inherit" onClick={handleLogin}>
            Login
          </Button>
        </Toolbar>
      </AppBar>

      {/* Main Content */}
      <Container maxWidth="md" sx={{ mt: 4 }}>
        <Paper
          elevation={6}
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            padding: 4,
          }}
        >
          <Typography variant="h5" gutterBottom>
            Welcome to User Profile
          </Typography>
          <Typography variant="body1" sx={{ mb: 3, textAlign: "center" }}>
            Please log in to view and edit your profile
          </Typography>
          <Button
            variant="contained"
            color="primary"
            onClick={handleLogin}
            startIcon={<AccountCircle />}
          >
            Login
          </Button>
        </Paper>
      </Container>
    </Box>
  );
};

export default Home;