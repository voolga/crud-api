export type IUser = {
    id: string;
    username: string;
    age: number;
    hobbies: string[];
}

export type IUserCreate = Omit<IUser, 'id'>;
export type IUserUpdate = Partial<IUserCreate>;

export type IUserResponse = IUser & { id: string };

export type IUsers = IUser[];
