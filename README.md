# Service Manager - Enterprise Device Maintenance Platform

## Overview
Service Manager is an enterprise-grade application for managing device maintenance operations, built with modern web technologies and clean architecture principles. It handles the complete lifecycle of service orders, from creation to completion, with role-based access control and comprehensive tracking capabilities.

## Live Demo

https://mc-service-manager.netlify.app/

Test the application with these credentials:
```
Admin Access:
Email: admin@konica.com
Password: admin

Technician Access:
Email: technician@konica.com
Password: technician
```

## Key Features

### Role-Based Access Control
- **Admin Dashboard**: Complete system control and user management
- **Technician Portal**: Service order management and device maintenance tracking
- Secure authentication using Auth.js v5 with JWT strategy

Example of role-based authorization:

```36:42:src/backend/domains/auth/auth.service.ts
  /**
   * Requires the current user to have one of the specified roles
   * @param roles - The roles to check
   * @returns The current user
   * @throws Error if not authenticated or doesn't have required role
   */
  requireAnyRole(roles: UserRole[]): Promise<UserDto>;
```


### Service Order Management
- Create and track maintenance requests
- Assign technicians to service orders
- Monitor service status and completion
- Comprehensive service history

### Device and Customer Management
- Track devices with detailed specifications
- Manage customer relationships
- Link devices to customers and contacts
- Comprehensive device history

## Technical Stack

### Frontend
- Next.js 14 (App Router)
- React 18
- TypeScript
- TailwindCSS with Shadcn/UI components
- Responsive design with modern UI components

### Backend Architecture
- Clean Architecture with Domain-Driven Design
- Repository Pattern for data access
- Service Layer for business logic
- Type-safe DTOs throughout the application

Example of clean architecture implementation:

```96:126:src/backend/domains/service-orders/service-orders.service.ts

/**
 * Interface for the service orders service
 */
export interface IServiceOrdersService {
  /**
   * Creates a new service order
   * @param data - The data for the new service order
   * @returns The created service order
   * @throws NotFoundError if device not found
   * @throws UnauthorizedError if not authorized or assigned user is not a technician
   */
  create(data: CreateServiceOrderDto): Promise<ServiceOrderDto>;

  /**
   * Gets a service order by ID
   * @param id - The ID of the service order to get
   * @returns The service order
   * @throws NotFoundError if service order not found
   * @throws UnauthorizedError if not authorized
   */
  get(id: string): Promise<ServiceOrderDto>;

  /**
   * Gets a service order by ID with relations
   * @param id - The ID of the service order to get
   * @returns The service order with relations
   * @throws NotFoundError if service order not found
   * @throws UnauthorizedError if not authorized
   */
  getWithRelations(id: string): Promise<ServiceOrderWithRelationsDto>;
```


### Database
- PostgreSQL with Prisma ORM
- Type-safe database operations
- Comprehensive data relationships
- Automated migrations

Database schema example:

```81:100:prisma/schema.prisma
enum ServiceStatus {
  PENDING
  ISSUED
  COMPLETED
  CANCELLED
}

model ServiceOrder {
  id                 String        @id @default(uuid())
  device             Device        @relation(fields: [deviceId], references: [id])
  deviceId           String
  troubleDescription String
  status             ServiceStatus @default(PENDING)
  assignedTo         User?         @relation(fields: [assignedToId], references: [id])
  assignedToId       String?
  completedAt        DateTime?

  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}
```


### Code Quality & Development
- ESLint & Prettier for code consistency
- Husky for pre-commit hooks
- TypeScript for type safety
- Comprehensive documentation
- Clean code practices

## Enterprise-Grade Architecture Features

### 1. Separation of Concerns
Each domain (users, devices, service orders) has its own:
- Repository for data access
- Service layer for business logic
- DTOs for type-safe data transfer
- Clear interface definitions

### 2. Type Safety
- Zod schemas for runtime validation
- TypeScript interfaces for compile-time type checking
- Prisma-generated types for database operations

### 3. Error Handling
- Centralized error handling
- Custom error types
- Consistent error responses

### 4. Security
- Role-based access control
- JWT authentication
- Secure password handling
- Input validation

## Project Structure
```
src/
├── app/                 # Next.js pages and routes
├── backend/
│   ├── domains/        # Business logic domains
│   ├── common/         # Shared utilities
│   └── services.ts     # Service initialization
├── components/         # React components
├── lib/               # Core utilities
└── types/             # TypeScript types
```

