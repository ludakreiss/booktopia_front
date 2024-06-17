import {ReviewModel} from './review.model';
import {GenreModel} from './genre.model';


export interface BookModel {
    id?: number,
    title: string,
    author: string,
    description?: string,
    book_cover?: string,
    genres?: GenreModel[],
    reviews?: ReviewModel[],
    created_at?: Date,
}