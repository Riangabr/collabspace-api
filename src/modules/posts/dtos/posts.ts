interface IPost {
  id: string;
  user_id: string;
  content: string;
  tags: string | null;
  visibility: number;
  published_at: Date;
}

interface IRequestCreatePost {
  content: string;
  tags: string;
  visibility: number;
}

interface ICreatePost {
  id: string;
  userId: string;
  content: string;
  tags?: string;
  visibility?: number;
}

export { IPost, ICreatePost, IRequestCreatePost };
