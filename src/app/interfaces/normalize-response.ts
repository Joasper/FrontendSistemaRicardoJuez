export interface NormalizeResponse<T>{
    data:  T;
    success: boolean;
    error: string;

    message: string;
}