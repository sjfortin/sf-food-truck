import { FoodTrucks } from "@/components/FoodTrucks";
import { FoodTypeSelect } from "@/components/FoodTypeSelect";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
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
        <div className="flex flex-col md:flex-row justify-between md:items-end gap-2">
          <div className="flex flex-col gap-2">
            <h1 className="text-2xl font-semibold leading-none tracking-tight">
              San Francisco Food Trucks
            </h1>
            <p className="text-sm text-muted-foreground">
              Explore and find your favorite food trucks in San Francisco.
            </p>
          </div>
          <FoodTypeSelect selectedFoodType={foodType || null} />
        </div>
      </CardHeader>
      <CardContent>
        {foodTrucks.length === 0 ? (
          <div>No food trucks found.</div>
        ) : (
          <FoodTrucks foodTrucks={foodTrucks} />
        )}
      </CardContent>
    </Card>
  );
}
