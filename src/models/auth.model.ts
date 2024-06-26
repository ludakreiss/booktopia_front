export interface LoginRequest {
    email?: string,
    password?: string
}

export interface RegistrationRequest {
    name?: string;
    email?: string;
    password?: string;
    confirmPassword?: string;
}
export interface JwtResponse {
    access_token: string,
    token_type: string,
    expires_in: number
}
