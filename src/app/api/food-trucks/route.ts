import { NextRequest } from "next/server";
import { getFoodTruckData } from "@/utils/getFoodTruckData";
import { FilterFoodTrucks } from "@/utils/filterFoodTrucks";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const foodTypes = searchParams.getAll("foodType");

    const allFoodTrucks = await getFoodTruckData();

    const filterFoodTrucks = new FilterFoodTrucks(allFoodTrucks);
    
    const { filteredFoodTrucks, error } =
      filterFoodTrucks.filterByFoodType(foodTypes);

    if (error) {
      return new Response(JSON.stringify({ error }), {
        status: 404,
        headers: { "Content-Type": "application/json" },
      });
    }

    return new Response(JSON.stringify(filteredFoodTrucks), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error fetching or filtering food trucks:", error);
    return new Response(
      JSON.stringify({ error: "Error processing food truck data" }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}
