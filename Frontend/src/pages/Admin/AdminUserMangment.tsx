import {
  Container,
  Box,
  Typography,
  TextField,
  Button,
  Grid,
  TableCell,
  Paper,
  Toolbar,
  IconButton,
  Drawer,
  List,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableBody,
  ListItem,
  ListItemIcon,
  ListItemText,
  Tooltip,
  MenuItem,
  Dialog,
  DialogTitle,
  DialogContent,
  FormControl,
  InputLabel,
  Select,
  Avatar,
  DialogActions,
  Card,
  CardContent,
} from "@mui/material";
import {
  AccountCircle,
  Visibility,
  Dashboard,
  Person,
  Settings,
  Edit,
  Delete,
  Close,
  Logout,
  Email,
  Phone,
  LocationOn,
  Work,
} from "@mui/icons-material";
import { useEffect, useState } from "react";
import { useActionData, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../redux/store";
import { logout } from "../../redux/authSlice";
import { AddUser, deleteUser, fetchUsers, updateUser } from "../../redux/adminSlice";

// Admin Dashboard Component

const AdminUserManagement = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  // Local state
  const [searchTerm, setSearchTerm] = useState("");
  const [openAddUserModal, setOpenAddUserModal] = useState(false);
  const [openViewUserModal, setOpenViewUserModal] = useState(false);
  const [openEditUserModal, setOpenEditUserModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  // Get users data from Redux store
  const userDatas = useAppSelector((state) => state?.admin?.usersData);
  const [users, setUsers] = useState([]);

  // Fetch users on component mount
  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  // // Sync local users state with Redux store
  useEffect(() => {
    setUsers(userDatas ?? []);
  }, [userDatas]);

  // New user form state
  const [newUser, setNewUser] = useState({
    name: "",
    email: "",
    password: "",
    role: "user", // Ensure consistent casing
  });

  // Logout handler
  const handleLogout = () => {
    dispatch(logout());
  };

  // Add user handler
  const handleAddUser = () => {
    dispatch(AddUser(newUser))
      .unwrap()
      .then(() => {
        setOpenAddUserModal(false);
        setNewUser({
          name: "",
          email: "",
          password: "",
          role: "user", // Ensure consistent casing
        });
        dispatch(fetchUsers()); // Refresh user list
      })
      .catch((error) => {
        console.error("Error adding user:", error);
      });
  };

  // View user handler
  const handleViewUser = (user) => {
    setSelectedUser(user);
    setOpenViewUserModal(true);
  };

  // Edit user handler
  const handleEditUser = (user) => {
    setSelectedUser({ ...user }); // Create a copy of the user object
    setOpenEditUserModal(true);
  };

  // Update user handler
  const handleUpdateUser = () => {
    if (selectedUser) {
      if (
        window.confirm(`Are you sure you want to update ${selectedUser.name}?`)
      ) {
        const userdata = {
          id: selectedUser._id,
          name: selectedUser.name,
          role: selectedUser.role,
        };
        dispatch(updateUser(userdata)) // Dispatch updateUser action
          .unwrap()
          .then(() => {
            setOpenEditUserModal(false);
            dispatch(fetchUsers()); // Refresh user list
          })
          .catch((error) => {
            console.error("Error updating user:", error);
          });
      }
    }
  };
  // Delete user handler
  const handleDeleteUser = (user) => {
    setSelectedUser(user);
    if (selectedUser) {
      if (
        window.confirm(`Are you sure you want to delete ${selectedUser.name}?`)
      ) {
        
        dispatch(deleteUser(selectedUser._id)) // Dispatch deleteUser action
          .unwrap()
          .then(() => {
            setOpenEditUserModal(false);
            dispatch(fetchUsers()); // Refresh user list
          })
          .catch((error) => {
            console.error("Error deleting user:", error);
          });
      }
    }
  };

  const filteredUsers = users.filter(
    (user) =>
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

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
          sx={{ cursor: "pointer" }}
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
        <ListItem
          sx={{ cursor: "pointer" }}
          onClick={() => {
            handleLogout();
          }}
        >
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
            <>
              <Typography variant="h4" gutterBottom>
                User Management
              </Typography>

              {/* Search and Add User Section */}
              <Grid container spacing={2} sx={{ mb: 3 }}>
                <Grid item xs={12} sm={6} md={6}>
                  <TextField
                    fullWidth
                    label="Search Users"
                    variant="outlined"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    InputProps={{
                      startAdornment: (
                        <Person sx={{ color: "action.disabled", mr: 1 }} />
                      ),
                    }}
                  />
                </Grid>
                <Grid item xs={12} sm={6} md={6}>
                  <Button
                    variant="contained"
                    color="primary"
                    startIcon={<Person />}
                    onClick={() => setOpenAddUserModal(true)}
                    sx={{ height: "100%" }}
                  >
                    Add New User
                  </Button>
                </Grid>
              </Grid>

              {/* User Table */}
              <TableContainer component={Paper} elevation={3}>
                <Table sx={{ minWidth: 650 }}>
                  <TableHead sx={{ backgroundColor: "primary.light" }}>
                    <TableRow>
                      <TableCell>NO</TableCell>
                      <TableCell>Profile</TableCell>
                      <TableCell>Name</TableCell>
                      <TableCell>Email</TableCell>
                      <TableCell>Role</TableCell>
                      <TableCell>Registered Date</TableCell>
                      <TableCell align="right">Actions</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {filteredUsers.map((user, index) => (
                      <TableRow
                        key={user.id}
                        sx={{
                          "&:last-child td, &:last-child th": { border: 0 },
                          "&:hover": { backgroundColor: "action.hover" },
                        }}
                      >
                        <TableCell>{index + 1}</TableCell>
                        <TableCell>
                          <Avatar
                            src={`http://localhost:5000/uploads/${user.profilePicture}`}
                            alt=""
                            sx={{ width: 40 }}
                          />
                        </TableCell>
                        <TableCell>{user.name}</TableCell>
                        <TableCell>{user.email}</TableCell>
                        <TableCell>
                          <Typography
                            variant="body2"
                            sx={{
                              color:
                                user.role === "admin" ? "error.main" : "green",
                              fontWeight: "bold",
                            }}
                          >
                            {user.role}
                          </Typography>
                        </TableCell>

                        <TableCell>
                          {new Date(user.createdAt).toLocaleDateString(
                            "en-GB",
                            {
                              day: "2-digit",
                              month: "2-digit",
                              year: "numeric",
                            }
                          )}
                        </TableCell>
                        <TableCell align="right">
                          <Box
                            sx={{
                              display: "flex",
                              justifyContent: "flex-end",
                            }}
                          >
                            <Tooltip title="View Details">
                              <IconButton
                                color="primary"
                                onClick={() => handleViewUser(user)}
                              >
                                <Visibility />
                              </IconButton>
                            </Tooltip>
                            <Tooltip title="Edit User">
                              <IconButton
                                color="secondary"
                                onClick={() => handleEditUser(user)}
                              >
                                <Edit />
                              </IconButton>
                            </Tooltip>
                            <Tooltip title="Delete User">
                              <IconButton
                                color="error"
                                onClick={() => handleDeleteUser(user)}
                              >
                                <Delete />
                              </IconButton>
                            </Tooltip>
                          </Box>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>

              {/* User Count */}
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  mt: 2,
                }}
              >
                <Typography variant="body2">
                  Total Users: {filteredUsers.length}
                </Typography>
              </Box>
            </>
          </Paper>
        </Container>
      </Box>

      {/* Add User Modal */}
      <Dialog
        open={openAddUserModal}
        onClose={() => setOpenAddUserModal(false)}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>
          Add New User
          <IconButton
            aria-label="close"
            onClick={() => setOpenAddUserModal(false)}
            sx={{
              position: "absolute",
              right: 8,
              top: 8,
              color: (theme) => theme.palette.grey[500],
            }}
          >
            <Close />
          </IconButton>
        </DialogTitle>
        <DialogContent>
          <Grid container spacing={2} sx={{ pt: 2 }}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Name"
                variant="outlined"
                value={newUser.name}
                onChange={(e) =>
                  setNewUser({ ...newUser, name: e.target.value })
                }
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Email"
                variant="outlined"
                value={newUser.email}
                onChange={(e) =>
                  setNewUser({ ...newUser, email: e.target.value })
                }
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Password"
                variant="outlined"
                value={newUser.password}
                onChange={(e) =>
                  setNewUser({ ...newUser, password: e.target.value })
                }
              />
            </Grid>
            <Grid item xs={6}>
              <FormControl fullWidth variant="outlined">
                <InputLabel>Role</InputLabel>
                <Select
                  value={newUser.role}
                  onChange={(e) =>
                    setNewUser({ ...newUser, role: e.target.value })
                  }
                  label="Role"
                >
                  <MenuItem value="user">User</MenuItem>
                  <MenuItem value="admin">Admin</MenuItem>
                </Select>
              </FormControl>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenAddUserModal(false)} color="secondary">
            Cancel
          </Button>
          <Button onClick={handleAddUser} color="primary" variant="contained">
            Add User
          </Button>
        </DialogActions>
      </Dialog>

      {/* View User Modal */}
      <Dialog
        open={openViewUserModal}
        onClose={() => setOpenViewUserModal(false)}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>
          <IconButton
            aria-label="close"
            onClick={() => setOpenViewUserModal(false)}
            sx={{
              position: "absolute",
              right: 8,
              top: 8,
              color: (theme) => theme.palette.grey[500],
            }}
          >
            <Close />
          </IconButton>
        </DialogTitle>
        <DialogContent>
          {selectedUser && (
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
                  </Box>
                  <Box sx={{ flexGrow: 1 }}>
                    <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                      <Email sx={{ mr: 2, color: "text.secondary" }} />
                      <Typography variant="body1">
                        {selectedUser?.email}
                      </Typography>
                    </Box>
                    <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                      <Phone sx={{ mr: 2, color: "text.secondary" }} />
                      <Typography variant="body1">
                        {selectedUser?.phone}
                      </Typography>
                    </Box>
                    <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                      <LocationOn sx={{ mr: 2, color: "text.secondary" }} />
                      <Typography variant="body1">
                        {selectedUser?.location}
                      </Typography>
                    </Box>
                    <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                      <Work sx={{ mr: 2, color: "text.secondary" }} />
                      <Typography variant="body1">
                        {selectedUser?.occupation}
                      </Typography>
                    </Box>
                    <Box sx={{ display: "flex", alignItems: "center" }}>
                      <Person sx={{ mr: 2, color: "text.secondary" }} />
                      <Typography variant="body1">
                        Bio: {selectedUser?.bio}
                      </Typography>
                    </Box>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          )}
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => setOpenViewUserModal(false)}
            color="primary"
            variant="contained"
          >
            Close
          </Button>
        </DialogActions>
      </Dialog>

      {/* edit user */}
      <Dialog
        open={openEditUserModal}
        onClose={() => setOpenViewUserModal(false)}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>
          Update User Details
          <IconButton
            aria-label="close"
            onClick={() => setOpenEditUserModal(false)}
            sx={{
              position: "absolute",
              right: 8,
              top: 8,
              color: (theme) => theme.palette.grey[500],
            }}
          >
            <Close />
          </IconButton>
        </DialogTitle>
        <DialogContent>
          {selectedUser && (
            <Grid container spacing={2} sx={{ pt: 2 }}>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Name"
                  variant="outlined"
                  value={selectedUser.name}
                  onChange={(e) =>
                    setSelectedUser({ ...selectedUser, name: e.target.value })
                  }
                />
              </Grid>
              <Grid item xs={6}>
                <FormControl fullWidth variant="outlined">
                  <InputLabel>Role</InputLabel>
                  <Select
                    value={selectedUser.role}
                    onChange={(e) =>
                      setSelectedUser({ ...selectedUser, role: e.target.value })
                    }
                    label="Role"
                  >
                    <MenuItem value="user">User</MenuItem>
                    <MenuItem value="admin">Admin</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
            </Grid>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenEditUserModal(false)} color="secondary">
            Cancel
          </Button>
          <Button
            onClick={handleUpdateUser}
            color="primary"
            variant="contained"
          >
            Update User
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default AdminUserManagement;
