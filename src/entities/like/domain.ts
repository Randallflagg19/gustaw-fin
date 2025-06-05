export type LikeEntity = {
  id: string;
  userId: string;
  postId: string;
  createdAt: Date;
};

export type CreateLikeResponse = {
  like: LikeEntity;
};
