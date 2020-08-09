import { Controller, Post, Body, HttpStatus, Res } from '@nestjs/common';
import { UsersService } from './users.service';
import { Response } from 'express';
import { UserDTO } from './dto/users-dto'

@Controller('users')
export class UsersController {
    constructor(private userService: UsersService) {}

    @Post('/register')
    async userRegister(@Res() res: Response, @Body() userDTO: UserDTO):Promise<any>{
        try {
            const newUser = await this.userService.registerUser(userDTO)
            console.log("user dto, ", UserDTO)
            return res.status(HttpStatus.OK).json({
                "message": 'user register success',
                user: newUser
            })
        } catch(e){
            return res.status(HttpStatus.BAD_REQUEST).json({
                "message": e.message,
                "status_code": HttpStatus.BAD_REQUEST,
                user: null})
        }       
    }
}
