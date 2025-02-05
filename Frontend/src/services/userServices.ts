import axios from "axios";

const API_URL = "http://localhost:5000/api/user";

export interface UserData {
  id: string;
  name: string;
  email: string;
  location: string;
  phone: number;
  occupation: string;
  bio: string;
  role: "admin" | "user";
}

export interface UpdateUserResponse {
  message: string;
  userData: UserData;
}

export interface FetchUserResponse {
  userData: UserData;
}

const UserServices = {
  updateData: async (userData: UserData): Promise<UpdateUserResponse> => {
    const response = await axios.post(`${API_URL}/update`, userData);
    return response.data;
  },
  fetchData: async (userId: string): Promise<FetchUserResponse> => {
    console.log("Fetching data from API...");
    const response = await axios.get(`${API_URL}/fetch/${userId}`);
    console.log("API Response:", response.data);
    return response.data;
  },
};

export default UserServices;
