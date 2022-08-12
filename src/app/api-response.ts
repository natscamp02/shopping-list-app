export interface ApiResponse<T = any> {
    status: string;

    data?: T;
    message?: string;
}
