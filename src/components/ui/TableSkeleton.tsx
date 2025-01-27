import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

const TableSkeleton = () => {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">
            <div className="h-4 bg-gray-200 rounded animate-pulse"></div>
          </TableHead>
          <TableHead>
            <div className="h-4 bg-gray-200 rounded animate-pulse"></div>
          </TableHead>
          <TableHead>
            <div className="h-4 bg-gray-200 rounded animate-pulse"></div>
          </TableHead>
          <TableHead className="text-right">
            <div className="h-4 bg-gray-200 rounded animate-pulse"></div>
          </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {[...Array(5)].map((_, index) => (
          <TableRow key={index}>
            <TableCell>
              <div className="h-4 bg-gray-200 rounded animate-pulse"></div>
            </TableCell>
            <TableCell>
              <div className="h-4 bg-gray-200 rounded animate-pulse"></div>
            </TableCell>
            <TableCell>
              <div className="h-4 bg-gray-200 rounded animate-pulse"></div>
            </TableCell>
            <TableCell>
              <div className="h-4 bg-gray-200 rounded animate-pulse"></div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}

export default TableSkeleton

