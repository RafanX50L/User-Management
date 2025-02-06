import axios from "axios";

const API_URL = "http://localhost:5000/api/admin";


interface FetchUsersResponse {
    users: UserType[]; // Replace UserType with your user type
}

interface UserType{
    bio:string, 
    email:string, 
    location:string,
    name:string,
    occupation:string,
    password:string,
    phone:number 
    profilePicture:string,
    role:string,
}

export interface userData{
    name:string,
    password:string,
    email:string,
    role:string,
}
export interface updateData{
    name:string,
    id:string,
    role:string,
}

const AdminServices = {
    // Then use it in the service
    fetchData: async (): Promise<FetchUsersResponse> => {
        const response = await axios.get(`${API_URL}/fetch`);
        return response.data;
    },
    addNew: async (userData:userData):Promise<FetchUsersResponse> =>{
        const response = await axios.post(`${API_URL}/addUser`,userData)
        return response.data;
    },
    updateUser: async (updatedData:updateData):Promise<FetchUsersResponse> => {
        const response = await axios.post(`${API_URL}/updateUser`,updatedData);
        return response.data;
    } 
};



export default AdminServices;