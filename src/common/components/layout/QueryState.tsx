import type React from "react";
import { ErrorState, LoadingState } from "../feedback";

type QueryStateProps = {
    isLoading: boolean;
    isError?: boolean;
    // error?: unknown;
    children: React.ReactNode;
}

export const QueryState = ({
    isLoading,
    isError = false,
    // error,
    children
}: QueryStateProps) => {
    if(isLoading) return <LoadingState />
    if(isError) return <ErrorState />

    return children
}