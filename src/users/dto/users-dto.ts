// A DTO is an object that defines how the data will be sent over the network.
// We could determine the DTO schema by using TypeScript interfaces, or by simple classes.
// we recommend using classes here. Why? Classes are part of the JavaScript ES6 standard,
// and therefore they are preserved as real entities in the compiled JavaScript.
// On the other hand, since TypeScript interfaces are removed during the transpilation,
// Nest can't refer to them at runtime
import { IsEmail, IsNotEmpty } from 'class-validator';

export class UserDTO {
    @IsNotEmpty() readonly username: string;

    @IsNotEmpty() readonly password: string;

    @IsNotEmpty() @IsEmail() readonly email: string;
    readonly birthdate: string;
}