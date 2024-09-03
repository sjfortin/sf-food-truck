import { FoodTruckTable } from "@/components/FoodTruckTable";
import { FoodTruckMap } from "@/components/FoodTruckMap";
import { FoodTruck } from "@/data/food-truck";
import { ScrollArea } from "./ui/scroll-area";

export function FoodTrucks({ foodTrucks }: { foodTrucks: FoodTruck[] }) {
  return (
    <div className="flex flex-col lg:flex-row gap-4">
      <div className="w-full lg:w-1/3 order-2 lg:order-1">
        <ScrollArea className="h-[600px] lg:h-[calc(100vh-200px)] rounded-md border p-4">
          <FoodTruckTable foodTrucks={foodTrucks} />
        </ScrollArea>
      </div>
      <div className="w-full lg:w-2/3 order-1 lg:order-2">
        <FoodTruckMap foodTrucks={foodTrucks} />
      </div>
    </div>
  );
}
