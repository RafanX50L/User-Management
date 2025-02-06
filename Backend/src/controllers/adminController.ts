import { Request, response, Response } from "express";
import User from "../models/User";

const fetchUsers = async (req: Request, res: Response) => {
    try {
        const usersData = await User.find();
        
        // Always send 200 with data (empty array is valid)
        res.status(200).json({ 
            success: true,
            data: usersData 
        });
        
    } catch (error) {
        console.error('Error fetching users:', error);
        
        // Proper error response
        res.status(500).json({
            success: false,
            message: 'Internal server error',
            error: error instanceof Error ? error.message : 'Unknown error'
        });
    }
}

const addUser = async ( req:Request,res:Response ) => {
    console.log('entered')
    const { name, email, password, role } = req.body;
    try {
        console.log(req.body)
        const user = await User.findOne({email});
        if(user){
            console.log(user)
            console.log('entered1')
            res.status(400).json({message:"Email is already exists"});
            return
        }
        console.log('entered2')
        
        const newUser = await User.create({ name, email, password, role });
        
        if(!newUser){
            console.log('entered3')
            res.status(500).json({message:'unnexped issue'})
            return
        }
        const users = await User.find();
        console.log('entered4')
        res.status(200).json({data:users,message:"Addin new user Scussfull"});
        return

    } catch (error) {
        console.log(error);
    }
}

export { fetchUsers, addUser };