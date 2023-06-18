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

export const ColorEnum = {
    GREEN: 'green',
    RED: 'red',
    BLUE: 'blue',
    YELLOW: 'yellow',
    PURPLE: 'purple',
    WHITE: 'white',
    BLACK: 'black',
    PINK: 'pink',
    GRAY: 'gray',
  } as const;
  
  export const SizeEnum = {
    XS: 'XS',
    S: 'S',
    M: 'M',
    L: 'L',
    XL: 'XL',
    XXL: 'XXL',
  } as const;
  
export interface ProductListModel {
    _id: string;
    title: string;
    description: string;
    img: string;
    categories: string[];
    color: string;
    price: number | string;
    size: string;
}

export interface OptionModel {
    label: string;
    value: string | number;
}