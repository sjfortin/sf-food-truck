/**
 * @jest-environment node
 */

import { GET } from "./route";
import { getFoodTruckData } from "@/utils/getFoodTruckData";

jest.mock("@/utils/getFoodTruckData");

describe("GET /api/food-trucks", () => {
  it("should return 200 with food truck data", async () => {
    const mockFoodTrucks = [
      {
        locationid: 1,
        Applicant: "Test Truck",
        Latitude: 37.7749,
        Longitude: -122.4194,
      },
    ];
    (getFoodTruckData as jest.Mock).mockResolvedValue(mockFoodTrucks);

    const response = await GET();

    expect(response.status).toBe(200);
    const responseData = await response.json();
    expect(responseData).toEqual(mockFoodTrucks);
  });

  it("should return 500 when an error occurs", async () => {
    (getFoodTruckData as jest.Mock).mockRejectedValue(new Error("Test error"));

    const response = await GET();

    expect(response.status).toBe(500);
    const responseData = await response.json();
    expect(responseData).toEqual({ error: "Error parsing CSV file" });
  });
});
