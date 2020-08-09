import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { UsersService} from '../users/users.service'
import { IUser} from '../users/interfaces/user.interface'
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
    constructor(
        private userService: UsersService,
        private jwtService: JwtService) {}

    async validateUser(username: string, pass: string): Promise<any> {
        const user = await this.userService.findOne(username)
        console.log("user login find, ", user)
        if (!user) {
            throw new HttpException("User not found, ", HttpStatus.UNAUTHORIZED)
        }

        const isMatch = await user.comparePassword(pass)
        if (!isMatch) {
            throw new HttpException("Wrong password, ", HttpStatus.UNAUTHORIZED) 
        }
        const {password, ...result} = user
        return result;
    }

    async login(user: IUser): Promise<any> {
        const payload = { username: user.username, sub: user.email, user_type: user.user_type };
        return {
          access_token: this.jwtService.sign(payload),
        };
    }
}
