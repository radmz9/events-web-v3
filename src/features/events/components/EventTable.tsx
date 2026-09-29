import React, { useState } from "react";
import type { EventType, MetaData } from "../types/event.types"
import { eventHeader } from "../constants/header.constant";
import { Meta } from "../../../common/components/stack";
import { ChevronDown, ChevronLeft, ChevronRight, Settings, ToggleRight } from "lucide-react";
import { useDeleteEventMutation, useToggleStateEventMutation } from "../api/eventApi";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import { openModal } from "../../modals/services/modalSlice";
import { useEventCatalogs } from "../hooks/useEventCatalogs";
import { useDeleteResourse } from "../../../shared/utils/useDeleteResourse";
import { GenerateQR } from "./GenarateQR";
import { DeleteButton, UpdateButton, ViewButton } from "../../../common/ui";

interface Props {
    events: EventType[] | undefined;
    meta: MetaData | undefined;
    page: number;
    setPage: (page: number) => void;
    size: number;
    setSize: (size: number) => void;
}

export const EventTable = ({ events, meta, page, setPage, size, setSize }: Props) => {
    const { role } = useAppSelector(state => state.auth);
    const dispatch = useAppDispatch();
    const { catalog } = useEventCatalogs();
    const [openRowId, setOpenRowId] = useState<number | null>(null);
    const [toggleState, { isLoading }] = useToggleStateEventMutation();

    const { executeDelete } = useDeleteResourse();
    const [deleteEvent] = useDeleteEventMutation();

    if(events === undefined || meta === undefined) return null;

    const handlePrev = () => {
        if(page > 1) setPage(page - 1);
    }

    const handleNext = () => {
        if(page < meta.totalPages) setPage(page + 1);
    }

    const toggleActions = (id: number) => {
        setOpenRowId(prev => (prev === id ? null : id));
    }

    const handlePageSizeChange = (size: number) => {
        setPage(1);
        setSize(size);
    }
    const headers = role !== 'ROOT' ? eventHeader.slice(1) : eventHeader;
    const headersLength = headers.length + 1;
    return(
        <div className="overflow-x-auto border border-slate-200 rounded-lg">
            <div className="flex items-center justify-between p-6">
                <span className="px-2 text-xs font-mono">
                    Página {page} de {meta.totalPages}
                </span>

                <Meta rows={meta.itemCount} total={meta.totalItems} />
            </div>
            <table className="min-w-full divide-y divide-gray-200 text-xs">
                <thead className="bg-slate-50">
                    <tr>
                        { headers.map((h, i) => <th className="px-4 py-3 text-left text-slate-700" key={i}>{h}</th>) }
                        <th className="px-4 py-3 text-left text-slate-700"><Settings className="h-4 w-4" /></th>
                    </tr>
                </thead>
                <tbody className="bg-white divide-y divide-slate-200">
                    {events.map((event) => (
                        <React.Fragment key={event.id}>
                            <tr className={event.isActive ? 'bg-green-600 text-white hover:bg-green-700' : 'hover:bg-slate-100'}>
                                { role === 'ROOT' && <td className="px-4 py-3">{event.area}</td> }
                                <td className="px-4 py-3">{event.clave}</td>
                                <td className="px-4 py-3">{event.nombre}</td>
                                <td className="px-4 py-3">{event.tipo}</td>
                                <td className="px-4 py-3">{event.responsable}</td>
                                <td className="px-4 py-3">{event.fecha}</td>
                                <td className="px-4 py-3">{event.hora}</td>
                                <td className="px-4 py-3">{event.lugar}</td>
                                <td className="px-4 py-3 text-center">{event.duracion} {event.duracion > 1 ? 'hrs' : 'h'}</td>
                                <td className="px-4 py-3">{event.ods}</td>
                                <td className="px-4 py-3">{event.modalidad}</td>
                                <td className="px-4 py-3">{event.tematica}</td>
                                <td className="px-4 py-3">{event.sede}</td>
                                <td className="px-4 py-3 text-center">
                                    <button
                                        className={`cursor-pointer ${event.id === openRowId ? 'rotate-180' : ''}`}
                                        onClick={() => toggleActions(event.id)}
                                    >
                                        <ChevronDown />
                                    </button>
                                </td>
                            </tr>
                            { openRowId === event.id && (
                                <tr>
                                    <td className="px-4 py-3 bg-slate-50" colSpan={headersLength}>
                                        <div className="flex space-x-2 justify-between">
                                            <button
                                                title={event.isActive ? 'Desactivar' : 'Activar'}
                                                className={`cursor-pointer
                                                    ${event.isActive ? 'text-red-600' : 'rotate-180 text-green-500'}
                                                `}
                                                disabled={isLoading}
                                                onClick={() => toggleState({ eventId: event.id, pagination: { page, size } })}
                                            >
                                                <ToggleRight />
                                            </button>
                                            
                                            <GenerateQR eventId={String(event.id)} />

                                            <UpdateButton 
                                                action={() => dispatch(openModal({ type: 'UPDATE_EVENT', title: 'Editar evento', data: { event, ...catalog, page, size } }))}
                                            />

                                            <ViewButton url={`/eventos/detalles/${event.id}`} />

                                            <DeleteButton 
                                                action={() => {
                                                    void executeDelete(event.nombre, event.id, (id: number) =>
                                                        deleteEvent({ eventId: id, pagination: { page, size } })
                                                    );
                                                }}
                                            />
                                        </div>
                                    </td>
                                </tr>
                            )}
                        </React.Fragment>
                    ))}
                </tbody>
            </table>

            <div className="mt-4 flex justify-center items-center space-x-2 p-6 text-xs">
                <button 
                    className="px-3 py-1 flex items-center bg-slate-300 rounded disabled:opacity-50 cursor-pointer disabled:cursor-not-allowed"
                    onClick={handlePrev}
                    disabled={page === 1}
                >
                    <ChevronLeft />
                    Anterior
                </button>

                <span className="px-2">
                    Página {page} de {meta.totalPages}
                </span>

                <button 
                    className="px-3 py-1 flex items-center bg-slate-300 rounded disabled:opacity-50 cursor-pointer disabled:cursor-not-allowed"
                    onClick={handleNext}
                    disabled={page === meta.totalPages}
                >
                    Siguiente
                    <ChevronRight />
                </button>

                <select
                    className="text-xs border border-slate-200 p-2 rounded-lg font-mono"
                    onChange={(e) => handlePageSizeChange(Number(e.target.value))}
                >
                    <option value="">Filas</option>
                    { [25,50,75].map((r, i) => <option key={i} value={r}>{r} por página.</option>) }
                </select>
            </div>
        </div>
    )
}
