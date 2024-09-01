import Papa from "papaparse";
import { FoodTruck } from "@/data/food-truck";

export async function getFoodTruckData(): Promise<FoodTruck[]> {
  const url = "https://data.sfgov.org/api/views/rqzj-sfat/rows.csv";

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const csvData = await response.text();

    return new Promise((resolve, reject) => {
      Papa.parse<Record<string, string>>(csvData, {
        header: true,
        complete: (results) => {
          const foodTrucks: FoodTruck[] = results.data
            .filter(
              (row: any) => row.locationid && row.Latitude && row.Longitude
            )
            .map((row: any) => ({
              locationid: parseInt(row.locationid),
              Applicant: row.Applicant,
              FacilityType: row.FacilityType as "Truck" | "Push Cart",
              LocationDescription: row.LocationDescription,
              Address: row.Address,
              permit: row.permit,
              Status: row.Status as "APPROVED" | "EXPIRED" | "REQUESTED",
              FoodItems: row.FoodItems,
              Latitude: parseFloat(row.Latitude),
              Longitude: parseFloat(row.Longitude),
              Schedule: row.Schedule,
              dayshours: row.dayshours,
              ExpirationDate: row.ExpirationDate,
              Location: row.Location,
              FirePreventionDistricts: row.FirePreventionDistricts,
              PoliceDistricts: row.PoliceDistricts,
              SupervisorDistricts: row.SupervisorDistricts,
              ZipCodes: row.ZipCodes,
              Neighborhoods: row.Neighborhoods,
            }));
          resolve(foodTrucks);
        },
        error: (error: Error, file?: Papa.LocalFile | string) => {
          reject(error);
        },
      });
    });
  } catch (error) {
    console.error("Error fetching or parsing CSV:", error);
    throw error;
  }
}
