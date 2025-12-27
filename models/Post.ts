import mongoose, { Schema, Model } from 'mongoose';

export interface IPost {
  _id?: string;
  title: string;
  description: string;
  mediaUrl: string;
  mediaType: 'image' | 'video';
  createdAt: Date;
  updatedAt: Date;
}

const PostSchema = new Schema<IPost>(
  {
    title: {
      type: String,
      required: [true, 'Title is required'],
    },
    description: {
      type: String,
      required: [true, 'Description is required'],
    },
    mediaUrl: {
      type: String,
      required: [true, 'Media URL is required'],
    },
    mediaType: {
      type: String,
      enum: ['image', 'video'],
      required: [true, 'Media type is required'],
    },
  },
  {
    timestamps: true,
  }
);

const Post: Model<IPost> = mongoose.models.Post || mongoose.model<IPost>('Post', PostSchema);

export default Post;
