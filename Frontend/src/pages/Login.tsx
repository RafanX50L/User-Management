import { useState } from 'react';
import { useAppDispatch } from '../redux/store';
import { login } from '../redux/authSlice';
import { useNavigate } from 'react-router-dom';

import {
  Container,
  Box,
  Typography,
  TextField,
  Button,
  Avatar,
  Paper,
} from "@mui/material";
import { Login } from "@mui/icons-material";

// Login Component
export const LoginPage = () => {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const resultAction = await dispatch(login({ email, password }));
    if (login.fulfilled.match(resultAction)) {
      const role = resultAction.payload.role;
      navigate(role === 'admin' ? '/admin' : '/user');
    }
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
        <Avatar sx={{ m: 1, bgcolor: "primary.main" }}>
          <Login />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <Box onSubmit={handleSubmit} component="form" sx={{ width: "100%", mt: 1 }}>
          <TextField
            margin="normal"
            required
            value={email}
            fullWidth
            label="Email Address"
            onChange={(e)=>setEmail(e.target.value)}
            name="email"
            autoComplete="email"
            autoFocus
          />
          <TextField
            margin="normal"
            required
            fullWidth
            value={password}
            name="password"
            label="Password"
            onChange={(e)=>setPassword(e.target.value)}
            type="password"
            autoComplete="current-password"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Sign In
          </Button>
        </Box>
        <Container>
          <Typography component="p" variant="body1">
            Donot have an account ? 
          </Typography>
          <Typography onClick={()=>{navigate('/register')}} component='a' color='blue' sx={{cursor:'pointer'}}>
            Sign Up
          </Typography>
        </Container>
      </Paper>
    </Container>
  );
};
