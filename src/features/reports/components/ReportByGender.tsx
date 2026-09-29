import { useState } from "react";
import { Header } from "./Header"
import { generateYears } from "./year.constant"
import { useReportByGenderQuery } from "../api/reportsApi";
import { skipToken } from "@reduxjs/toolkit/query";
import { ColumnVisibiltyMenu, Meta, Pagination, SearchInput, TableContent } from "../../../common/components/stack";
import { useTanStackTable } from "../../../common/hooks/tanstack-table.hook";
import type { ReportByGender as ReportByGenderType } from "../types/by_gender.types";
import { reportByGenderColumns } from "../columns/reportByGenderColumns";
import { type PaginationState, type VisibilityState } from "@tanstack/react-table";
import { useNameFilter } from "../../../common/hooks/useNameFilter.hook";
import { useAppSelector } from "../../../app/hooks";
import { YearWrapper } from "./YearWrapper";

const YEARS = generateYears();

const EMPTY_REPORT: ReportByGenderType[] = [];

export const ReportByGender = () => {
    const { role } = useAppSelector(state => state.auth);
    const [year, setYear] = useState<string>("");
    const { data, isLoading, isFetching, isError } = useReportByGenderQuery(
        year === "" ? skipToken : Number(year)
    );

    const report = data ?? EMPTY_REPORT;
    const columns = role !== 'ROOT' ? reportByGenderColumns.slice(1) : reportByGenderColumns;

    const [pagination, setPagination] = useState<PaginationState>({
        pageIndex: 0,
        pageSize: 10
    });

    const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});

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

    const title = "Reporte de asistencia por género";

    const isEmpty = !!year && !!report.length;
    
    return(
        <div className="space-y-6 p-6">
            <Header
                title={title}
                years={YEARS}
                selectedYear={year}
                onYearChange={setYear}
                total={report.length}
            >
                <div className="flex flex-col gap-2 w-full md:w-auto text-sm text-slate-600 p-4 rounded-xl border border-slate-100">
                    <div className="flex items-center gap-2">
                        <span className="font-semibold text-slate-900 mr-3 border-b border-slate-100">Encabezados</span>
                    </div>
                    <div className="flex flex-col">
                        <span className="font-light">H = Hombres</span>
                        <span className="font-light">M = Mujeres</span>
                        <span className="font-light">I = Indigenas</span>
                        <span className="font-light">T = Total</span>
                    </div>
                </div>
            </Header>

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