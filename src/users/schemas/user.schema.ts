import { Schema, model, Error } from 'mongoose'
import { hash, genSalt, compare } from 'bcrypt'
import { IUser } from '../interfaces/user.interface'

import { UserType } from '../constant'

//  With this in place, the datatype of data that will be stored in the database will be properly controlled
export const UserSchema = new Schema({
    username: {
        type: String,
        required: [true, 'username is required'],
        unique: true,
        trim: true},
    password: {
        type: String,
        required: [true, 'password is required'],
        trim: true},
    email: {
        type: String,
        required: [true, 'email is required'],
        trim: true,
        unique: true,
        lowercase:true,},
    created_date: String, // dd/mm/yyyy
    birthdate: String,
    user_type: {type: UserType}
})

UserSchema.pre<IUser>("save", function save(next) {
    const user = this;
    this.created_date = new Date().toISOString().substring(0,19).replace("T"," ")
    this.user_type = UserType.Customer
    if (!user.isModified("password")) {
      return next();
    }
    genSalt(10, (err, salt) => {
      if (err) {
        return next(err);
      }
      hash(user.password, salt, (err: Error, hash) => {
        if (err) {
          return next(err);
        }
        user.password = hash;
        next();
      });
    });
  });

// UserSchema.methods.comparePassword = function(candidatePassword, cb) {
//     compare(candidatePassword, this.password, function(err, isMatch) {
//         if (err) return cb(err);
//         cb(null, isMatch);
//     });
// };

UserSchema.methods.comparePassword = function (candidatePassword: string): Promise<boolean> {
    const password = this.password;
    return new Promise((resolve, reject) => {
        compare(candidatePassword, password, (err, success) => {
            if (err) return reject(err);
            return resolve(success);
        });
    });
};
// module.exports = mongoose.model<IUser>('User', UserSchema);
// const User = mongoose.model<IUser>('User', UserSchema);
// export const User = mongoose.model<IUser>('User', UserSchema); // this is what you want
module.exports = model<IUser>('User', UserSchema);
