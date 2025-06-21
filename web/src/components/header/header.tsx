import { CircleUser, Martini } from "lucide-react";

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
import {
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownSection,
  DropdownTrigger,
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarItemProps,
  NavbarMenu,
  NavbarMenuToggle,
} from "@heroui/react";

const activeProps = { active: true, className: "text-primary font-semibold" };

const navbarLinks = linkOptions([
  {
    to: "/",
    label: "Dashboard",
    activeOptions: { exact: true },
    activeProps: { ...activeProps },
  },
  {
    to: "/cocktails",
    label: "Cocktails",
    activeProps: { ...activeProps },
  },
  {
    to: "/bar",
    label: "Bar",
    activeProps: { ...activeProps },
  },
  {
    to: "/shopping-list",
    label: "Shopping List",
    activeProps: { ...activeProps },
  },
]);

interface NavLinkProps extends Omit<NavbarItemProps, "href"> {
  children?: React.ReactNode;
}

const NavLinkComponent = forwardRef<HTMLAnchorElement, NavLinkProps>(
  (props, ref) => {
    return (
      <NavbarItem
        as={Button}
        variant="light"
        isActive={props.isActive}
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

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  return (
    <>
      <Navbar
        isBordered
        isMenuOpen={isMenuOpen}
        className="py-3"
        onMenuOpenChange={setIsMenuOpen}>
        <NavbarContent justify="start">
          <NavbarMenuToggle
            className="sm:hidden"
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          />
          <NavbarBrand>
            <Link to="/" className="text-lg font-semibold">
              <Martini className="h-6 w-6" />
              <span className="sr-only">Barkeeper</span>
            </Link>
          </NavbarBrand>
        </NavbarContent>
        <NavbarContent
          justify="start"
          className="hidden cursor-pointer sm:flex">
          {navbarLinks.map((props) => (
            <NavLink
              key={props.label}
              className="hover:text-primary-700"
              {...props}>
              {props.label}
            </NavLink>
          ))}
        </NavbarContent>
        <NavbarContent justify="end">
          {/* <form className="ml-auto flex-1 sm:flex-initial">
              <div className="relative">
                <Search className="text-muted-foreground absolute top-2.5 left-2.5 h-4 w-4" />
                <Input
                  type="search"
                  placeholder="Search cocktails..."
                  className="pl-8 sm:w-[300px] md:w-[200px] lg:w-[300px]"
                />
              </div>
            </form> */}
          <NavbarItem>
            <ThemeToggle />
          </NavbarItem>
          <UserMenu />
        </NavbarContent>
        <NavbarMenu>
          {navbarLinks.map((props) => (
            <NavLink
              key={props.label}
              className="hover:text-primary-700"
              {...props}>
              {props.label}
            </NavLink>
          ))}
        </NavbarMenu>
      </Navbar>
    </>
  );
}

function UserMenu() {
  const { logout, user } = useAuth0();
  const barkeeperUser = useUser(user?.sub ?? "");
  return (
    <Dropdown shadow="sm">
      <DropdownTrigger asChild>
        <Button variant="ghost" className="rounded-full" isIconOnly>
          <CircleUser className="h-5 w-5" />
          <span className="sr-only">Toggle user menu</span>
        </Button>
      </DropdownTrigger>
      <DropdownMenu aria-label="User Actions">
        <DropdownSection showDivider>
          <DropdownItem key="greeting">
            <p>Cheers, {barkeeperUser.data?.DisplayName}!</p>
          </DropdownItem>
        </DropdownSection>
        <DropdownSection showDivider>
          <DropdownItem key="Settings" href="/settings">
            Settings
          </DropdownItem>
          {UserHelper.isAdmin(user) ? (
            <DropdownItem key="Admin" href="/admin">
              Admin
            </DropdownItem>
          ) : null}
        </DropdownSection>
        <DropdownItem
          key="logout"
          onPress={() =>
            logout({ logoutParams: { returnTo: window.location.origin } })
          }>
          Logout
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
}
