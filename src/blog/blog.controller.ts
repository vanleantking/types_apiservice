import { Controller, Post, Res, Query, HttpStatus, Param, NotFoundException, Body, Get, Put, Delete} from '@nestjs/common';
import { BlogService } from './blog.service'
import { CreatePostDTO } from './dto/create-post.dto'
import { ValidateObjectId } from './shared/pipes/validate-object-id.pipes'
import { Response } from 'express';

@Controller('blog')
export class BlogController {
    constructor(private blogService: BlogService) {}

    @Post('/post')
    async addPost(@Res() res: Response, @Body() createPostDTO: CreatePostDTO):Promise<any> {
        const newPost = await this.blogService.addPost(createPostDTO);
        return res.status(HttpStatus.OK).json({
            "message": 'Post has been saved successfully',
            post: newPost
        })
    }

    @Get('/post/:postID')
    async getPost(@Res() res: Response, @Param('postID', new ValidateObjectId()) postID: string):Promise<any> {
        const post = await this.blogService.getPost(postID);
        if (!post) {
            throw new NotFoundException('Post does not exist!');
        }
        return res.status(HttpStatus.OK).json(post);
    }

    @Get('/posts')
    async getPosts(@Res() res: Response) :Promise<any>{
        const posts = await this.blogService.getPosts();
        return res.status(HttpStatus.OK).json(posts);
    }

    // Edit a particular post using ID
    @Put('/edit')
    async editPost(
        @Res() res: Response,
        @Query('postID', new ValidateObjectId()) postID: string,    
        @Body() createPostDTO: CreatePostDTO,
    ):Promise<any> {
        const editedPost = await this.blogService.editPost(postID, createPostDTO);
        if (!editedPost) {
            throw new NotFoundException('Post does not exist!');
        }
        return res.status(HttpStatus.OK).json({
        message: 'Post has been successfully updated',
        post: editedPost,
        });
    }
    
    // Delete a post using ID
    @Delete('/delete')
    async deletePost(@Res() res: Response, @Query('postID', new ValidateObjectId()) postID: string) :Promise<any>{
        const deletedPost = await this.blogService.deletePost(postID);
        if (!deletedPost) {
            throw new NotFoundException('Post does not exist!');
        }
        return res.status(HttpStatus.OK).json({
        message: 'Post has been deleted!',
        post: deletedPost,
        });
    }
}
