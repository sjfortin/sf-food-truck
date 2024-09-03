import { InfoWindow as GoogleMapsInfoWindow } from "@vis.gl/react-google-maps";
import { FoodTruck } from "@/data/food-truck";

interface InfoWindowProps {
  truck: FoodTruck;
  position: google.maps.LatLngLiteral;
  onClose: () => void;
}

export function InfoWindow({ truck, position, onClose }: InfoWindowProps) {
  return (
    <GoogleMapsInfoWindow position={position} onClose={onClose}>
      <div>
        <h3 className="text-lg font-bold">{truck.applicant}</h3>
        <p className="text-sm">Cuisine: {truck.fooditems}</p>
        <p className="text-sm">Address: {truck.address}</p>
      </div>
    </GoogleMapsInfoWindow>
  );
}
