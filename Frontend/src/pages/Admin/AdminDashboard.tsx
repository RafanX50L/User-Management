import {
  Container,
  Box,
  Typography,
  Paper,
  Toolbar,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import { Dashboard, Person, Settings, Logout } from "@mui/icons-material";
import { useState } from "react";
import { useAppDispatch } from "../../redux/store";
import { useNavigate } from "react-router-dom";
import { logout } from "../../redux/authSlice";

// Admin Dashboard Component

const AdminDashboard = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const handleLogout = () => {
    dispatch(logout());
  };

  // Sidebar content
  const drawerContent = (
    <List>
      {[
        { text: "Dashboard", icon: <Dashboard />, handle: "/admin" },
        {
          text: "User Management",
          icon: <Person />,
          handle: "/admin/user-management",
        },
        { text: "Settings", icon: <Settings />, handle: "/admin" },
      ].map((item) => (
        <ListItem
          sx={{cursor:'pointer'}}
          onClick={() => {
            navigate(`${item.handle}`);
          }}
          but
          key={item.text}
        >
          <ListItemIcon>{item.icon}</ListItemIcon>
          <ListItemText primary={item.text} />
        </ListItem>
      ))}
    </List>
  );

  return (
    <Box sx={{ display: "flex" }}>
      {/* Permanent Drawer for Desktop */}
      <Drawer
        variant="permanent"
        sx={{
          width: 240,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: { width: 240, boxSizing: "border-box" },
          display: { xs: "none", sm: "block" },
        }}
      >
        <Toolbar />
        {drawerContent}

        <ListItem sx={{cursor:'pointer'}} onClick={()=>{handleLogout()}}>
          <ListItemIcon>
            <Logout />
          </ListItemIcon>
          <ListItemText>Logout</ListItemText>
        </ListItem>
      </Drawer>

      {/* Main Content */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: { sm: `calc(100% - 240px)` },
          mt: { xs: 8, sm: 10 },
        }}
      >
        <Container maxWidth="lg">
          <Paper elevation={6} sx={{ padding: 3 }}>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                height: "100%",
                py: 4,
              }}
            >
              <Typography variant="h5" gutterBottom>
                Welcome to Admin Dashboard
              </Typography>
            </Box>
          </Paper>
        </Container>
      </Box>
    </Box>
  );
};

export default AdminDashboard;
