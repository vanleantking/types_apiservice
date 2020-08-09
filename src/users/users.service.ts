import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { IUser } from './interfaces/user.interface'
import { UserDTO } from './dto/users-dto';
import { hash } from 'bcrypt'

@Injectable()
export class UsersService {
    constructor(@InjectModel('User') private readonly userModel: Model<IUser>) { }

    async findOne(username: string): Promise<IUser> {
        const user = await this.userModel.findOne({"username": username}).exec()
        return user
    }

    async registerUser(userDTO: UserDTO): Promise<IUser> {
        const user = await new this.userModel(userDTO)
        return user.save()
    }

    private async hashedPassword(password: string): Promise<string> {
        const hashed = await hash(password, 10)
        return hashed
    }
}
