import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Post from '@/models/Post';

// GET all posts
export async function GET() {
  try {
    await dbConnect();
    const posts = await Post.find({}).sort({ createdAt: -1 }).lean();
    
    return NextResponse.json({
      success: true,
      data: posts.map(post => ({
        id: post._id.toString(),
        title: post.title,
        description: post.description,
        mediaUrl: post.mediaUrl,
        mediaType: post.mediaType,
        createdAt: post.createdAt,
        updatedAt: post.updatedAt,
      }))
    });
  } catch (error: any) {
    console.error('Error fetching posts:', error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}

// POST create new post
export async function POST(request: Request) {
  try {
    await dbConnect();
    const body = await request.json();
    
    const post = await Post.create({
      title: body.title,
      description: body.description,
      mediaUrl: body.mediaUrl,
      mediaType: body.mediaType,
    });

    return NextResponse.json({
      success: true,
      data: {
        id: post._id.toString(),
        title: post.title,
        description: post.description,
        mediaUrl: post.mediaUrl,
        mediaType: post.mediaType,
        createdAt: post.createdAt,
        updatedAt: post.updatedAt,
      }
    });
  } catch (error: any) {
    console.error('Error creating post:', error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}
