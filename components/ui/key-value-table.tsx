import { ReactNode } from "react";

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableRow,
} from "@/components/ui/table";

export type TableValue = ReactNode;

export interface KeyValueTableProps {
  data: Record<string, TableValue>;
  caption?: string;
}

export const KeyValueTable: React.FC<KeyValueTableProps> = ({
  caption,
  data,
}) => (
  <Table>
    {caption && <TableCaption>{caption}</TableCaption>}
    <TableBody>
      {Object.entries(data).map(([key, value]) => (
        <TableRow key={key}>
          <TableCell className="font-bold">{key}</TableCell>
          <TableCell>{value}</TableCell>
        </TableRow>
      ))}
    </TableBody>
  </Table>
);
