"use client";

import { FoodTruck } from "@/data/food-truck";
import { AdvancedMarker, APIProvider, Map } from "@vis.gl/react-google-maps";

const sanFranciscoCenter = {
  lat: 37.7749295,
  lng: -122.419416,
};

export function FoodTruckMap({ foodTrucks }: { foodTrucks: FoodTruck[] }) {
  if (foodTrucks.length === 0) {
    return null;
  }

  return (
    <div>
      <APIProvider
        apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY as string}
      >
        <Map
          className="w-full h-96 lg:h-[calc(100vh-200px)]"
          defaultCenter={sanFranciscoCenter}
          defaultZoom={12}
          gestureHandling={"greedy"}
          disableDefaultUI={true}
          mapId="food-truck-map"
        >
          {foodTrucks.map((truck) => (
            <AdvancedMarker
              key={truck.locationid}
              position={{ lat: truck.latitude, lng: truck.longitude }}
            />
          ))}
        </Map>
      </APIProvider>
    </div>
  );
}
