import {
  Container,
  Box,
  Typography,
  TextField,
  Button,
  Avatar,
  Grid,
  Paper,
  AppBar,
  Toolbar,
  IconButton,
  ListItemIcon,
  Tooltip,
  Card,
  CardContent,
  MenuItem,
  Menu,
  Modal,
  Fade,
  Backdrop,
} from "@mui/material";

import {
  AccountCircle,
  Person,
  PhotoCamera,
  Logout,
  Edit,
  Email,
  Phone,
  LocationOn,
  Work,
  CalendarToday,
  Close,
  Update,
} from "@mui/icons-material";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../redux/store";
import { logout } from "../../redux/authSlice";
import { fetchUserData, updateUserData } from "../../redux/userSlice";

const UserProfile = () => {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const dispatch = useDispatch<AppDispatch>();
  const { id } = useSelector((state: RootState) => state.auth);

  useEffect(()=>{
    const fetchuserData = () => {
      console.log('done')
      const values = dispatch(fetchUserData(id))
      console.log(values)
    }
    fetchuserData();
  },[])

  const [userDetails, setUserDetails] = useState({
    fullName: "John Doe",
    email: "john.doe@example.com",
    phoneNumber: "+1 (555) 123-4567",
    location: "San Francisco, CA",
    occupation: "Software Engineer",
    joinDate: "January 15, 2023",
    bio: "Passionate developer with 5+ years of experience in web technologies and creating user-centric applications.",
  });

  // User menu handling
  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    dispatch(logout());
    handleMenuClose();
  };

  // Edit modal handling
  const handleOpenEditModal = () => {
    setIsEditModalOpen(true);
  };

  const handleCloseEditModal = () => {
    setIsEditModalOpen(false);
  };

  // Profile picture upload handler
  const handleProfilePictureUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      // Implement file upload logic here
      console.log("Uploaded file:", file);
    }
  };

  // Save profile changes
  const handleSaveProfile = () => {
    // In a real app, you would send updates to backend
    handleCloseEditModal();
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      {/* App Bar */}
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
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
       
          <Grid container spacing={3}>
            {/* Profile Overview */}
            <Grid item xs={12} md={5}>
              <Paper
                elevation={4}
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  padding: 3,
                  height: "100%",
                }}
              >
                <Avatar
                  sx={{
                    width: 120,
                    height: 120,
                    mb: 2,
                    bgcolor: "primary.main",
                  }}
                >
                  <Person fontSize="large" />
                </Avatar>
                <input
                  accept="image/*"
                  style={{ display: "none" }}
                  id="raised-button-file"
                  type="file"
                  onChange={handleProfilePictureUpload}
                />
                <label htmlFor="raised-button-file">
                  <Button
                    variant="contained"
                    component="span"
                    startIcon={<PhotoCamera />}
                    sx={{ mb: 2 }}
                  >
                    Upload Picture
                  </Button>
                </label>
                <Typography variant="h6">{userDetails.fullName}</Typography>
                <Typography variant="body2" color="text.secondary">
                  {userDetails.occupation}
                </Typography>
              </Paper>
            </Grid>

            {/* User Details */}
            <Grid item xs={12} md={7}>
              <Card sx={{ height: "100%" }}>
                <CardContent
                  sx={{
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      mb: 2,
                    }}
                  >
                    <Typography variant="h6">User Information</Typography>
                    <Tooltip title="Edit Profile">
                      <IconButton onClick={handleOpenEditModal}>
                        <Edit />
                      </IconButton>
                    </Tooltip>
                  </Box>
                  <Box sx={{ flexGrow: 1 }}>
                    <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                      <Email sx={{ mr: 2, color: "text.secondary" }} />
                      <Typography variant="body1">
                        {userDetails.email}
                      </Typography>
                    </Box>
                    <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                      <Phone sx={{ mr: 2, color: "text.secondary" }} />
                      <Typography variant="body1">
                        {userDetails.phoneNumber}
                      </Typography>
                    </Box>
                    <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                      <LocationOn sx={{ mr: 2, color: "text.secondary" }} />
                      <Typography variant="body1">
                        {userDetails.location}
                      </Typography>
                    </Box>
                    <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                      <Work sx={{ mr: 2, color: "text.secondary" }} />
                      <Typography variant="body1">
                        {userDetails.occupation}
                      </Typography>
                    </Box>
                    <Box sx={{ display: "flex", alignItems: "center" }}>
                      <CalendarToday sx={{ mr: 2, color: "text.secondary" }} />
                      <Typography variant="body1">
                        Joined: {userDetails.joinDate}
                      </Typography>
                    </Box>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
      </Container>

      {/* Edit Profile Modal */}
      <Modal
        open={isEditModalOpen}
        onClose={handleCloseEditModal}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={isEditModalOpen}>
          <Box
            sx={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              width: "90%",
              maxWidth: 600,
              bgcolor: "background.paper",
              boxShadow: 24,
              p: 4,
              borderRadius: 2,
              maxHeight: "90vh",
              overflowY: "auto",
            }}
          >
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                mb: 3,
              }}
            >
              <Typography variant="h6">Edit Profile</Typography>
              <IconButton onClick={handleCloseEditModal}>
                <Close />
              </IconButton>
            </Box>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Full Name"
                  value={userDetails.fullName}
                  onChange={(e) =>
                    setUserDetails((prev) => ({
                      ...prev,
                      fullName: e.target.value,
                    }))
                  }
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Email"
                  value={userDetails.email}
                  onChange={(e) =>
                    setUserDetails((prev) => ({
                      ...prev,
                      email: e.target.value,
                    }))
                  }
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Phone Number"
                  value={userDetails.phoneNumber}
                  onChange={(e) =>
                    setUserDetails((prev) => ({
                      ...prev,
                      phoneNumber: e.target.value,
                    }))
                  }
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Location"
                  value={userDetails.location}
                  onChange={(e) =>
                    setUserDetails((prev) => ({
                      ...prev,
                      location: e.target.value,
                    }))
                  }
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Occupation"
                  value={userDetails.occupation}
                  onChange={(e) =>
                    setUserDetails((prev) => ({
                      ...prev,
                      occupation: e.target.value,
                    }))
                  }
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Bio"
                  multiline
                  rows={4}
                  value={userDetails.bio}
                  onChange={(e) =>
                    setUserDetails((prev) => ({
                      ...prev,
                      bio: e.target.value,
                    }))
                  }
                />
              </Grid>
              <Grid item xs={12}>
                <Button
                  variant="contained"
                  color="primary"
                  fullWidth
                  onClick={handleSaveProfile}
                >
                  Save Changes
                </Button>
              </Grid>
            </Grid>
          </Box>
        </Fade>
      </Modal>
    </Box>
  );
};

export default UserProfile;
