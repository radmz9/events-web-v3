import { toast } from "sonner";
import { baseApi } from "../../../app/services/baseApi";
import type { Attendance } from "../types/attendace.types";
import { type ExternalDto } from "../types/externals.dto";
import { type ExternalTypes } from "../types/externals.types";
import type { InternalDto } from "../types/internals.dto";
import type { InternalTypes } from "../types/internals.types";

export const attendanceApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getEventAttendace: builder.query<Attendance, void>({
            query: () => `/records/event/attendance`,
            providesTags: ['Attendance']
        }),
        getAttendance: builder.query<Attendance, string>({
            query: (eventId) => `/records/event/attendance/${eventId}`,
            providesTags: (result, _, id) => result ? [{ type: 'Attendance', id }] : ['Attendance']
        }),
        //Mutations
        registerInternal: builder.mutation<InternalTypes, InternalDto>({
            query: (body) => ({
                url: '/records/community',
                method: 'POST',
                body
            }),
            async onQueryStarted(_, { dispatch, queryFulfilled }){
                try {
                    const { data: record } = await queryFulfilled;
                    dispatch(
                        attendanceApi.util.updateQueryData('getEventAttendace', undefined, (draft) => {
                            draft.internals.unshift(record)
                            switch (record.idRol) {
                                case 1:
                                    draft.stats.alumnos+=1;
                                    draft.stats.total+=1;
                                    break;
                                case 2:
                                    draft.stats.egresados+=1;
                                    draft.stats.total+=1;
                                    break;
                                case 4:
                                    draft.stats.profesores+=1;
                                    draft.stats.total+=1;
                                    break;
                                case 5:
                                    draft.stats.administrativos+=1;
                                    draft.stats.total+=1;
                                    break;
                                default:
                                    break;
                            }
                        })
                    )
                    toast.success('Registro Exitoso!', {
                        description: `Bienvenido: ${record.nombre}`,
                        duration: 8000
                    })
                } catch (error) {
                    console.log(error)
                }
            }
        }),
        deleteInternal: builder.mutation<void, number>({
            query: (userId) => ({
                url: `/records/community/${userId}`,
                method: 'DELETE'
            }),
            async onQueryStarted(userId, { dispatch, queryFulfilled }){
                try {
                    await queryFulfilled;
                    dispatch(
                        attendanceApi.util.updateQueryData('getEventAttendace', undefined, (draft) => {
                            const user = draft.internals.find(i => i.id === userId);
                            
                            switch (user?.idRol) {
                                case 1:
                                    draft.stats.alumnos-=1;
                                    draft.stats.total-=1;
                                    break;
                                case 2:
                                    draft.stats.egresados-=1;
                                    draft.stats.total-=1;
                                    break;
                                case 4:
                                    draft.stats.profesores-=1;
                                    draft.stats.total-=1;
                                    break;
                                case 5:
                                    draft.stats.administrativos-=1;
                                    draft.stats.total-=1;
                                    break;
                            
                                default:
                                    break;
                            }
                            draft.internals = draft.internals.filter(i => i.id !== userId);
                        })
                    )
                } catch (error) {
                    console.log(error)
                }
            }
        }),
        registerExternal: builder.mutation<ExternalTypes, ExternalDto>({
            query: (body) => ({
                url: `/records/outsiders`,
                method: 'POST',
                body
            }),
            async onQueryStarted(_, { dispatch, queryFulfilled }){
                try {
                    const { data: external } = await queryFulfilled;
                    dispatch(
                        attendanceApi.util.updateQueryData('getEventAttendace', undefined, (draft) => {
                            draft.externals.unshift(external);
                            draft.stats.externos+=1;
                            draft.stats.total+=1;
                        })
                    )
                    toast.success('Registro Exitoso!', {
                        description: `Bienvenido: ${external.nombre}`,
                        duration: 8000
                    })
                } catch (error) {
                    console.log(error)
                }
            }
        }),
        deleteExternal: builder.mutation<void, number >({
            query: (externalId) => ({
                url: `/records/outsiders/${externalId}`,
                method: 'DELETE'
            }),
            async onQueryStarted(externalId, { dispatch, queryFulfilled }){
                try {
                    await queryFulfilled;
                    dispatch(
                        attendanceApi.util.updateQueryData('getEventAttendace', undefined, (draft) => {
                            draft.externals = draft.externals.filter(e => e.id !== externalId);
                            draft.stats.externos-=1;
                            draft.stats.total-=1;
                        })
                    )
                } catch (error) {
                    console.log(error)
                }
            }
        })
    })
});

export const { 
    useGetEventAttendaceQuery, 
    useGetAttendanceQuery,
    useRegisterInternalMutation, 
    useDeleteInternalMutation, 
    useRegisterExternalMutation, 
    useDeleteExternalMutation 
} = attendanceApi;