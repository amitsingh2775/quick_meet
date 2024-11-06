import * as React from "react";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuTrigger,
  NavigationMenuLink,
  NavigationMenuLogo,
} from "@/components/ui/navigation-menu"; // Ensure all necessary imports are here
import { Button } from "@/components/ui/button";
import { useState } from "react";

const MyNavbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <NavigationMenu className="bg-white shadow-md">
      <div className="flex justify-between items-center px-4 py-2">
        <NavigationMenuLogo />
        <button onClick={() => setIsOpen(!isOpen)} className="md:hidden">
          {/* Hamburger Icon */}
          <span className="text-black">☰</span>
        </button>
      </div>

      <NavigationMenuItem>
        <NavigationMenuTrigger>
          Menu
        </NavigationMenuTrigger>
        <NavigationMenuContent>
          <NavigationMenuLink href="/about" className="text-black hover:text-blue-500">About</NavigationMenuLink>
          <NavigationMenuLink href="/services" className="text-black hover:text-blue-500">Services</NavigationMenuLink>
          <NavigationMenuLink href="/contact" className="text-black hover:text-blue-500">Contact</NavigationMenuLink>
        </NavigationMenuContent>
      </NavigationMenuItem>

      <div className={`flex-col md:flex md:flex-row md:items-center ${isOpen ? 'flex' : 'hidden'} transition-all`}>
        <Button className="bg-blue-500 text-white hover:bg-blue-600">Sign Up</Button>
        <Button variant="outline" className="text-blue-500 hover:bg-blue-100">Login</Button>
      </div>
    </NavigationMenu>
  );
};

export default MyNavbar;
