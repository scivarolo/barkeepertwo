import { CircleUser, Martini, Menu, X } from "lucide-react";

import { useAuth0 } from "@auth0/auth0-react";
import ThemeToggle from "./ThemeToggle";
import {
  createLink,
  Link,
  LinkComponent,
  linkOptions,
} from "@tanstack/react-router";
import { forwardRef, useState } from "react";
import { useUser } from "@/data/User";
import { UserHelper } from "@/lib/user";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Dialog, DialogContent } from "@/components/ui/dialog";

const navbarLinks = linkOptions([
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
]);

interface NavLinkProps {
  to: string;
  label: string;
  activeOptions?: any;
  children?: React.ReactNode;
}

const NavLinkComponent = forwardRef<HTMLAnchorElement, NavLinkProps>(
  ({ to, label, ...props }, ref) => {
    return (
      <Link
        to={to}
        ref={ref}
        className="hover:text-primary-600 text-recipe-instruction font-sans transition-colors data-[status='active']:text-primary data-[status='active']:font-semibold"
        {...props}>
        {label}
      </Link>
    );
  },
);

NavLinkComponent.displayName = "NavLinkComponent";

const CreatedNavLink = createLink(NavLinkComponent);

const NavLink: LinkComponent<typeof NavLinkComponent> = (props) => {
  return <CreatedNavLink {...props} />;
};

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
          <nav className="hidden cursor-pointer gap-1 sm:flex">
            {navbarLinks.map((props) => (
              <NavLink
                key={props.label}
                {...props}
              >
                {props.label}
              </NavLink>
            ))}
          </nav>

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
                <div key={props.label} onClick={() => setIsMenuOpen(false)}>
                  <NavLink {...props}>
                    {props.label}
                  </NavLink>
                </div>
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
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="rounded-full">
          <CircleUser className="h-5 w-5" />
          <span className="sr-only">Toggle user menu</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
        <DropdownMenuLabel className="font-display font-medium">
          Cheers, {barkeeperUser.data?.DisplayName}!
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
          <Link to="/settings">Settings</Link>
        </DropdownMenuItem>
        {UserHelper.isAdmin(user) ? (
          <>
            <DropdownMenuItem asChild>
              <Link to="/admin">Admin</Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link to="/theme-demo">Theme Demo</Link>
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
