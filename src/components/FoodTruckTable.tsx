import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { FoodTruck } from "@/data/food-truck";

interface FoodTruckTableProps {
  foodTrucks: FoodTruck[];
}

export function FoodTruckTable({ foodTrucks }: FoodTruckTableProps) {
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
        {foodTrucks.map((truck) => (
          <TableRow key={truck.locationid}>
            <TableCell className="font-medium">{truck.applicant}</TableCell>
            <TableCell>{truck.fooditems}</TableCell>
            <TableCell className="hidden md:table-cell">
              {truck.locationdescription}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
