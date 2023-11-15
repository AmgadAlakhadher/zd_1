export interface User {
    id: string | number;
    fullName: string;
    email: string;
    userType: string;
    phone: string;
    city: string;
    statusAccount: string;
    statusActivity: string;
    token: string;
}
export interface SessionSchema{
    isLoading: boolean;
    isAuth: boolean;
    error?: string ;
    email?: string;
    password?: string;
    accessToken: string;
    refreshToken: string;
}

export interface GetData{
    id: number | string;
    name: string;
}