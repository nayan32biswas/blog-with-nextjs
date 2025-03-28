"use client";

import { Menu, Search, User } from "lucide-react";
import Link from "next/link";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";

import { SearchDialog } from "@/components/common/SearchDialog";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { useAuth } from "@/contexts/AuthContext";

export function Navbar() {
  const { isAuthenticated, logout } = useAuth();

  const renderUserMenu = () => {
    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild className="hidden md:flex">
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 cursor-pointer rounded-full bg-gray-200"
          >
            <User className="h-4 w-4" />
            <span className="sr-only">User menu</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>My Account</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem>Profile</DropdownMenuItem>
          <DropdownMenuItem>Dashboard</DropdownMenuItem>
          <DropdownMenuItem>Settings</DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={() => logout()} className="cursor-pointer">
            Sign out
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    );
  };
  return (
    <>
      <header className="sticky top-0 z-50 border-b border-gray-200 bg-white">
        <div className="mx-auto flex h-16 items-center px-2 lg:px-4">
          {/* Left side - Pushed to start */}
          <div className="ml-4 flex flex-none justify-start">
            <Link href="/" className="text-2xl font-bold text-gray-900">
              Blog
            </Link>
          </div>

          {/* Search Box - Centered and takes remaining space */}
          <div className="flex flex-1 justify-center">
            <SearchDialog>
              <div className="relative w-40 sm:w-56 md:w-64">
                <Search className="absolute top-2.5 left-2.5 h-4 w-4 text-gray-500" />
                <Input
                  type="search"
                  placeholder="Search posts..."
                  className="h-9 cursor-pointer border-gray-300 bg-white pl-8 focus:border-gray-500 focus:ring-gray-500"
                  readOnly
                />
              </div>
            </SearchDialog>
          </div>

          {/* Right side - Pushed to end */}
          <div className="flex flex-none items-center justify-end space-x-4">
            {/* Contact Button */}
            <Link href="/contact" className="hidden md:inline-flex">
              <Button variant="ghost" className="text-gray-700 hover:text-gray-900">
                Contact
              </Button>
            </Link>

            {/* User Dropdown */}
            {isAuthenticated ? (
              renderUserMenu()
            ) : (
              <Button variant={"outline"} className="cursor-pointer">
                <Link href={"/auth/signin"}>Login</Link>
              </Button>
            )}

            {/* Mobile Menu Button */}
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="md:hidden">
                  <Menu className="h-6 w-6" />
                  <span className="sr-only">Toggle menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[300px] sm:w-[400px]">
                <VisuallyHidden>
                  <SheetHeader>
                    <SheetTitle>User Name</SheetTitle>
                    <SheetDescription></SheetDescription>
                  </SheetHeader>
                </VisuallyHidden>
                <nav className="mt-6 flex flex-col space-y-4">
                  <Link
                    href="/contact"
                    className="mb-0 py-2 text-center text-lg text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                  >
                    Contact
                  </Link>
                  <Link
                    href="/contact"
                    className="mb-0 py-2 text-center text-lg text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                  >
                    Sign In
                  </Link>
                </nav>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </header>
    </>
  );
}
