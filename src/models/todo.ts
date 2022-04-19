import { Models } from "appwrite";

export interface Todo extends Models.Document {
  createdAt: number;
  content: string;
  isDone: boolean;
}
