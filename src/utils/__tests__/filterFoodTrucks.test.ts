import { FilterFoodTrucks } from "../filterFoodTrucks";
import { FoodTruck } from "@/data/food-truck";

describe("FilterFoodTrucks", () => {
  const mockFoodTrucks: FoodTruck[] = [
    {
      locationid: 1,
      Applicant: "Taco Truck",
      FacilityType: "Truck",
      LocationDescription: "MISSION ST: 03RD ST to 04TH ST (400 - 499)",
      Address: "400 MISSION ST",
      permit: "21MFF-00015",
      Status: "APPROVED",
      FoodItems: "Tacos: Burritos: Quesadillas",
      Latitude: 37.7881706877259,
      Longitude: -122.39715762346,
      Schedule:
        "http://bsm.sfdpw.org/PermitsTracker/reports/report.aspx?title=schedule&report=rptSchedule&params=permit=21MFF-00015&ExportPDF=1&Filename=21MFF-00015_schedule.pdf",
      dayshours: "Mo-Fr:10AM-3PM",
      ExpirationDate: "2022-11-15T00:00:00.000",
      Location: "(37.7881706877259, -122.39715762346)",
      FirePreventionDistricts: "1",
      PoliceDistricts: "1",
      SupervisorDistricts: "6",
      ZipCodes: "94105",
      Neighborhoods: "6",
    },
    {
      locationid: 2,
      Applicant: "Pizza Van",
      FacilityType: "Truck",
      LocationDescription: "MARKET ST: DRUMM ST intersection",
      Address: "5 THE EMBARCADERO",
      permit: "21MFF-00021",
      Status: "APPROVED",
      FoodItems: "Pizza: Calzones: Salads",
      Latitude: 37.794331003246,
      Longitude: -122.39581105302,
      Schedule:
        "http://bsm.sfdpw.org/PermitsTracker/reports/report.aspx?title=schedule&report=rptSchedule&params=permit=21MFF-00021&ExportPDF=1&Filename=21MFF-00021_schedule.pdf",
      dayshours: "Mo-Su:8AM-6PM",
      ExpirationDate: "2022-11-15T00:00:00.000",
      Location: "(37.794331003246, -122.39581105302)",
      FirePreventionDistricts: "1",
      PoliceDistricts: "1",
      SupervisorDistricts: "3",
      ZipCodes: "94111",
      Neighborhoods: "6",
    },
  ];

  let filterFoodTrucks: FilterFoodTrucks;

  beforeEach(() => {
    filterFoodTrucks = new FilterFoodTrucks(mockFoodTrucks);
  });

  it("should return all food trucks when no food type is specified", () => {
    const result = filterFoodTrucks.filterByFoodType(null);
    expect(result.filteredFoodTrucks).toEqual(mockFoodTrucks);
    expect(result.error).toBeNull();
  });

  it("should filter food trucks by food type correctly", () => {
    const result = filterFoodTrucks.filterByFoodType(["Tacos"]);
    expect(result.filteredFoodTrucks).toHaveLength(1);
    expect(result.filteredFoodTrucks[0].Applicant).toBe("Taco Truck");
    expect(result.error).toBeNull();
  });

  it("should be case-insensitive when filtering", () => {
    const result = filterFoodTrucks.filterByFoodType(["pizza"]);
    expect(result.filteredFoodTrucks).toHaveLength(1);
    expect(result.filteredFoodTrucks[0].Applicant).toBe("Pizza Van");
    expect(result.error).toBeNull();
  });

  it("should return an empty array and error message for non-existent food type", () => {
    const result = filterFoodTrucks.filterByFoodType(["Sushi"]);
    expect(result.filteredFoodTrucks).toHaveLength(0);
    expect(result.error).toBe(
      "No food trucks found for the specified food types: Sushi"
    );
  });

  it("should handle partial matches in food items", () => {
    const result = filterFoodTrucks.filterByFoodType(["Burritos"]);
    expect(result.filteredFoodTrucks).toHaveLength(1);
    expect(result.filteredFoodTrucks[0].Applicant).toBe("Taco Truck");
    expect(result.error).toBeNull();
  });

  it("should filter food trucks by multiple food types", () => {
    const result = filterFoodTrucks.filterByFoodType(["Tacos", "Pizza"]);
    expect(result.filteredFoodTrucks).toHaveLength(2);
    expect(result.filteredFoodTrucks[0].Applicant).toBe("Taco Truck");
    expect(result.filteredFoodTrucks[1].Applicant).toBe("Pizza Van");
    expect(result.error).toBeNull();
  });

  it("should return all trucks if an empty array is provided", () => {
    const result = filterFoodTrucks.filterByFoodType([]);
    expect(result.filteredFoodTrucks).toEqual(mockFoodTrucks);
    expect(result.error).toBeNull();
  });
});
