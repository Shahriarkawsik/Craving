'use server';
import bcrypt from 'bcrypt';
import dbConnect, { collectionNamesObj } from '@/DB/dbConnect';


interface LoginPayload {
    email: string;
    password: string;
}

interface UserDocument {
    _id: string;
    name: string;
    email: string;
    password: string;
}

const loginUser = async (payload: LoginPayload): Promise<UserDocument | null> => {
    const { email, password } = payload;
    const userCollection = dbConnect(collectionNamesObj.userCollection);
    

    const user = await userCollection.findOne<UserDocument>({ email });

    if (!user) return null;

    
    const isPasswordOk = await bcrypt.compare(password, user.password);
    if (!isPasswordOk) return null;

    return user;
};

export default loginUser;
