import {
  ColumnDef,
  useReactTable,
  getCoreRowModel,
  getPaginationRowModel,
  flexRender,
} from "@tanstack/react-table";
import { Fragment } from "react";

import Pagination from "./Pagination";

export interface PaginatorProps<T> {
  data: T[] | undefined;
  columns: ColumnDef<T>[];
  wrapperClasses?: string;
  initialPageSize?: number;
  pageSizeOptions?: number[];
}

const fallbackData: unknown[] = [];

export function Paginator<T>({
  data,
  columns,
  wrapperClasses,
  initialPageSize,
  pageSizeOptions,
}: PaginatorProps<T>) {
  const table = useReactTable<T>({
    columns,
    data: data ?? (fallbackData as T[]),
    getCoreRowModel: getCoreRowModel<T>(),
    getPaginationRowModel: getPaginationRowModel<T>(),
    initialState: {
      pagination: {
        pageIndex: 0,
        pageSize: initialPageSize ?? 10,
      },
    },
  });

  return (
    <div className={wrapperClasses}>
      {table.getRowModel().rows.map((row) => (
        <Fragment key={row.id}>
          {row.getVisibleCells().map((cell) => (
            <Fragment key={cell.id}>
              {flexRender(cell.column.columnDef.cell, cell.getContext())}
            </Fragment>
          ))}
        </Fragment>
      ))}
      <Pagination table={table} pageSizeOptions={pageSizeOptions} />
    </div>
  );
}
