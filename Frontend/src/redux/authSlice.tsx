import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { AuthService } from "../services/authService";
import axios, { AxiosError } from "axios";

export interface AuthState {
  token: string | null;
  role: "admin" | "user" | null;
  id: string;
  isLoading: boolean;
  error: string | null;
}

interface LoginCredentials {
  email: string;
  password: string;
}

interface RegisterData extends LoginCredentials {
  name: string;
  role: "admin" | "user";
}

const initialState: AuthState = {
  token: null,
  role: null,
  isLoading: false,
  id: "",
  error: null,
};

export const register = createAsyncThunk(
  "auth/register",
  async (userData: RegisterData, { rejectWithValue }) => {
    try {
      return await AuthService.register(userData);
    } catch (error) {
      const axiosError = error as AxiosError;
      return rejectWithValue(axiosError.status);
    }
  }
);

export const login = createAsyncThunk(
  "auth/login",
  async (credentials: LoginCredentials, { rejectWithValue }) => {
    try {
      return await AuthService.login(credentials);
    } catch (error: any) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

// In services/authService.ts
axios.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

/*
  //normal reducer
  function reducer(action,state){
    switch(action.type==='increment')
    {
    }
    }  }
  old redux
  dispatch({action:'increment'})
  
  */

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.token = null;
      state.role = null;
      localStorage.removeItem("token");
      localStorage.removeItem("role");
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(register.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.isLoading = false;
        state.id = action.payload.id;
        state.token = action.payload.token;
        state.role = action.payload.role;
      })
      .addCase(register.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      .addCase(login.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.isLoading = false;
        state.id = action.payload.id;
        state.token = action.payload.token;
        state.role = action.payload.role;
      })
      .addCase(login.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
