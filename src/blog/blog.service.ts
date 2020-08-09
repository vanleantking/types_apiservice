import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Post } from './interfaces/post.interface';
import { CreatePostDTO } from './dto/create-post.dto';

@Injectable()
export class BlogService {
    constructor(@InjectModel('Post') private readonly postModel: Model<Post>) { }

    async addPost(createPostDTO: CreatePostDTO): Promise<Post> {
        const newPost = await new this.postModel(createPostDTO);
        return newPost.save();
    }

    async getPost(postID: string): Promise<Post> {
        const post = await this.postModel.findById(postID).exec()
        return post;
    }

    async getPosts(): Promise<Post[]> {
        const posts = await this.postModel.find().exec();
        return posts
    }

    async editPost(postID: string, createPostDTO: CreatePostDTO): Promise<Post> {
        const updatePost = await this.postModel.findByIdAndUpdate(postID, createPostDTO, {new: true});
        return updatePost;
    }

    async deletePost(postID: string): Promise<any> {
        const deletedPost = await this.postModel.findByIdAndRemove(postID);
        return deletedPost;
    }
}
