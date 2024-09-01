import { FoodTruck } from "@/data/food-truck";

interface FilterResult {
  filteredFoodTrucks: FoodTruck[];
  error: string | null;
}

export class FilterFoodTrucks {
  private foodTrucks: FoodTruck[];

  constructor(foodTrucks: FoodTruck[]) {
    this.foodTrucks = foodTrucks;
  }

  filterByFoodType(foodTypes: string[] | null): FilterResult {
    if (!foodTypes || foodTypes.length === 0) {
      return { filteredFoodTrucks: this.foodTrucks, error: null };
    }

    const filteredTrucks = this.foodTrucks.filter((truck) =>
      foodTypes.some((type) =>
        truck.FoodItems.toLowerCase().includes(type.toLowerCase())
      )
    );

    if (filteredTrucks.length === 0) {
      return {
        filteredFoodTrucks: [],
        error: `No food trucks found for the specified food types: ${foodTypes.join(
          ", "
        )}`,
      };
    }

    return { filteredFoodTrucks: filteredTrucks, error: null };
  }
}
