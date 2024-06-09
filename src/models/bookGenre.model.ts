import { BookModel } from "./book.model";
import { GenreModel } from "./genre.model";

export interface BookGenreModel {
    id?: number,
    book_id: number,
    genre_id: number,
    book?: BookModel,
    genre?: GenreModel,
    created_at: Date,
    updated_at: Date,
}