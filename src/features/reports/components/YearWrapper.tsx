import type React from "react";
import { TableSkeleton } from "../../../common/components/utils/TableSkeleton";
import { ErrorState } from "../../../common/components/feedback";
import { TableEmptyState } from "../../../common/components/utils/TableEmptyState";

interface Props {
    year: string;
    children: React.ReactNode;
    isLoading?: boolean;
    isError?: boolean;
    isEmpty?: boolean;
}

export const YearWrapper = ({ year, isLoading, children, isError, isEmpty }: Props) => {
    if(!year) return null;

    if(isLoading !== undefined && isLoading) return <TableSkeleton columnsCount={5} />

    if(isError) return <ErrorState />

    if(isEmpty !== undefined && !isEmpty) return <TableEmptyState />
    
    return children
}