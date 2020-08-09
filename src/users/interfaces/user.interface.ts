import { Document } from "mongoose"
import { UserType } from '../constant'

export interface IUser extends Document {
    readonly username: string;
    password: string;
    readonly email: string;
    created_date: string; // dd/mm/yyyy
    readonly birthdate: string;
    user_type: UserType;
    comparePassword(candidatePassword: string): Promise<boolean>;
}