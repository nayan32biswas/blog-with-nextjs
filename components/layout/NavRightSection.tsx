"use client";

import { Menu } from "lucide-react";
import Link from "next/link";
import React from "react";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Separator } from "@/components/ui/separator";
import { useAuth } from "@/contexts/AuthContext";
import { cn, getNameInitials } from "@/lib/utils";

export default function NavRightSection() {
  const { isAuthenticated, logout, authUser } = useAuth();

  const fullName = authUser?.full_name;
  const nameInitials = getNameInitials(authUser?.full_name);

  const renderUserInfo = (extraClass?: string) => {
    if (!isAuthenticated || !authUser) {
      return null;
    }

    return (
      <div className={cn("flex items-center space-x-4", extraClass)}>
        <Avatar>
          <AvatarImage src={authUser.avatar} />
          <AvatarFallback>{nameInitials}</AvatarFallback>
        </Avatar>
        <div>
          <h4 className="text-sm font-semibold">{fullName}</h4>
          <p className="text-muted-foreground text-sm">{authUser.username}</p>
        </div>
      </div>
    );
  };

  const renderUserMenu = () => {
    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild className="hidden md:flex">
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 cursor-pointer rounded-full bg-gray-200"
          >
            <Avatar>
              <AvatarImage src={authUser?.avatar} />
              <AvatarFallback>{nameInitials}</AvatarFallback>
            </Avatar>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-56">
          {renderUserInfo("ml-2")}

          <DropdownMenuSeparator />

          <Link href={`/${authUser?.username}`}>
            <DropdownMenuItem className="cursor-pointer">Profile</DropdownMenuItem>
          </Link>

          <Link href={"/settings"}>
            <DropdownMenuItem className="cursor-pointer">Settings</DropdownMenuItem>
          </Link>

          <DropdownMenuSeparator />

          <DropdownMenuItem
            onClick={() => logout()}
            className="cursor-pointer text-red-500 hover:bg-red-50 hover:text-red-600"
          >
            Sign out
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    );
  };

  const renderLargeDeviceMenu = () => {
    return (
      <>
        <Link href="/posts/create/" className="hidden md:inline-flex">
          <Button variant="ghost" className="cursor-pointer text-gray-700 hover:text-gray-900">
            Write
          </Button>
        </Link>

        <Link href="/contact/" className="hidden md:inline-flex">
          <Button variant="ghost" className="cursor-pointer text-gray-700 hover:text-gray-900">
            Contact
          </Button>
        </Link>

        {isAuthenticated ? (
          renderUserMenu()
        ) : (
          <Button
            variant={"outline"}
            className="hidden cursor-pointer bg-black text-gray-50 md:inline-flex"
          >
            <Link href={"/auth/signin"}>Sign In</Link>
          </Button>
        )}
      </>
    );
  };

  const renderSmallDeviceMenu = () => {
    return (
      <Drawer>
        <DrawerTrigger asChild>
          <Button variant="ghost" size="icon" className="md:hidden">
            <Menu className="h-6 w-6" />
          </Button>
        </DrawerTrigger>
        <DrawerContent>
          <VisuallyHidden>
            <DrawerHeader>
              <DrawerTitle>None</DrawerTitle>
              <DrawerDescription>None</DrawerDescription>
            </DrawerHeader>
          </VisuallyHidden>
          <div className="mx-auto w-full max-w-sm">
            <div className="p-4">
              {isAuthenticated && (
                <>
                  {renderUserInfo("mb-4")}
                  <Separator className="mb-4" />
                </>
              )}
              <div className="flex flex-col space-y-2">
                {isAuthenticated ? (
                  <>
                    <DrawerClose asChild>
                      <Link href={`/${authUser?.username}`}>
                        <Button variant="ghost" className="w-full cursor-pointer justify-start">
                          Profile
                        </Button>
                      </Link>
                    </DrawerClose>

                    <DrawerClose asChild>
                      <Link href={"/settings/"}>
                        <Button variant="ghost" className="w-full cursor-pointer justify-start">
                          Settings
                        </Button>
                      </Link>
                    </DrawerClose>

                    <DrawerClose asChild>
                      <Link href={"/posts/create/"}>
                        <Button variant="ghost" className="w-full cursor-pointer justify-start">
                          Write
                        </Button>
                      </Link>
                    </DrawerClose>

                    <DrawerClose asChild>
                      <Link href={"/contact/"}>
                        <Button variant="ghost" className="w-full cursor-pointer justify-start">
                          Contact
                        </Button>
                      </Link>
                    </DrawerClose>

                    <Separator className="my-2" />

                    <DrawerClose asChild>
                      <Button
                        onClick={() => logout()}
                        variant="ghost"
                        className="w-full cursor-pointer justify-start text-red-500 hover:bg-red-50 hover:text-red-600"
                      >
                        Sign Out
                      </Button>
                    </DrawerClose>
                  </>
                ) : (
                  <>
                    <DrawerClose asChild>
                      <Link href={"/contact"}>
                        <Button variant="ghost" className="w-full cursor-pointer justify-start">
                          Contact
                        </Button>
                      </Link>
                    </DrawerClose>

                    <Separator className="my-2" />

                    <DrawerClose asChild>
                      <Link href={"/auth/signin"}>
                        <Button variant="default" className="w-full cursor-pointer">
                          Sign In
                        </Button>
                      </Link>
                    </DrawerClose>

                    <DrawerClose asChild>
                      <Link href={"/auth/signup"}>
                        <Button variant="outline" className="w-full cursor-pointer">
                          Sign Up
                        </Button>
                      </Link>
                    </DrawerClose>
                  </>
                )}
              </div>
            </div>
          </div>
        </DrawerContent>
      </Drawer>
    );
  };

  return (
    <>
      {renderLargeDeviceMenu()}
      {renderSmallDeviceMenu()}
    </>
  );
}
