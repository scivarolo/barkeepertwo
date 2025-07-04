import { Table } from "@tanstack/react-table";
import { Button } from "../ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import {
  ArrowLeft,
  ArrowLeftFromLine,
  ArrowRight,
  ArrowRightFromLine,
} from "lucide-react";

interface PaginationProps {
  table: Table<any>;
  pageSizeOptions?: number[];
}

export default function Pagination({
  table,
  pageSizeOptions = [10, 20, 30, 40, 50],
}: PaginationProps) {
  return (
    <div className="flex items-center justify-between p-4">
      <div>
        <Select
          value={table.getState().pagination.pageSize.toString()}
          onValueChange={(value) => {
            table.setPageSize(Number(value));
          }}>
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {pageSizeOptions.map((pageSize) => (
              <SelectItem key={pageSize} value={pageSize.toString()}>
                {pageSize}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <div className="flex items-center space-x-2">
        <Button
          variant="secondary"
          onClick={() => table.firstPage()}
          disabled={!table.getCanPreviousPage()}>
          <ArrowLeftFromLine />
        </Button>
        <Button
          variant="secondary"
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}>
          <ArrowLeft />
        </Button>
        <Button
          variant="secondary"
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}>
          <ArrowRight />
        </Button>
        <Button
          variant="secondary"
          onClick={() => table.lastPage()}
          disabled={!table.getCanNextPage()}>
          <ArrowRightFromLine />
        </Button>
      </div>
    </div>
  );
}
