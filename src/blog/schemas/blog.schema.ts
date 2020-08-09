import * as mongoose from 'mongoose'

//  With this in place, the datatype of data that will be stored in the database will be properly controlled
export const BlogSchema = new mongoose.Schema({
    title: String,
    author: String,
    content: String,
    createdDate: String, // dd/mm/yyyy
    tags: String,
    description: String
})