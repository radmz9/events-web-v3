export type Column<T> = {
    header: string;
    key: keyof T | 'actions';
    render?: (item: T) => React.ReactNode;
}

export type Props<T> = {
    columns: Column<T>[];
    data: T[];
    isLoading?: boolean;
}