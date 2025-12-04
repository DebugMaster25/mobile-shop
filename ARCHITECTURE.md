# Hexagonal Architecture Structure

This project follows **Hexagonal Architecture (Ports & Adapters)** principles to separate concerns and make the code more maintainable and testable.

## Architecture Overview

```
src/
├── features/           # Feature modules (Business capabilities)
│   ├── products/       # Product feature
│   │   ├── domain/           # Business logic (pure, framework-agnostic)
│   │   │   ├── models/       # Domain entities (Product, ProductOption)
│   │   │   ├── repositories/ # Repository interfaces (ports)
│   │   │   └── services/     # Domain services (business rules)
│   │   ├── infrastructure/   # External adapters (API, cache, etc.)
│   │   │   ├── api/          # API client implementations
│   │   │   └── cache/        # Cache implementations
│   │   ├── application/      # Use cases (orchestration)
│   │   │   └── use-cases/    # Application services
│   │   └── presentation/     # UI layer (React components)
│   │       ├── components/   # UI components
│   │       ├── pages/        # Page components
│   │       ├── hooks/        # React hooks
│   │       └── context/      # React context (state management)
│   │
│   └── cart/           # Cart feature
│       ├── domain/
│       ├── infrastructure/
│       ├── application/
│       └── presentation/
│
├── shared/             # Shared code across features
│   ├── domain/         # Shared domain code
│   │   ├── models/     # Base entities
│   │   ├── types/      # Shared types
│   │   └── errors/     # Error classes
│   ├── infrastructure/ # Shared infrastructure
│   │   ├── http/       # HTTP client
│   │   ├── cache/      # Cache service
│   │   └── storage/    # Storage service
│   └── presentation/   # Shared UI
│       ├── components/ # Reusable components (Header, etc.)
│       ├── hooks/      # Shared hooks
│       └── styles/     # Global styles
│
└── app/                # Application bootstrap
    ├── router/         # Route configuration
    └── providers/      # Context providers
```

## Layer Responsibilities

### 1. Domain Layer (Core Business Logic)
- **Models**: Entities with business rules
- **Repositories**: Interfaces defining data operations (ports)
- **Services**: Business logic not tied to entities
- **Independent** of frameworks, UI, or infrastructure

### 2. Application Layer (Use Cases)
- **Use Cases**: Orchestrate domain logic
- Coordinate between domain and infrastructure
- Handle application-specific business flows

### 3. Infrastructure Layer (External Adapters)
- **API**: HTTP client implementations
- **Cache**: Caching implementations
- **Storage**: Local/session storage implementations
- Implements repository interfaces from domain

### 4. Presentation Layer (UI)
- **Components**: React components
- **Pages**: Route-level components
- **Hooks**: React hooks for state/side effects
- **Context**: React Context API for state management

## Dependency Rules

```
Presentation → Application → Domain ← Infrastructure
     ↓              ↓            ↑
     └──────────────┴────────────┘
```

**Key principle**: Dependencies point INWARD
- Domain has NO dependencies (pure business logic)
- Infrastructure depends on domain (implements interfaces)
- Application depends on domain
- Presentation depends on application

## Benefits

1. **Testability**: Domain logic is pure and easy to test
2. **Maintainability**: Clear separation of concerns
3. **Flexibility**: Easy to swap infrastructure (different APIs, storage)
4. **Scalability**: Features are independent modules
5. **Type Safety**: TypeScript interfaces enforce contracts

## Example Flow

**User clicks "Add to Cart"**:
1. **Presentation**: Component calls hook
2. **Hook**: Uses use case from application layer
3. **Use Case**: Orchestrates domain logic
4. **Domain**: Validates business rules
5. **Infrastructure**: Makes API call
6. **Domain**: Updates cart entity
7. **Presentation**: Updates UI via context