import { useState } from "react"
import { useReportByRolesQuery } from "../api/reportsApi";
import { skipToken } from "@reduxjs/toolkit/query";
import { generateYears } from "./year.constant";
import { Header } from "./Header";
import { type PaginationState, type VisibilityState } from "@tanstack/react-table";
import type { ReportByRoles as ReportByRolesType } from "../types/by_roles.types";
import { useTanStackTable } from "../../../common/hooks/tanstack-table.hook";
import { ColumnVisibiltyMenu, Meta, Pagination, SearchInput, TableContent } from "../../../common/components/stack";
import { reportByRolesColumns } from "../columns/reportByRolesColumns";
import { useNameFilter } from "../../../common/hooks/useNameFilter.hook";
import { YearWrapper } from "./YearWrapper";

const YEARS = generateYears();

const EMPTY_REPORT: ReportByRolesType[] = [];

export const ReportByRoles = () => {
    const [year, setYear] = useState<string>("");

    const { data, isLoading, isFetching, isError } = useReportByRolesQuery(
        year === "" ? skipToken : Number(year)
    );

    const report = data ?? EMPTY_REPORT;

    const [pagination, setPagination] = useState<PaginationState>({
        pageIndex: 0,
        pageSize: 10
    });

    const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});

    const columns = reportByRolesColumns;

    const { search, setSearch, filteredData } = useNameFilter(report);

    const table = useTanStackTable({
        data: filteredData,
        columns,
        pagination,
        setPagination,
        columnVisibility,
        setColumnVisibility
    });

    const rows = table.getRowModel().rows.length;
    const total = report.length;
    const pageCount = table.getPageCount();

    const title = 'Reporte de asistencia por roles';
    const isEmpty = !!year && !!data?.length;

    return(
        <div className="space-y-6 p-6">
            <Header
                title={title}
                years={YEARS}
                selectedYear={year}
                onYearChange={setYear}
            />
            <YearWrapper year={year} isError={isError} isEmpty={isEmpty}>
                <div className="overflow-x-auto rounded-lg border border-slate-200 shadow-md">
                    <div className="flex items-center justify-between p-6">
                        <SearchInput search={search} setSearch={setSearch} setPagination={setPagination} />
                        <Meta rows={rows} total={total} />
                        <ColumnVisibiltyMenu allColumns={table.getAllColumns} />
                    </div>

                    <TableContent table={table} isLoading={isLoading || isFetching} />

                    <Pagination 
                        pagination={pagination}
                        setPagination={setPagination}
                        pageCount={pageCount}
                    />
                </div>
            </YearWrapper>
        </div>
    )
}