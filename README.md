# Delos Hub

A comprehensive monorepo for Delos financial services, built with modern technologies and best practices for scalable development.

## 🏗️ Technologies Used

### Core Framework
- **[Nx](https://nx.dev/)** - Smart, fast and extensible build system for monorepos
- **[NestJS](https://nestjs.com/)** - Progressive Node.js framework for building efficient and scalable server-side applications
- **[TypeScript](https://www.typescriptlang.org/)** - Typed JavaScript at scale

### Development Tools
- **ESLint** - Code linting and formatting
- **Jest** - Testing framework
- **Webpack** - Module bundler
- **Docker** - Containerization support
- **Yarn** - Package manager

### API Documentation
- **Swagger/OpenAPI** - API documentation
- **Stoplight Elements** - Interactive API documentation

## 📁 Projects in the Monorepo

### Current Projects

1. **[Second Look API](./apps/@delos/second-look-api/README.md)** - Credit evaluation system API
   - Advanced analytics for private credit opportunities
   - Proprietary credit risk models
   - Automated decisioning capabilities

2. **Frontend** - *Coming Soon*
   - User interface for the Delos platform

3. **Backend** - *Coming Soon*
   - Core backend services and infrastructure

### E2E Testing
- **Second Look API E2E** - End-to-end tests for the Second Look API

## 🚀 Getting Started

### Prerequisites
- Node.js (v18 or higher)
- Yarn package manager
- Docker (optional, for containerized deployment)

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd delos-hub
```

2. Install dependencies:
```bash
yarn install
```

### Running the Second Look API

#### Development Mode
```bash
# Start the API in development mode with hot reload
nx serve @delos/second-look-api

# Or using the shorthand
nx serve second-look-api
```

#### Production Mode
```bash
# Build the application
nx build @delos/second-look-api

# Serve the production build
nx serve @delos/second-look-api --configuration=production
```

#### Docker Deployment
```bash
# Build Docker image
nx docker:build @delos/second-look-api

# Run Docker container
nx docker:run @delos/second-look-api
```

### Available Scripts

#### Development
```bash
# Serve applications
nx serve <project-name>

# Build applications
nx build <project-name>

# Run tests
nx test <project-name>

# Run linting
nx lint <project-name>

# Run type checking
nx typecheck <project-name>
```

#### Testing
```bash
# Run unit tests
nx test @delos/second-look-api

# Run e2e tests
nx e2e @delos/second-look-api-e2e

# Run all tests
nx run-many --target=test
```

#### Code Quality
```bash
# Lint all projects
nx run-many --target=lint

# Type check all projects
nx run-many --target=typecheck
```

## 🔧 Nx Workspace Features

This workspace is configured with:
- **Smart caching** - Nx caches build artifacts and test results
- **Dependency graph** - Automatic dependency management
- **Code generation** - Scaffold new features and components
- **Affected testing** - Only run tests for changed projects
- **Parallel execution** - Run tasks in parallel when possible

### Useful Nx Commands

```bash
# View project graph
nx graph

# Show affected projects
nx affected:graph

# Run affected tests
nx affected:test

# Generate new project
nx g @nx/nest:app <app-name>

# Generate new library
nx g @nx/nest:lib <lib-name>
```

## 📚 API Documentation

The Second Look API includes comprehensive documentation:
- **Swagger UI** - Interactive API documentation
- **Stoplight Elements** - Enhanced API documentation experience
- **OpenAPI Specification** - Machine-readable API specification

Access the API documentation at: `http://localhost:3000/api` (when running in development mode)

## 🏛️ Architecture

This monorepo follows a structured approach:
- **Apps** - Deployable applications
- **Libraries** - Shared code and utilities
- **E2E Tests** - End-to-end test suites
- **Docker** - Containerization configurations

## 🤝 Contributing

1. Create a feature branch
2. Make your changes
3. Run tests and linting
4. Submit a pull request

