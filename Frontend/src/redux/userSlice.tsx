import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import UserService, {
  FetchUserResponse,
  UpdateUserResponse,
  UserData,
} from "../services/userServices";

export interface UserState {
  isLoading: boolean;
  userData: UserData | null;
  error: string | null;
}

const initialState: UserState = {
  isLoading: false,
  userData: null,
  error: null,
};

const updateUserData = createAsyncThunk<UpdateUserResponse, UserData>(
  "user/update",
  async (userData, { rejectWithValue }) => {
    try {
      return await UserService.updateData(userData);
    } catch (error: any) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

const fetchUserData = createAsyncThunk<FetchUserResponse, string>(
  "user/fetch",
  async (userId, { rejectWithValue }) => {
    try {
      console.log("Fetching user data...");
      return await UserService.fetchData(userId);
    } catch (error: any) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(updateUserData.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(updateUserData.fulfilled, (state, action) => {
        state.isLoading = false;
        state.userData = action.payload.userData;
      })
      .addCase(updateUserData.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      .addCase(fetchUserData.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchUserData.fulfilled, (state, action) => {
        state.isLoading = false;
        state.userData = action.payload.userData;
        console.log("Fetched data:", JSON.stringify(action.payload.userData));
      })
      .addCase(fetchUserData.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });
  },
});

export { updateUserData, fetchUserData };
export default userSlice.reducer;
