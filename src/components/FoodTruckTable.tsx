"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useFoodTrucks } from "@/context/FoodTruckContext";

export function FoodTruckTable() {
  const { foodTrucks, setSelectedFoodTruck } = useFoodTrucks();

  return (
    <div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Address</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {foodTrucks.map((truck) => (
            <TableRow
              key={truck.locationid}
              onClick={() => setSelectedFoodTruck(truck)}
              className="cursor-pointer hover:bg-gray-100"
            >
              <TableCell className="font-medium">{truck.applicant}</TableCell>
              <TableCell>{truck.address}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
