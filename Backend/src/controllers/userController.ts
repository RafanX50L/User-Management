import { Request, Response } from 'express';
import User from '../models/User';

const updateData = async( req:Request, res:Response ) => {

}

const fetchData = async ( req:Request, res:Response ) => {
    console.log('nicekdfkaldsfj')
    const { id } = req.body;
    console.log(id);
}
 
export { updateData, fetchData };