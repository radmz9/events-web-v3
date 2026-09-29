import { baseApi } from "../../../app/services/baseApi";
import type { RootState } from "../../../app/store";
import type { AuthSlice } from "../../auth/services/authSlice";
import type { StudentStatsTypes } from "../types/student-stats.types";
import type { StudentTypes } from "../types/student.types";

const endpoint = '/students';

export const studentApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getStudentsStats: builder.query<StudentStatsTypes, void>({
            query: () => `${endpoint}/historical/report`,
            providesTags: ['StudentStats']
        }),
        //Root
        getStudentsByArea: builder.query<StudentTypes[], { areaId: string, calendarId: string }>({
            query: ({ areaId, calendarId }) => `${endpoint}/area/${areaId}/calendar/${calendarId}`,
            providesTags: ['Students']
        }),
        //Coordi
        getMyStudents: builder.query<StudentTypes[], string>({
            query: (calendarId) => `${endpoint}/calendar/${calendarId}`,
            providesTags: ['Students']
        }),
        //Mutations
        createStudent: builder.mutation<StudentTypes, Partial<StudentTypes>>({
            query: (student) => ({
                url: `${endpoint}`,
                method: 'POST',
                body: student
            }),
            async onQueryStarted(_arg, { dispatch, queryFulfilled, getState }){
                try {
                    const { data: createdStudent } = await queryFulfilled;

                    const { auth } = getState() as unknown as  { auth: AuthSlice };
                    const role = auth.role;
                    if(role === 'ROOT'){
                        dispatch(
                            studentApi.util.updateQueryData(
                                'getStudentsByArea', { areaId: createdStudent.idArea, calendarId: createdStudent.idCalendario }, (draft) => {
                                    draft.unshift(createdStudent)
                                }
                            )
                        )
                    }else{
                        dispatch(
                            studentApi.util.updateQueryData(
                                'getMyStudents', createdStudent.idCalendario, (draft) => {
                                    draft.unshift(createdStudent)
                                }
                            )
                        )
                    }
                } catch (error) {
                    console.log(error)
                }
            }
        }),
        updateStudent: builder.mutation<StudentTypes, { studentId: number, student: Partial<StudentTypes> }>({
            query: ({ studentId, student }) => ({
                url: `${endpoint}/${studentId}`,
                method: 'PATCH',
                body: student
            }),
            async onQueryStarted({ studentId }, { dispatch, queryFulfilled, getState }){
                try {
                    const { role } = (getState() as RootState).auth;
                    const { data: updatedStudent } = await queryFulfilled;
                    if(role === 'ROOT'){
                        dispatch(
                            studentApi.util.updateQueryData(
                                'getStudentsByArea', { areaId: updatedStudent.idArea, calendarId: updatedStudent.idCalendario }, (draft) => {
                                    const index = draft.findIndex(s => s.id === studentId);
                                    if(index !== -1) draft[index] = updatedStudent;
                                }
                            )
                        )
                    }else{
                        dispatch(
                            studentApi.util.updateQueryData(
                                'getMyStudents', updatedStudent.idCalendario, (draft) => {
                                    const index = draft.findIndex(s => s.id === studentId);
                                    if(index !== -1) draft[index] = updatedStudent;
                                }
                            )
                        )
                    }
                } catch (error) {
                    console.log(error)
                }
            }
        }),
        deleteStudent: builder.mutation<void, number>({
            query: (studentId) => ({
                url: `${endpoint}/${studentId}`,
                method: 'DELETE'
            }),
            invalidatesTags: ['Students']
        })

    })
});

export const { 
    useGetStudentsStatsQuery,
    useGetStudentsByAreaQuery,
    useLazyGetStudentsByAreaQuery,
    useGetMyStudentsQuery,
    useCreateStudentMutation,
    useUpdateStudentMutation,
    useDeleteStudentMutation
} = studentApi;