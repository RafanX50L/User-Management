import { createAsyncThunk, createSlice, } from "@reduxjs/toolkit";
import AdminServices, { updateData, userData } from "../services/adminService";

const initialState = {
  isLoading: false,
  error: null,
  usersData: null,
};



const fetchUsers = createAsyncThunk(
  "admin/fetch",
  async (_, { rejectWithValue }) => {
    // Correct parameter destructuring
    try {
      const data = await AdminServices.fetchData();
      console.log(data)
      return data; // Assuming AdminServices now returns response data
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

const AddUser = createAsyncThunk(
  "admin/addUser",
  async (userData:userData,{rejectWithValue}) => {
    try {
      const data = await AdminServices.addNew(userData)
      console.log('new user',data)
      return data;
    } catch (error) {
      return rejectWithValue(error)
    }
  }
)

const updateUser = createAsyncThunk(
  "admin/updateUser",
  async (updatedData:updateData,{rejectWithValue}) =>{
    try {
      const data = await AdminServices.updateUser(updatedData)
      return data;
    } catch (error) {
      return rejectWithValue(error)
    }
  }
)

const deleteUser = createAsyncThunk(
  "admin/deleteUser",
  async(userId:string,{rejectWithValue}) => {
    try {
      const data = await AdminServices.deleteUser(userId);
      return data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
)

const adminSlice = createSlice({
  name: "admin",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.isLoading = false;
        state.usersData = action.payload.data; 
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(AddUser.pending,(state)=>{
        state.isLoading = true;
      })
      .addCase(AddUser.fulfilled,(state,action)=>{
        state.isLoading = false;
        state.usersData = action.payload.data;
      })
      .addCase(AddUser.rejected, (state,action)=>{
        state.isLoading = false;
        state.error = action.payload.message;
      })
      .addCase(updateUser.pending,(state)=>{
        state.isLoading = true;
      })
      .addCase(updateUser.fulfilled,(state,action)=>{
        state.isLoading = false;
        state.usersData = action.payload.data;
      })
      .addCase(updateUser.rejected,(state,action)=>{
        state.isLoading = false;
        state.error = action.payload.message;
      })
      .addCase(deleteUser.pending, (state)=>{
        state.isLoading = true;
      })
      .addCase(deleteUser.fulfilled, (state,action)=>{
        state.isLoading = false;
        state.usersData = action.payload.data;
      })
      .addCase(deleteUser.rejected, (state,action)=>{
        state.isLoading = false;
        state.error = action.payload.message;
      })
  },
});

export { fetchUsers, AddUser, updateUser, deleteUser };
export default adminSlice.reducer;
