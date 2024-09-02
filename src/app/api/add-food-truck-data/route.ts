import { sql } from "@vercel/postgres";
import { NextResponse } from "next/server";
import Papa from "papaparse";
import { FoodTruck } from "@/data/food-truck";

export async function GET() {
  const url = "https://data.sfgov.org/api/views/rqzj-sfat/rows.csv";

  try {
    await sql`DROP TABLE IF EXISTS foodtrucks`;

    await sql`
      CREATE TABLE foodtrucks (
        locationid INT PRIMARY KEY,
        applicant TEXT,
        facilitytype TEXT,
        locationdescription TEXT,
        address TEXT,
        permit TEXT,
        status TEXT,
        fooditems TEXT,
        latitude FLOAT,
        longitude FLOAT,
        schedule TEXT,
        dayshours TEXT,
        expirationdate TEXT,
        location TEXT,
        firepreventiondistricts TEXT,
        policedistricts TEXT,
        supervisordistricts TEXT,
        zipcodes TEXT,
        neighborhoods TEXT
      )
    `;

    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const csvData = await response.text();

    const foodTrucks: Record<string, FoodTruck> = await new Promise(
      (resolve, reject) => {
        Papa.parse<Record<string, string>>(csvData, {
          header: true,
          complete: (results) => {
            const trucks: Record<string, FoodTruck> = {};
            results.data
              .filter(
                (row: any) => row.locationid && row.Latitude && row.Longitude
              )
              .forEach((row: any) => {
                const locationid = parseInt(row.locationid);
                trucks[`foodTruck:${locationid}`] = {
                  locationid,
                  applicant: row.Applicant,
                  facilitytype: row.FacilityType as "Truck" | "Push Cart",
                  locationdescription: row.LocationDescription,
                  address: row.Address,
                  permit: row.permit,
                  status: row.Status as "APPROVED" | "EXPIRED" | "REQUESTED",
                  fooditems: row.FoodItems,
                  latitude: parseFloat(row.Latitude),
                  longitude: parseFloat(row.Longitude),
                  schedule: row.Schedule,
                  dayshours: row.dayshours,
                  expirationdate: row.ExpirationDate,
                  location: row.Location,
                  firepreventiondistricts: row.FirePreventionDistricts,
                  policedistricts: row.PoliceDistricts,
                  supervisordistricts: row.SupervisorDistricts,
                  zipcodes: row.ZipCodes,
                  neighborhoods: row.Neighborhoods,
                };
              });
            resolve(trucks);
          },
          error: (error: Error, file?: Papa.LocalFile | string) => {
            reject(error);
          },
        });
      }
    );

    // Insert all records
    for (const truck of Object.values(foodTrucks)) {
      await sql`
        INSERT INTO FoodTrucks (
          locationid, applicant, facilitytype, locationdescription, address, permit, status, fooditems, latitude, longitude, schedule, dayshours, expirationdate, location, firepreventiondistricts, policedistricts, supervisordistricts, zipcodes, neighborhoods
        ) VALUES (
          ${truck.locationid}, ${truck.applicant}, ${truck.facilitytype}, ${truck.locationdescription}, ${truck.address}, ${truck.permit}, ${truck.status}, ${truck.fooditems}, ${truck.latitude}, ${truck.longitude}, ${truck.schedule}, ${truck.dayshours}, ${truck.expirationdate}, ${truck.location}, ${truck.firepreventiondistricts}, ${truck.policedistricts}, ${truck.supervisordistricts}, ${truck.zipcodes}, ${truck.neighborhoods}
        )
      `;
    }

    return NextResponse.json({
      message: "Food truck data has been refreshed in PostgreSQL",
    });
  } catch (error) {
    console.error("Error refreshing PostgreSQL data:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
