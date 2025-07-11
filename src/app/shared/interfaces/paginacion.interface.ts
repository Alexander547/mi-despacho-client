export interface Paginacion {
    page: number;
    limit: number;
    search?: string | string[];
    order?: {
        field: string;
        direction: 'asc' | 'desc';
    };
    // filters?: any;
}
