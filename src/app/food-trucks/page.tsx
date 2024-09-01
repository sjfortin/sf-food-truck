import { FoodTruckTable } from "@/components/FoodTruckTable";
import { FoodTypeSelect } from "@/components/FoodTypeSelect";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { getFoodTruckData } from "@/utils/getFoodTruckData";
import { FilterFoodTrucks } from "@/utils/filterFoodTrucks";

export const dynamic = "force-dynamic";

export default async function Page({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const foodType = searchParams.foodType as string | undefined;

  const allFoodTrucks = await getFoodTruckData();

  const filterFoodTrucks = new FilterFoodTrucks(allFoodTrucks);

  const { filteredFoodTrucks, error } = filterFoodTrucks.filterByFoodType(
    foodType ? [foodType] : null
  );

  return (
    <Card>
      <CardHeader>
        <CardTitle>Food Trucks</CardTitle>
        <CardDescription>
          Explore and find your favorite food trucks in San Francisco.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="mb-4">
          <FoodTypeSelect selectedFoodType={foodType || null} />
        </div>
        {error ? (
          <div>{error}</div>
        ) : (
          <FoodTruckTable foodTrucks={filteredFoodTrucks} />
        )}
      </CardContent>
      <CardFooter>
        <div className="text-xs text-muted-foreground">
          Showing <strong>{filteredFoodTrucks.length}</strong> of{" "}
          <strong>{allFoodTrucks.length}</strong> food trucks
        </div>
      </CardFooter>
    </Card>
  );
}
