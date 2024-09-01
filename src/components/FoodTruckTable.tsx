import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export function FoodTruckTable() {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Name</TableHead>
          <TableHead>Cuisine</TableHead>
          <TableHead className="hidden md:table-cell">Location</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow>
          <TableCell className="font-medium">Taco Truck Deluxe</TableCell>
          <TableCell>Mexican</TableCell>
          <TableCell className="hidden md:table-cell">
            Mission District
          </TableCell>
        </TableRow>
      </TableBody>
    </Table>
  );
}
