export interface FoodTruck {
  locationid: number;
  applicant: string;
  facilitytype: "Truck" | "Push Cart";
  locationdescription: string;
  address: string;
  permit: string;
  status: "APPROVED" | "EXPIRED" | "REQUESTED";
  fooditems: string;
  latitude: number;
  longitude: number;
  schedule: string;
  dayshours?: string;
  expirationdate?: string;
  location: string;
  firepreventiondistricts?: string;
  policedistricts?: string;
  supervisordistricts?: string;
  zipcodes?: string;
  neighborhoods?: string;
}
