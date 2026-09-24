export interface RegisterInput {
    organizationName: string;
    organizationSlug: string;
    name: string;
    email: string;
    password: string;
}

export interface LoginInput {
    email: string;
    password: string;
}