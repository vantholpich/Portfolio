export type AppStatus = 'successful' | 'in-progress' | 'failed';
export type AppType = 'web' | 'ios';

export interface App {
    id: string;
    name: string;
    description: string;
    status: AppStatus;
    type: AppType;
    url?: string;
    app_store_url?: string;
    image_url?: string;
    created_at: string;
}
