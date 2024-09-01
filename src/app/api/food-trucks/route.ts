import { NextApiRequest, NextApiResponse } from "next";
import { getFoodTruckData } from "@/utils/getFoodTruckData";
// import { FoodTruck } from "@/types";

export async function GET() {
  try {
    const foodTrucks = await getFoodTruckData();
    console.log({ foodTrucks });
    return new Response(JSON.stringify(foodTrucks), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: "Error parsing CSV file" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
