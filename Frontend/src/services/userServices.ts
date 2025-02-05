import axios from "axios";
import { AuthResponse } from "./authService";

const API_URL = 'http://localhost:5000/api/user'; 

export interface userDatas{
    name:string,
    email:string,
    location:string,
    phone:number,
    occupation:string,
    bio:string,
}

const UserServices = {
    updateData:async(userData:userDatas):Promise<AuthResponse>=>{
        const response = await axios.post(`${API_URL}/update`, userData);
        return response.data;
    },
    fetchData:async(userId:string):Promise<AuthResponse> => {
        console.log('it here bro buttdy')
        const response = await axios.post(`${API_URL}/fetch`,userId)
        return response.data;
    }
}

export default UserServices;