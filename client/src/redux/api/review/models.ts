interface IComment {
  _id: string;
  comment: string;
  rating: number;
}

interface IUser {
  id: string;
  firstName: string;
  lastName: string;
}

export interface IReview {
  user: IUser;
  rating: number;
  comments: IComment[];
}

export interface IReviewResponse {
  reviews: IReview[];
  averageRating: number;
}

export interface IContent {
  comment: string;
  rating: number;
  _id: string;
}

export interface ICommentBody {
  content: IContent[];
  userId: string;
}

export interface IUserCommentResponse {
  userName: string;
  userId: string;
  body: ICommentBody[];
}
