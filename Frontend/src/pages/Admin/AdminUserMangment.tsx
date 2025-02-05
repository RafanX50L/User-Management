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
    DialogActions,
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
  } from "@mui/icons-material";
  import { useState } from "react";
import { useActionData, useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../redux/store";
import { logout } from "../../redux/authSlice";
  
  // Admin Dashboard Component
  const SAMPLE_USERS = [
    {
      id: 1,
      name: "John Doe",
      email: "john.doe@example.com",
      role: "User",
      status: "Active",
      registeredDate: "2024-01-15",
    },
    {
      id: 2,
      name: "Jane Smith",
      email: "jane.smith@example.com",
      role: "Admin",
      status: "Active",
      registeredDate: "2024-01-10",
    },
    {
      id: 3,
      name: "Mike Johnson",
      email: "mike.johnson@example.com",
      role: "User",
      status: "Inactive",
      registeredDate: "2024-02-01",
    },
    {
      id: 4,
      name: "Emily Brown",
      email: "emily.brown@example.com",
      role: "User",
      status: "Active",
      registeredDate: "2024-01-25",
    },
    {
      id: 5,
      name: "David Wilson",
      email: "david.wilson@example.com",
      role: "Admin",
      status: "Active",
      registeredDate: "2024-01-20",
    },
  ];
  
  // Admin Dashboard Component
  
  const AdminUserManagement = () => {

    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    const [users, setUsers] = useState(SAMPLE_USERS);
    const [searchTerm, setSearchTerm] = useState("");
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [mobileOpen, setMobileOpen] = useState(false);
  
    // Modal state
    const [openAddUserModal, setOpenAddUserModal] = useState(false);
    const [openViewUserModal, setOpenViewUserModal] = useState(false);
    const [openEditUserModal, setOpenEditUserModal] = useState(false);
    const [selectedUser, setSelectedUser] = useState(null);
  
    // New user form state
    const [newUser, setNewUser] = useState({
      name: "",
      email: "",
      role: "User",
      status: "Active",
    });
  
    // Login handling
    const handleLogin = () => {
      setIsLoggedIn(true);
    };
  
    const handleLogout = () => {
      dispatch(logout());
    };
  
    // Drawer toggle for mobile
    const handleDrawerToggle = () => {
      setMobileOpen(!mobileOpen);
    };
  
    // User management functions
    const handleAddUser = () => {
      const newUserWithId = {
        ...newUser,
        id: users.length + 1,
        registeredDate: new Date().toISOString().split("T")[0],
      };
      setUsers([...users, newUserWithId]);
      setOpenAddUserModal(false);
      // Reset new user form
      setNewUser({
        name: "",
        email: "",
        role: "User",
        status: "Active",
      });
    };
  
    const handleViewUser = (user) => {
      setSelectedUser(user);
      setOpenViewUserModal(true);
    };
  
    const handleEditUser = (user) => {
      setSelectedUser(user);
      setOpenEditUserModal(true);
    };
  
    const handleUpdateUser = () => {
      setUsers(users.map((u) => (u.id === selectedUser.id ? selectedUser : u)));
      setOpenEditUserModal(false);
    };
  
    // Filter users based on search term
    const filteredUsers = users.filter(
      (user) =>
        user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(searchTerm.toLowerCase())
    );
  
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
                          <TableCell>ID</TableCell>
                          <TableCell>Name</TableCell>
                          <TableCell>Email</TableCell>
                          <TableCell>Role</TableCell>
                          <TableCell>Status</TableCell>
                          <TableCell>Registered Date</TableCell>
                          <TableCell align="right">Actions</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {filteredUsers.map((user) => (
                          <TableRow
                            key={user.id}
                            sx={{
                              "&:last-child td, &:last-child th": { border: 0 },
                              "&:hover": { backgroundColor: "action.hover" },
                            }}
                          >
                            <TableCell>{user.id}</TableCell>
                            <TableCell>{user.name}</TableCell>
                            <TableCell>{user.email}</TableCell>
                            <TableCell>
                              <Typography
                                variant="body2"
                                sx={{
                                  color:
                                    user.role === "Admin"
                                      ? "error.main"
                                      : "text.secondary",
                                  fontWeight:
                                    user.role === "Admin" ? "bold" : "normal",
                                }}
                              >
                                {user.role}
                              </Typography>
                            </TableCell>
                            <TableCell>
                              <Typography
                                variant="body2"
                                sx={{
                                  color:
                                    user.status === "Active"
                                      ? "success.main"
                                      : "error.main",
                                  fontWeight: "bold",
                                }}
                              >
                                {user.status}
                              </Typography>
                            </TableCell>
                            <TableCell>{user.registeredDate}</TableCell>
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
                                  <IconButton color="error">
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
                    <MenuItem value="User">User</MenuItem>
                    <MenuItem value="Admin">Admin</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={6}>
                <FormControl fullWidth variant="outlined">
                  <InputLabel>Status</InputLabel>
                  <Select
                    value={newUser.status}
                    onChange={(e) =>
                      setNewUser({ ...newUser, status: e.target.value })
                    }
                    label="Status"
                  >
                    <MenuItem value="Active">Active</MenuItem>
                    <MenuItem value="Inactive">Inactive</MenuItem>
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
            User Details
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
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Email"
                    variant="outlined"
                    value={selectedUser.email}
                    onChange={(e) =>
                      setSelectedUser({ ...selectedUser, email: e.target.value })
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
                      <MenuItem value="User">User</MenuItem>
                      <MenuItem value="Admin">Admin</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={6}>
                  <FormControl fullWidth variant="outlined">
                    <InputLabel>Status</InputLabel>
                    <Select
                      value={selectedUser.status}
                      onChange={(e) =>
                        setSelectedUser({
                          ...selectedUser,
                          status: e.target.value,
                        })
                      }
                      label="Status"
                    >
                      <MenuItem value="Active">Active</MenuItem>
                      <MenuItem value="Inactive">Inactive</MenuItem>
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