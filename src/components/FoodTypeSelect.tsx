"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Check, ChevronsUpDown } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { foodTypes } from "@/data/food-types";

interface FoodTypeSelectProps {
  selectedFoodType: string | null;
}

export function FoodTypeSelect({ selectedFoodType }: FoodTypeSelectProps) {
  const [open, setOpen] = useState(false);
  const router = useRouter();

  const handleFoodTypeChange = (value: string) => {
    const newValue = selectedFoodType === value ? null : value;
    setOpen(false);
    if (newValue) {
      router.push(`/food-trucks?foodType=${encodeURIComponent(newValue)}`);
    } else {
      router.push("/food-trucks");
    }
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-[200px] justify-between"
        >
          {selectedFoodType || "Select food type..."}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandInput placeholder="Search food type..." />
          <CommandList>
            <CommandEmpty>No food type found.</CommandEmpty>
            <CommandGroup>
              {foodTypes.map((type) => (
                <CommandItem
                  key={type}
                  value={type}
                  onSelect={() => handleFoodTypeChange(type)}
                >
                  <Check
                    className={cn(
                      "mr-2 h-4 w-4",
                      selectedFoodType === type ? "opacity-100" : "opacity-0"
                    )}
                  />
                  {type}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
