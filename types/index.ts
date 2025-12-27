export interface Post {
  id: string;
  title: string;
  description: string;
  mediaUrl: string;
  mediaType: 'image' | 'video';
  createdAt: Date;
  updatedAt: Date;
}

export interface PostFormData {
  title: string;
  description: string;
  file: File | null;
}
