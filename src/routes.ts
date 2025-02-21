export const routes = {
  home: '/',
  auth: {
    signIn: '/api/auth/signin',
    signOut: '/api/auth/signout',
    error: '/api/auth/error',
  },
  devices: {
    list: '/devices',
    new: '/devices/new',
    edit: (id: string) => `/devices/${id}/edit`,
    view: (id: string) => `/devices/${id}`,
  },
  customers: {
    list: '/customers',
    new: '/customers/new',
    edit: (id: string) => `/customers/${id}/edit`,
    view: (id: string) => `/customers/${id}`,
  },
  contacts: {
    list: '/contacts',
    new: '/contacts/new',
    edit: (id: string) => `/contacts/${id}/edit`,
    view: (id: string) => `/contacts/${id}`,
  },
  serviceOrders: {
    list: '/service-orders',
    new: (deviceId: string) => `/service-orders/new?deviceId=${deviceId}`,
    edit: (id: string) => `/service-orders/${id}/edit`,
    view: (id: string) => `/service-orders/${id}`,
  },
} as const;

export const PUBLIC_PATHS = [routes.auth.signIn, routes.auth.error] as const;
export const DEFAULT_REDIRECT = routes.home;
