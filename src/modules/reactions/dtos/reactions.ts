interface IReaction {
  id: string;
  user_id: string;
  post_id: string | null;
  comment_id: string | null;
  entity_type: number;
  reacted_at: Date;
}

interface IRequestCreateReaction {
  postId: string;
  commentId: string;
  entityType: number;
}

interface ICreateReaction {
  id: string;
  userId: string;
  postId: string;
  commentId: string;
  entityType: number;
}

interface IRequestDeleteReaction {
  id: string;
  userId: string;
  reactedAt: Date;
}

export {
  IReaction,
  IRequestCreateReaction,
  ICreateReaction,
  IRequestDeleteReaction,
};
