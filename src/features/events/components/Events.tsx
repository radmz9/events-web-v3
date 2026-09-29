import { useState } from "react"
import { useGetEventsQuery } from "../api/eventApi"
import { EventTable } from "./EventTable"
import type { MetaData } from "../types/event.types"
import { TableSkeleton } from "../../../common/components/utils/TableSkeleton"
import { eventHeader } from "../constants/header.constant"
import { TableEmptyState } from "../../../common/components/utils/TableEmptyState"

const initialState: MetaData = {
    totalItems: 0,
    itemCount: 0,
    itemsPerPage: 0,
    totalPages: 0,
    currentPage: 0
}

export const Events = () => {
    const [page, setPage] = useState<number>(1)
    const [size, setSize] = useState<number>(25);
    const { data, isError, isLoading } = useGetEventsQuery({ page, size })
    
    if(isLoading) return <TableSkeleton columnsCount={eventHeader.length + 1} />

    if(isError) return <p>Error al cargar la pagina</p>

    const events = data?.data || [];
    const meta = data?.meta || initialState;

    if(events.length === 0) return <TableEmptyState />

    return(
        <EventTable
            events={events}
            meta={meta}
            page={page}
            setPage={setPage}
            size={size}
            setSize={setSize}
        />
    )
}