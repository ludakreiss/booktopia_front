import { BookModel } from "./book.model";

export interface ToBeReadModel {
    id?:number,
    user_id:number,
    books: BookModel[],
    created_at:Date,
    updated_at:Date,
}