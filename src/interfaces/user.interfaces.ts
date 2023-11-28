export interface IUser {
    id: string;
    email: string;
    first_name: string;
    last_name: string;
    token: string;
    refresh_token: string;
    role: string;
}

export interface ICreateUser {
    email: string;
    first_name: string;
    last_name: string;
    password: string;
    confirm_password: string;
}

export interface IGeoLocation {
    lat: number;
    lng: number;
}
