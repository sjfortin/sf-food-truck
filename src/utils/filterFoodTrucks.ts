import { FoodTruck } from "@/data/food-truck";
import { foodTypes } from "@/data/food-types";

export class FilterFoodTrucks {
  private foodTrucks: FoodTruck[];

  constructor(foodTrucks: FoodTruck[]) {
    this.foodTrucks = foodTrucks;
  }

  filterByFoodType(foodType: string | null) {
    if (foodType) {
      const normalizedFoodType = foodType.toLowerCase();
      const normalizedFoodTypes = foodTypes.map((type) => type.toLowerCase());

      if (normalizedFoodTypes.includes(normalizedFoodType)) {
        return {
          filteredFoodTrucks: this.foodTrucks.filter((truck) =>
            truck.FoodItems.toLowerCase().includes(normalizedFoodType)
          ),
          error: null,
        };
      } else {
        return {
          filteredFoodTrucks: [],
          error: `No food trucks found for the specified food type: ${foodType}`,
        };
      }
    } else {
      return {
        filteredFoodTrucks: this.foodTrucks,
        error: null,
      };
    }
  }
}
