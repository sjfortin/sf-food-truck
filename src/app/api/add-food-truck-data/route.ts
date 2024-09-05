import { sql } from "@vercel/postgres";
import { NextRequest, NextResponse } from "next/server";
import Papa from "papaparse";
import { FoodTruck } from "@/data/food-truck";

export async function GET(request: NextRequest) {
  const authHeader = request.headers.get("authorization");
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return new Response("Unauthorized", {
      status: 401,
    });
  }

  const url = "https://data.sfgov.org/api/views/rqzj-sfat/rows.csv";

  try {
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

    let totalUpdated = 0;

    // Upsert all food truck records
    for (const truck of Object.values(foodTrucks)) {
      const result = await sql`
        WITH updated_rows AS (
          INSERT INTO FoodTrucks (
            locationid, applicant, facilitytype, locationdescription, address, permit, status, fooditems, latitude, longitude, schedule, dayshours, expirationdate, location, firepreventiondistricts, policedistricts, supervisordistricts, zipcodes, neighborhoods
          ) VALUES (
            ${truck.locationid}, ${truck.applicant}, ${truck.facilitytype}, ${truck.locationdescription}, ${truck.address}, ${truck.permit}, ${truck.status}, ${truck.fooditems}, ${truck.latitude}, ${truck.longitude}, ${truck.schedule}, ${truck.dayshours}, ${truck.expirationdate}, ${truck.location}, ${truck.firepreventiondistricts}, ${truck.policedistricts}, ${truck.supervisordistricts}, ${truck.zipcodes}, ${truck.neighborhoods}
          )
          ON CONFLICT (locationid)
          DO UPDATE SET
            applicant = EXCLUDED.applicant,
            facilitytype = EXCLUDED.facilitytype,
            locationdescription = EXCLUDED.locationdescription,
            address = EXCLUDED.address,
            permit = EXCLUDED.permit,
            status = EXCLUDED.status,
            fooditems = EXCLUDED.fooditems,
            latitude = EXCLUDED.latitude,
            longitude = EXCLUDED.longitude,
            schedule = EXCLUDED.schedule,
            dayshours = EXCLUDED.dayshours,
            expirationdate = EXCLUDED.expirationdate,
            location = EXCLUDED.location,
            firepreventiondistricts = EXCLUDED.firepreventiondistricts,
            policedistricts = EXCLUDED.policedistricts,
            supervisordistricts = EXCLUDED.supervisordistricts,
            zipcodes = EXCLUDED.zipcodes,
            neighborhoods = EXCLUDED.neighborhoods
          WHERE 
            FoodTrucks.applicant != EXCLUDED.applicant OR
            FoodTrucks.facilitytype != EXCLUDED.facilitytype OR
            FoodTrucks.locationdescription != EXCLUDED.locationdescription OR
            FoodTrucks.address != EXCLUDED.address OR
            FoodTrucks.permit != EXCLUDED.permit OR
            FoodTrucks.status != EXCLUDED.status OR
            FoodTrucks.fooditems != EXCLUDED.fooditems OR
            FoodTrucks.latitude != EXCLUDED.latitude OR
            FoodTrucks.longitude != EXCLUDED.longitude OR
            FoodTrucks.schedule != EXCLUDED.schedule OR
            FoodTrucks.dayshours != EXCLUDED.dayshours OR
            FoodTrucks.expirationdate != EXCLUDED.expirationdate OR
            FoodTrucks.location != EXCLUDED.location OR
            FoodTrucks.firepreventiondistricts != EXCLUDED.firepreventiondistricts OR
            FoodTrucks.policedistricts != EXCLUDED.policedistricts OR
            FoodTrucks.supervisordistricts != EXCLUDED.supervisordistricts OR
            FoodTrucks.zipcodes != EXCLUDED.zipcodes OR
            FoodTrucks.neighborhoods != EXCLUDED.neighborhoods
          RETURNING *
        )
        SELECT COUNT(*) FROM updated_rows
      `;

      totalUpdated += Number(result.rows[0].count);
    }

    return NextResponse.json({
      message: `Food truck data has been refreshed in PostgreSQL. ${totalUpdated} records were inserted or updated.`,
    });
  } catch (error) {
    console.error("Error refreshing PostgreSQL data:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
