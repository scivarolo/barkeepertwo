import { CircleUser, Martini, Menu, Search } from "lucide-react";
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
import {
  createLink,
  Link,
  LinkComponent,
  linkOptions,
} from "@tanstack/react-router";
import {
  NavigationMenu,
  NavigationMenuIndicator,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "../ui/navigation-menu";
import { NavigationMenuLinkProps } from "@radix-ui/react-navigation-menu";
import { forwardRef } from "react";
import { useUser } from "@/data/User";
import { UserHelper } from "@/lib/user";

const navbarLinks = linkOptions([
  {
    to: "/",
    label: "Dashboard",
    activeOptions: { exact: true },
    activeProps: { active: true },
  },
  {
    to: "/cocktails",
    label: "Cocktails",
    activeProps: { active: true },
  },
  {
    to: "/bar",
    label: "Bar",
    activeProps: { active: true },
  },
  {
    to: "/shopping-list",
    label: "Shopping List",
    activeProps: { active: true },
  },
]);

interface NavLinkProps extends Omit<NavigationMenuLinkProps, "href"> {
  children?: React.ReactNode;
}

const NavLinkComponent = forwardRef<HTMLAnchorElement, NavLinkProps>(
  (props, ref) => {
    return (
      <NavigationMenuLink
        className={navigationMenuTriggerStyle({
          className:
            "hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground data-[active]:bg-primary data-[state=open]:bg-primary/50 data-[active]:text-white",
        })}
        {...props}
        ref={ref}
      />
    );
  },
);

const CreatedNavLink = createLink(NavLinkComponent);

const NavLink: LinkComponent<typeof NavLinkComponent> = (props) => {
  return <CreatedNavLink {...props} />;
};

interface NavItemsProps {
  orientation?: "vertical" | "horizontal";
}

function NavItems({ orientation = "horizontal" }: NavItemsProps) {
  return (
    <NavigationMenu orientation={orientation}>
      <NavigationMenuList
        aria-orientation={orientation}
        className={orientation === "vertical" ? "flex flex-col gap-2" : ""}>
        {navbarLinks.map((props) => (
          <NavigationMenuItem key={props.to}>
            <NavLink {...props}>{props.label}</NavLink>
          </NavigationMenuItem>
        ))}
        <NavigationMenuIndicator />
      </NavigationMenuList>
    </NavigationMenu>
  );
}

export default function Header() {
  return (
    <header className="sticky top-0 flex h-16 items-center gap-4 border-b bg-white px-4 shadow-md shadow-zinc-200 md:px-6 dark:bg-zinc-950 dark:shadow-none">
      <nav className="hidden flex-col gap-6 text-nowrap text-lg font-medium md:flex md:flex-row md:items-center md:gap-5 md:text-sm lg:gap-6 dark:text-white">
        <Link
          to="/"
          className="flex items-center gap-2 text-lg font-semibold md:text-base">
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
              to="/"
              className="flex items-center gap-2 text-lg font-semibold">
              <Martini className="h-6 w-6" />
              <span className="sr-only">Barkeeper</span>
            </Link>
            <NavItems orientation="vertical" />
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
  const barkeeperUser = useUser(user?.sub ?? "");
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="secondary" size="icon" className="rounded-full">
          <CircleUser className="h-5 w-5" />
          <span className="sr-only">Toggle user menu</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>
          Cheers, {barkeeperUser.data?.DisplayName}!
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <Link to={"/settings"}>Settings</Link>
        </DropdownMenuItem>
        <DropdownMenuItem>
          {UserHelper.isAdmin(user) && <Link to={"/admin"}>Admin</Link>}
        </DropdownMenuItem>
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
