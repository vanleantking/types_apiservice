import {Document} from 'mongoose';

export interface Post extends Document {
    readonly title: string;
    readonly description: string;
    readonly content: string;
    readonly author: string;
    readonly createdDate: string,
    readonly tags: string,
}