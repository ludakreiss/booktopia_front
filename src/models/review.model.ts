import { User } from "./user.model";

export interface ReviewModel {
    id?: number,
    user_id: number,
    book_id: number,
    title:string,
    rating: number,
    review_text: string,
    created_at?: Date,
    updated_at?:Date,
    user?: User;
}