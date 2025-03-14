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
  Close,
} from "@mui/icons-material";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector, } from "../../redux/store";
import { logout } from "../../redux/authSlice";
import { fetchUserData, imageUpload, updateUserData, } from "../../redux/userSlice";
import { useNavigate } from "react-router-dom";

const UserProfile = () => {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const dispatch = useAppDispatch();
  const { userData } = useAppSelector((state) => state.user);
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const id = localStorage.getItem('id')

  // Initialize userDetails with userData or empty object
  const [userDetails, setUserDetails] = useState(userData || {});

  // Fetch user data on component mount
  useEffect(() => {
    dispatch(fetchUserData(id));
  }, [dispatch]);

  // Update local state when Redux userData changes
  useEffect(() => {
    if (userData) {
      setUserDetails(userData);
    }
  }, [userData]);

  const handleProfilePictureUpload = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setIsLoading(true);
    setError(null);

    const formData = new FormData();
    formData.append("profileImage", file);
    formData.append("id", userDetails._id);

    try {
      // Dispatch and unwrap the promise to properly handle success/errors
      const response = await dispatch(imageUpload(formData)).unwrap();

      setUserDetails((prev) => ({
        ...prev,
        profilePicture: response.imageUrl,
      }));
    } catch (error: any) {
      const errorMessage = error.message || "Error uploading file";
      setError(errorMessage);
      console.error("Upload error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
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

  const handleSaveProfile = async () => {
    if (!userDetails) return;
    try {
      await dispatch(updateUserData(userDetails)).unwrap();
      handleCloseEditModal();
    } catch (error) {
      console.error("Failed to update profile:", error);
    }
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      {/* App Bar */}
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            User Profile
          </Typography>
          <Typography
            onClick={() => navigate("/user")}
            variant="h6"
            component="div"
            sx={{ flexGrow: 1, cursor: "pointer" }}
          >
            User Dashboard
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
                src={
                  userDetails?.profilePicture
                    ? `http://localhost:5000/uploads/${userDetails?.profilePicture}`
                    : undefined
                }
              >
                <Person fontSize="large" />
              </Avatar>
              <input
                accept="image/*"
                style={{ display: "none" }}
                id="raised-button-file"
                type="file"
                onChange={handleProfilePictureUpload}
                disabled={isLoading}
              />
              <label htmlFor="raised-button-file">
                <Button
                  variant="contained"
                  component="span"
                  startIcon={<PhotoCamera />}
                  sx={{ mb: 2 }}
                  disabled={isLoading}
                >
                  {isLoading
                    ? "Uploading..."
                    : userDetails?.profilePicture
                    ? "Change Picture"
                    : "Upload Picture"}
                </Button>
              </label>
              {error && (
                <Typography variant="body2" color="error" sx={{ mb: 2 }}>
                  {error}
                </Typography>
              )}
              <Typography variant="h6">{userDetails?.name}</Typography>
              <Typography variant="body2" color="text.secondary">
                {userDetails?.occupation}
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
                      {userDetails?.email}
                    </Typography>
                  </Box>
                  <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                    <Phone sx={{ mr: 2, color: "text.secondary" }} />
                    <Typography variant="body1">
                      {userDetails?.phone}
                    </Typography>
                  </Box>
                  <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                    <LocationOn sx={{ mr: 2, color: "text.secondary" }} />
                    <Typography variant="body1">
                      {userDetails?.location}
                    </Typography>
                  </Box>
                  <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                    <Work sx={{ mr: 2, color: "text.secondary" }} />
                    <Typography variant="body1">
                      {userDetails?.occupation}
                    </Typography>
                  </Box>
                  <Box sx={{ display: "flex", alignItems: "center" }}>
                    <Person sx={{ mr: 2, color: "text.secondary" }} />
                    <Typography variant="body1">
                      Bio: {userDetails?.bio}
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
                  value={userDetails?.name || ""}
                  onChange={(e) =>
                    setUserDetails((prev) => ({
                      ...prev,
                      name: e.target.value,
                    }))
                  }
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Phone Number"
                  value={userDetails?.phone || ""}
                  onChange={(e) =>
                    setUserDetails((prev) => ({
                      ...prev,
                      phone: e.target.value,
                    }))
                  }
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Location"
                  value={userDetails?.location || ""}
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
                  value={userDetails?.occupation || ""}
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
                  value={userDetails?.bio || ""}
                  onChange={(e) =>
                    setUserDetails((prev) => ({ ...prev, bio: e.target.value }))
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
