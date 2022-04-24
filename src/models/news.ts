import { Models } from "appwrite";

export interface NewsModel extends Models.Document {
  createdAt?: number;
  title: string;
  authorId?: string;
  authorName?: string;
  upvotes: number;
  url: string;
  origin: "hackernews" | "origin";
}
