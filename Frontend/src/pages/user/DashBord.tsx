import {
  Container,
  Box,
  Typography,
  Button,
  Paper,
  AppBar,
  Toolbar,
  ListItemIcon,
  MenuItem,
  Menu,
} from "@mui/material";

import { AccountCircle, Logout } from "@mui/icons-material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../redux/store";
import { logout } from "../../redux/authSlice";

const UserDashboard = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();

  // User menu handling
  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    dispatch(logout());
    navigate("/");
    handleMenuClose();
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      {/* App Bar */}
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            User Dashbord
          </Typography>
          <Typography
            variant="body1"
            component="span"
            onClick={() => navigate("/user/profile")}
            sx={{ flexGrow: 1, mt: 2, cursor: "pointer" }}
          >
            User Profile
          </Typography>
          <Button
            color="inherit"
            onClick={handleMenuOpen}
            startIcon={<AccountCircle />}
          >
            Profile
          </Button>
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleMenuClose}
          >
            <MenuItem onClick={handleLogout}>
              <ListItemIcon>
                <Logout fontSize="small" />
              </ListItemIcon>
              Logout
            </MenuItem>
          </Menu>
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
            Welcome to Dashboard
          </Typography>
        </Paper>
      </Container>
    </Box>
  );
};

export default UserDashboard;
