import { CircleUser, Martini, Menu, Search } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
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
import { useAuth0 } from "@auth0/auth0-react";
import ThemeToggle from "./ThemeToggle";
import { routes } from "@/routes/routes";

interface NavItemProps {
  active?: boolean;
  label: string;
  to: string;
}

function NavItem({ label, to, active = false }: NavItemProps) {
  return (
    <Link
      to={to}
      className={`transition-colors hover:text-foreground ${
        active ? "text-primary" : "text-muted-foreground"
      }`}
    >
      {label}
    </Link>
  );
}

function NavItems() {
  const location = useLocation();
  return (
    <>
      <NavItem
        label={routes.dashboard.title}
        to={routes.dashboard.url()}
        active={location.pathname === routes.dashboard.path}
      />
      <NavItem
        label={routes.cocktails.title}
        to={routes.cocktails.url()}
        active={location.pathname === routes.cocktails.path}
      />
      <NavItem
        label={routes.bar.title}
        to={routes.bar.url()}
        active={location.pathname === routes.bar.path}
      />
      <NavItem
        label={routes.shoppingList.title}
        to={routes.shoppingList.url()}
        active={location.pathname === routes.shoppingList.path}
      />
    </>
  );
}

export default function Header() {
  return (
    <header className="sticky top-0 flex h-16 items-center gap-4 border-b px-4 md:px-6 shadow-md bg-white dark:bg-slate-900 shadow-slate-200 dark:shadow-none">
      <nav className="hidden flex-col gap-6 text-lg font-medium md:flex md:flex-row md:items-center md:gap-5 md:text-sm lg:gap-6 dark:text-white text-nowrap">
        <Link
          to="#"
          className="flex items-center gap-2 text-lg font-semibold md:text-base"
        >
          <Martini className="h-6 w-6" />
          <span className="sr-only">Barkeeper</span>
        </Link>
        <NavItems />
      </nav>
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="outline" size="icon" className="shrink-0 md:hidden">
            <Menu className="h-5 w-5" />
            <span className="sr-only">Toggle navigation menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="left">
          <nav className="grid gap-6 text-lg font-medium">
            <Link
              to="#"
              className="flex items-center gap-2 text-lg font-semibold"
            >
              <Martini className="h-6 w-6" />
              <span className="sr-only">Barkeeper</span>
            </Link>
            <NavItems />
          </nav>
        </SheetContent>
      </Sheet>
      <div className="flex w-full items-center gap-4 md:ml-auto md:gap-2 lg:gap-4">
        <form className="ml-auto flex-1 sm:flex-initial">
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search cocktails..."
              className="pl-8 sm:w-[300px] md:w-[200px] lg:w-[300px]"
            />
          </div>
        </form>
        <ThemeToggle />
        <UserMenu />
      </div>
    </header>
  );
}

function UserMenu() {
  const { logout, user } = useAuth0();
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="secondary" size="icon" className="rounded-full">
          <CircleUser className="h-5 w-5" />
          <span className="sr-only">Toggle user menu</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>Cheers, {user?.name}!</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <Link to={routes.settings.url()}>Settings</Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          onClick={() =>
            logout({ logoutParams: { returnTo: window.location.origin } })
          }
        >
          Logout
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
