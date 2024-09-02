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
import { FoodTruck } from "@/data/food-truck";
import { sql } from "@vercel/postgres";

export const dynamic = "force-dynamic";

export default async function Page({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const foodType = searchParams.foodType as string | undefined;

  let query = "SELECT * FROM FoodTrucks";
  let params: any[] = [];

  if (foodType) {
    query += " WHERE FoodItems ILIKE $1";
    params.push(`%${foodType}%`);
  }

  query += " ORDER BY Applicant ASC";

  const { rows }: { rows: FoodTruck[] } = await sql.query(query, params);

  const foodTrucks: FoodTruck[] = rows;

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
        {foodTrucks.length === 0 ? (
          <div>No food trucks found.</div>
        ) : (
          <FoodTruckTable foodTrucks={foodTrucks} />
        )}
      </CardContent>
    </Card>
  );
}
