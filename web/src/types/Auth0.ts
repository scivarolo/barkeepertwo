declare module "@auth0/auth0-react" {
  interface User {
    "http://schemas.microsoft.com/ws/2008/06/identity/claims/role"?: string[];
  }
}
