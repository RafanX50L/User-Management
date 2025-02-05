import { useState } from 'react';
import { useAppDispatch } from '../redux/store';
import { register } from '../redux/authSlice';
import { useNavigate } from 'react-router-dom';




import { 
  Container, 
  Box, 
  Typography, 
  TextField, 
  Button, 
  Avatar, 
  Paper, 
} from '@mui/material';
import { 
  Person, 
} from '@mui/icons-material';

// Register Component
const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rePassword, setRePassword] = useState('');
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await dispatch(register({ name, email, password, role:"user" }));
    navigate('/user');
  };
  return (
    <Container maxWidth="xs">
      <Paper
        elevation={6}
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          padding: 3,
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
          <Person />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign Up
        </Typography>
        <Box onSubmit={handleSubmit} component="form" sx={{ width: "100%", mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            value={name}
            onChange={(e)=>setName(e.target.value)}
            label="Full Name"
            name="fullName"
            autoFocus
          />
          <TextField
            margin="normal"
            required
            fullWidth
            value={email}
            onChange={(e)=>setEmail(e.target.value)}
            label="Email Address"
            name="email"
            autoComplete="email"
          />
          <TextField
            margin="normal"
            required
            fullWidth
            value={password}
            onChange={(e)=>setPassword(e.target.value)}
            name="password"
            label="Password"
            type="password"
            autoComplete="new-password"
          />
          <TextField
            margin="normal"
            required
            fullWidth
            value={rePassword}
            onChange={(e)=>setRePassword(e.target.value)}
            name="confirmPassword"
            label="Confirm Password"
            type="password"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Sign Up
          </Button>
        </Box>
      </Paper>
    </Container>
  );
};

export default Register;