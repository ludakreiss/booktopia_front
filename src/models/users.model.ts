// import { User } from "./user.model";

// export interface Users {
//    status: string;
//    data: User[];
// }// users.model.ts
import { User } from './user.model';

export interface Users extends Array<User> {}
