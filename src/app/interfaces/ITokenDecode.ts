export interface ITokenDecode {
    document: string;
    role: string;
    name: string
    exp: number;
    iat: number;
    sub: string;
}