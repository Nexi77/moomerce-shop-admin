export interface AuthCredentialsModel {
    accessToken: string;
    refreshToken: string;
}

export interface UserModel {
    _id: string;
    email: string;
    name: string;
    createdAt: string;
    updatedAt: string;
    __v: number;
}

export interface ListUserModel {
    _id: string;
    email: string;
    name: string;
    createdAt: string;
    isAdmin: boolean;
}

export interface ZodResponseError {
    code: string;
    keys: string[];
    message: string;
    path: string[];
}