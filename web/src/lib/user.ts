import { User } from "@auth0/auth0-react";

export const UserHelper = {
  isInRole: (user: User | undefined, role: string) => {
    return (
      user?.[
        "http://schemas.microsoft.com/ws/2008/06/identity/claims/role"
      ]?.includes(role) ?? false
    );
  },
  isAdmin: (user: User | undefined) => {
    return UserHelper.isInRole(user, "Admin");
  },
};
