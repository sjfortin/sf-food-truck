"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Home, Utensils, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

export function MobileMenu() {
  const [open, setOpen] = useState(false);
  const router = useRouter();

  const handleNavigation = (href: string) => {
    setOpen(false);
    router.push(href);
  };

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button size="icon" variant="outline" className="sm:hidden">
          <Menu className="h-5 w-5" />
          <span className="sr-only">Toggle Menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="sm:max-w-xs">
        <nav className="grid gap-6 text-lg font-medium">
          <span>SF Food Truck Finder</span>
          <Button
            variant="ghost"
            className="flex items-center justify-start gap-4 px-2.5 text-foreground"
            onClick={() => handleNavigation("/")}
          >
            <Home className="h-5 w-5" />
            Home
          </Button>
        </nav>
      </SheetContent>
    </Sheet>
  );
}
