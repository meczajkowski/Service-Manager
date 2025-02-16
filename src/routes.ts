export enum AppRoutes {
  home = '/',
  signIn = '/api/auth/signin',
  signOut = '/api/auth/signout',
  authError = '/api/auth/error',
  devices = '/devices',
  devicesNew = '/devices/new',
  customers = '/customers',
  customersNew = '/customers/new',
  contacts = '/contacts',
}

export const PUBLIC_ROUTES = [AppRoutes.signIn, AppRoutes.authError];
export const DEFAULT_REDIRECT = AppRoutes.home;
