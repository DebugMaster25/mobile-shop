# Mobile Shop - E-Commerce Application

A mobile device e-commerce application built with React, TypeScript, and hexagonal architecture principles.

## 🚀 Quick Start

```bash
# Install dependencies
npm install

# Start development server
npm start

# Build for production
npm run build

# Run tests
npm test

# Run linter
npm run lint

# Type check
npm run type-check
```

## 📋 Requirements

- Node.js >= 16.x
- npm >= 8.x

## 🎯 Features

- **Product Catalog**: Browse mobile devices with images, specs, and pricing
- **Real-Time Search**: Filter products by brand or model
- **Product Details**: Comprehensive specifications and images
- **Shopping Cart**: Add products with color/storage options
- **Responsive Design**: Works on desktop, tablet, and mobile
- **Persistent Cart**: Cart count saved across sessions
- **1-Hour API Caching**: Optimized performance with smart caching

## 🏗️ Architecture

This project follows **Hexagonal Architecture** (Ports & Adapters) with clean separation of concerns:

```
src/
├── features/              # Feature modules
│   ├── products/
│   │   ├── domain/        # Business logic (entities, interfaces)
│   │   ├── infrastructure/ # External adapters (API, cache)
│   │   ├── application/   # Use cases
│   │   └── presentation/  # React components
│   └── cart/
│       └── ...
├── shared/               # Shared code
│   ├── domain/          # Common types, errors
│   ├── infrastructure/  # HTTP, cache, storage services
│   └── presentation/    # Shared UI components
└── app/                 # Application bootstrap
    ├── router/          # Routing configuration
    └── providers/       # Context providers
```

### Layer Responsibilities

- **Domain**: Pure business logic, framework-agnostic
- **Application**: Use cases, orchestrates domain logic
- **Infrastructure**: External dependencies (API, storage)
- **Presentation**: React components and UI

## 🛠️ Technology Stack

### Core
- **React 19** - UI library
- **TypeScript 5.9** - Type safety
- **React Router 7** - Client-side routing

### Build Tools
- **Webpack 5** - Module bundler (custom configuration)
- **Babel** - JavaScript transpiler
- **ts-loader** - TypeScript loader

### Code Quality
- **ESLint 9** - Code linting
- **Jest 30** - Unit testing
- **React Testing Library** - Component testing
- **Cypress 15** - E2E testing

### Design Patterns
- **Hexagonal Architecture** - Clean separation
- **Repository Pattern** - Data access abstraction
- **Dependency Injection** - Via factory pattern
- **Context API** - React state management

## 📁 Project Structure

```
mobile-shop/
├── src/
│   ├── features/
│   │   ├── products/
│   │   │   ├── domain/
│   │   │   │   ├── models/Product.ts
│   │   │   │   └── repositories/ProductRepository.ts
│   │   │   ├── infrastructure/
│   │   │   │   └── api/ProductApiRepository.ts
│   │   │   ├── application/
│   │   │   │   └── use-cases/
│   │   │   └── presentation/
│   │   │       ├── components/
│   │   │       ├── pages/
│   │   │       └── context/
│   │   └── cart/
│   │       └── ...
│   ├── shared/
│   ├── app/
│   └── index.tsx
├── public/
├── cypress/
├── webpack.*.js
├── tsconfig.json
├── eslint.config.js
├── jest.config.js
└── package.json
```

## 🎨 UI Components

### Pages
- **ProductListPage**: Grid view of all products with search
- **ProductDetailPage**: Detailed product view with specs

### Components
- **Header**: Navigation with cart counter
- **SearchBar**: Real-time product filtering
- **ProductCard**: Product preview card
- **ProductGrid**: Responsive product layout (4/3/2/1 columns)

## 🔌 API Integration

**Base URL**: `https://itx-frontend-test.onrender.com`

### Endpoints
- `GET /api/product` - Get all products
- `GET /api/product/:id` - Get product by ID
- `POST /api/cart` - Add item to cart

### Caching Strategy
- Products cached for 1 hour
- Search uses client-side filtering (no additional API calls)
- Cart count persisted to localStorage

## 🧪 Testing

### Unit Tests
```bash
npm test
```

Tests cover:
- Domain models
- Mappers (DTO → Domain)
- Services (Cache, HTTP)
- Business logic

### E2E Tests
```bash
npm run test:e2e       # Headless mode
npm run test:e2e:open  # Interactive mode
```

## 📦 Build

### Development
```bash
npm start
```
- Hot module replacement
- Source maps
- Development server on port 3000

### Production
```bash
npm run build
```
- Minification
- Code splitting
- Vendor chunk separation
- Optimized bundle (~259 KB)

## 🎯 Scripts

| Command | Description |
|---------|-------------|
| `npm start` | Start dev server |
| `npm run build` | Production build |
| `npm test` | Run unit tests |
| `npm test:watch` | Test watch mode |
| `npm run test:e2e` | Run E2E tests |
| `npm run lint` | Check code quality |
| `npm run lint:fix` | Fix linting issues |
| `npm run type-check` | Validate TypeScript |

## 📱 Responsive Design

- **Desktop** (> 1024px): 4-column grid
- **Tablet** (768-1024px): 3-column grid
- **Small** (480-768px): 2-column grid
- **Mobile** (< 480px): 1-column grid

## 🔒 Type Safety

- **Strict TypeScript** configuration
- **No `any` types** allowed
- **Exhaustive type checking**
- **Path aliases** for clean imports

## 🚦 Code Quality

- **ESLint**: Zero errors, zero warnings policy
- **TypeScript**: Strict mode enabled
- **Testing**: 33 unit tests passing
- **Coverage**: ~90% for tested modules

## 📝 Development Notes

### Path Aliases
```typescript
import { Product } from '@features/products/domain/models';
import { HttpClient } from '@shared/infrastructure';
import { useCart } from '@features/cart/presentation/context';
```

### Adding New Features
1. Create domain models in `features/{feature}/domain/`
2. Define repository interfaces
3. Implement repositories in `infrastructure/`
4. Create use cases in `application/`
5. Build UI in `presentation/`

## 🤝 Contributing

1. Follow hexagonal architecture principles
2. Maintain type safety (no `any`)
3. Write tests for new features
4. Use meaningful commit messages
5. Keep components small and focused

## 📄 License

ISC

## 👨‍💻 Author

Frontend Test Project

---

**Built with ❤️ using React, TypeScript, and Clean Architecture**