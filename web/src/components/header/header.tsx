import { CircleUser, Martini, Menu, X } from "lucide-react";

import { useAuth0 } from "@auth0/auth0-react";
import ThemeToggle from "./ThemeToggle";
import { Link } from "@tanstack/react-router";
import { useState } from "react";
import { useUser } from "@/data/User";
import { UserHelper } from "@/lib/user";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
} from "@/components/ui/navigation-menu";

const navbarLinks = [
  {
    to: "/",
    label: "Dashboard",
    activeOptions: { exact: true },
  },
  {
    to: "/cocktails",
    label: "Cocktails",
  },
  {
    to: "/bar",
    label: "Bar",
  },
  {
    to: "/shopping-list",
    label: "Shopping List",
  },
];

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  return (
    <>
      <header className="border-b border-border bg-background/80 backdrop-blur-md">
        <div className="flex items-center justify-between px-6 py-4">
          {/* Brand */}
          <Link
            to="/"
            className="font-display text-cocktail-subtitle tracking-cocktail flex items-center gap-3 font-bold">
            <Martini className="text-primary h-7 w-7" />
            <span className="from-primary to-secondary bg-gradient-to-r bg-clip-text text-transparent">
              Barkeeper
            </span>
          </Link>

          {/* Desktop Navigation */}
          <NavigationMenu className="hidden sm:flex">
            <NavigationMenuList>
              {navbarLinks.map((props) => (
                <NavigationMenuItem key={props.label}>
                  <Link
                    to={props.to}
                    activeOptions={props.activeOptions}
                    className="inline-flex h-9 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-all outline-none hover:bg-muted focus:bg-muted focus-visible:ring-3 focus-visible:ring-ring/50 focus-visible:outline-1 hover:text-primary-600 text-recipe-instruction font-sans transition-colors data-[status='active']:text-primary data-[status='active']:font-semibold">
                    {props.label}
                  </Link>
                </NavigationMenuItem>
              ))}
            </NavigationMenuList>
          </NavigationMenu>

          {/* Right Actions */}
          <div className="flex items-center gap-2">
            <ThemeToggle />
            <UserMenu />

            {/* Mobile Menu Toggle */}
            <Button
              variant="ghost"
              size="icon"
              className="sm:hidden"
              onClick={() => setIsMenuOpen(!isMenuOpen)}>
              {isMenuOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
              <span className="sr-only">Toggle menu</span>
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <Dialog open={isMenuOpen} onOpenChange={setIsMenuOpen}>
          <DialogContent className="top-0 translate-y-0 border-none p-0 sm:hidden">
            <nav className="flex flex-col gap-2 pt-6">
              {navbarLinks.map((props) => (
                <Link
                  key={props.label}
                  to={props.to}
                  activeOptions={props.activeOptions}
                  onClick={() => setIsMenuOpen(false)}
                  className="px-4 py-2 hover:text-primary-600 text-recipe-instruction font-sans transition-colors data-[status='active']:text-primary data-[status='active']:font-semibold">
                  {props.label}
                </Link>
              ))}
            </nav>
          </DialogContent>
        </Dialog>
      </header>
    </>
  );
}

function UserMenu() {
  const { logout, user } = useAuth0();
  const barkeeperUser = useUser(user?.sub ?? "");
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Button variant="ghost" size="icon" className="rounded-full">
          <CircleUser className="h-5 w-5" />
          <span className="sr-only">Toggle user menu</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
        <DropdownMenuGroup>
          <DropdownMenuLabel className="font-display font-medium">
            Cheers, {barkeeperUser.data?.DisplayName}!
          </DropdownMenuLabel>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem render={<Link to="/settings" />}>
          Settings
        </DropdownMenuItem>
        {UserHelper.isAdmin(user) ? (
          <>
            <DropdownMenuItem render={<Link to="/admin" />}>
              Admin
            </DropdownMenuItem>
            <DropdownMenuItem render={<Link to="/theme-demo" />}>
              Theme Demo
            </DropdownMenuItem>
          </>
        ) : null}
        <DropdownMenuSeparator />
        <DropdownMenuItem
          onClick={() =>
            logout({ logoutParams: { returnTo: window.location.origin } })
          }>
          Logout
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
