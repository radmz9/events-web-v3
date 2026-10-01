import { useParams } from "react-router-dom"
import { useGetPublicTokenQuery } from "../../api/activeEventApi";
import { skipToken } from "@reduxjs/toolkit/query";
import { ErrorState, LoadingState } from "../../../../common/components/feedback";
import { Details } from "./Details";
import { Forms } from "./Forms";

export const SinglePost = () => {
    const { eventId } = useParams<string>();

    const { isError, isLoading } = useGetPublicTokenQuery(
        eventId === null ? skipToken : Number(eventId)
    )
    if(!eventId) return null;

    if(isLoading) return <LoadingState />
    if(isError) return <ErrorState />

    return(
        <div className="space-y-8">
            <Details />
            <Forms />
        </div>
    )
}