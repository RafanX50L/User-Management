import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import UserService from "../services/userServices";
import { userDatas } from "../services/userServices";

const initialState = {
  isLoading: false,
  error: null,
};

const updateUserData = createAsyncThunk(
  "user/update",
  async (userData:userDatas, { rejectWithValue }) => {
    try {
      return await UserService.updateData(userData);
    } catch (error: any) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

const fetchUserData = createAsyncThunk(
  "user/fetch",
  async ( userId:string, {rejectWithValue}) => {
    try {
      console.log('it is here')
      return await UserService.fetchData(userId)
    } catch (error:any) {
      return rejectWithValue(error.response.data.message)
    }
  }
)

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
      .addCase(updateUserData.fulfilled, (state)=>{
        state.isLoading = false;
      });
  },
});

export { updateUserData, fetchUserData };
export default userSlice.reducer;
