import { baseApi } from "../../../app/services/baseApi";
import type { ReportByGender } from "../types/by_gender.types";
import type { FullReportByOds } from "../types/by_ods.types";
import type { ReportByRoles } from "../types/by_roles.types";
import type { ReportByStaff } from "../types/by_staff.types";
import type { ReportByStudents } from "../types/by_students.types";
import type { DetailedReport } from "../types/detailed_report.types";
import { type GeneralReportByAreaDto, type GeneralReport } from "../types/general.types";

const endpoint = '/reports';

export const reportsApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        reportByGender: builder.query<ReportByGender[], number>({
            query: (year) => ({
                url: `${endpoint}/${year}/genders`,
                method: 'GET'
            })
        }),
        reportByRoles: builder.query<ReportByRoles[], number>({
            query: (year) => ({
                url: `${endpoint}/${year}/roles`,
                method: 'GET'
            })
        }),
        reportByOds: builder.query<FullReportByOds, number>({
            query: (year) => ({
                url: `${endpoint}/${year}/ods`,
                method: 'GET'
            })
        }),
        reportByStudents: builder.query<ReportByStudents[], number>({
            query: (year) => ({
                url: `${endpoint}/${year}/students`,
                method: 'GET'
            })
        }),
        reportByStaff: builder.query<ReportByStaff[], number>({
            query: (year) => ({
                url: `${endpoint}/${year}/staff`,
                method: 'GET'
            })
        }),
        generalReport: builder.query<GeneralReport, number>({
            query: (year) => ({
                url: `${endpoint}/${year}/general`,
                method: 'GET'
            })
        }),
        //General report by area
        generalReportByArea: builder.query<GeneralReportByAreaDto, void>({
            query: () => ({
                url: `${endpoint}/`,
                method: 'GET'
            })
        }),
        detailedReportByStudents: builder.query<DetailedReport[], number>({
            query: (year) => ({
                url: `${endpoint}/${year}/details`,
                method: 'GET'
            })
        })
    })
})

export const { 
    useReportByGenderQuery, 
    useReportByRolesQuery, 
    useReportByOdsQuery, 
    useReportByStudentsQuery, 
    useReportByStaffQuery,
    useGeneralReportQuery,
    useGeneralReportByAreaQuery,
    useDetailedReportByStudentsQuery
} = reportsApi;