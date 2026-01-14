
export interface User {
  id: string;
  username: string;
  avatar: string;
  isVerified: boolean;
  followers: string;
  following: string;
  likes: string;
  bio: string;
}

export interface Video {
  id: string;
  user: User;
  description: string;
  hashtags: string[];
  music: string;
  likesCount: string;
  commentsCount: string;
  sharesCount: string;
  coverImage: string;
}

export interface Notification {
  id: string;
  user: User;
  type: 'like' | 'comment' | 'mention' | 'follow';
  time: string;
  content?: string;
  videoPreview?: string;
}
