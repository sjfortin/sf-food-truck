"use client";

import {
  AdvancedMarker,
  APIProvider,
  Map,
  InfoWindow,
  useAdvancedMarkerRef,
} from "@vis.gl/react-google-maps";
import { useFoodTrucks } from "@/context/FoodTruckContext";
import { useEffect, useState } from "react";
import { FoodTruck } from "@/data/food-truck";

const sanFranciscoCenter = {
  lat: 37.7749295,
  lng: -122.419416,
};

const defaultZoom = 12;

interface MarkerWithInfoWindowProps {
  truck: FoodTruck;
  isSelected: boolean;
  onClick: () => void;
  onClose: () => void;
}

const MarkerWithInfoWindow = ({
  truck,
  isSelected,
  onClick,
  onClose,
}: MarkerWithInfoWindowProps) => {
  const [markerRef, marker] = useAdvancedMarkerRef();

  return (
    <>
      <AdvancedMarker
        position={{ lat: truck.latitude, lng: truck.longitude }}
        onClick={onClick}
        ref={markerRef}
      />
      {isSelected && (
        <InfoWindow anchor={marker} onClose={onClose}>
          <div>
            <h3 className="text-lg font-bold">{truck.applicant}</h3>
            <p className="text-sm">Cuisine: {truck.fooditems}</p>
            <p className="text-sm">Address: {truck.address}</p>
          </div>
        </InfoWindow>
      )}
    </>
  );
};

export function FoodTruckMap() {
  const { foodTrucks, selectedFoodTruck, setSelectedFoodTruck } =
    useFoodTrucks();
  const [mapCenter, setMapCenter] = useState(sanFranciscoCenter);
  const [mapZoom, setMapZoom] = useState(defaultZoom);

  useEffect(() => {
    if (selectedFoodTruck) {
      setMapCenter({
        lat: selectedFoodTruck.latitude,
        lng: selectedFoodTruck.longitude,
      });
      setMapZoom(14);
    } else {
      setMapCenter(sanFranciscoCenter);
      setMapZoom(defaultZoom);
    }
  }, [selectedFoodTruck]);

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
          defaultCenter={mapCenter}
          defaultZoom={mapZoom}
          gestureHandling={"greedy"}
          mapId="food-truck-map"
        >
          {foodTrucks.map((truck) => (
            <MarkerWithInfoWindow
              key={truck.locationid}
              truck={truck}
              isSelected={selectedFoodTruck?.locationid === truck.locationid}
              onClick={() => setSelectedFoodTruck(truck)}
              onClose={() => setSelectedFoodTruck(null)}
            />
          ))}
        </Map>
      </APIProvider>
    </div>
  );
}
