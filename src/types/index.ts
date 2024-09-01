export interface FoodTruck {
  locationid: number;
  Applicant: string;
  FacilityType: "Truck" | "Push Cart";
  LocationDescription: string;
  Address: string;
  permit: string;
  Status: "APPROVED" | "EXPIRED" | "REQUESTED";
  FoodItems: string;
  Latitude: number;
  Longitude: number;
  Schedule: string;
  dayshours?: string;
  ExpirationDate?: string;
  Location: string;
  FirePreventionDistricts?: string;
  PoliceDistricts?: string;
  SupervisorDistricts?: string;
  ZipCodes?: string;
  Neighborhoods?: string;
}
