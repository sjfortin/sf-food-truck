import { FoodTruckTable } from "@/components/FoodTruckTable";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export function FoodTruckList() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Food Trucks</CardTitle>
        <CardDescription>
          Explore and find your favorite food trucks in San Francisco.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <FoodTruckTable />
      </CardContent>
      <CardFooter>
        <div className="text-xs text-muted-foreground">
          Showing <strong>1-10</strong> of <strong>50</strong> food trucks
        </div>
      </CardFooter>
    </Card>
  );
}
