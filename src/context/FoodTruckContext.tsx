"use client";

import { createContext, useState, useContext } from "react";
import { FoodTruck } from "@/data/food-truck";

interface FoodTruckContextType {
  foodTrucks: FoodTruck[];
  selectedFoodTruck: FoodTruck | null;
  setSelectedFoodTruck: (truck: FoodTruck | null) => void;
}

const FoodTruckContext = createContext<FoodTruckContextType | undefined>(
  undefined
);

export function FoodTruckProvider({
  children,
  foodTrucks,
}: {
  children: React.ReactNode;
  foodTrucks: FoodTruck[];
}) {
  const [selectedFoodTruck, setSelectedFoodTruck] = useState<FoodTruck | null>(
    null
  );

  return (
    <FoodTruckContext.Provider
      value={{ foodTrucks, selectedFoodTruck, setSelectedFoodTruck }}
    >
      {children}
    </FoodTruckContext.Provider>
  );
}

export function useFoodTrucks() {
  const context = useContext(FoodTruckContext);
  if (context === undefined) {
    throw new Error("useFoodTrucks must be used within a FoodTruckProvider");
  }
  return context;
}
