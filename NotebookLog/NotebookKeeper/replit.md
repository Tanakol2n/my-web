# Notebook Inventory Management System

## Overview

This is a full-stack web application for managing notebook/laptop inventory. The system allows users to track laptops with detailed information including asset codes, models, serial numbers, locations, users, departments, and maintenance schedules. The application features a modern React frontend with a clean table-based interface and an Express.js backend with RESTful APIs.

## User Preferences

Preferred communication style: Simple, everyday language.

## Recent Changes (August 1, 2025)

✓ Fixed type compatibility issues in storage layer and form components
✓ Changed Department field from dropdown selection to free text input
✓ Updated table header styling to use light blue background (sky-100) with dark blue text
✓ Implemented responsive table column widths:
  - All columns except Remark use whitespace-nowrap for content-based width
  - Remark column has fixed width (w-324) with text wrapping at 50 characters
  - Table supports horizontal scrolling when content exceeds page width
✓ Enhanced table header and cell styling with proper color scheme
✓ Created standalone HTML version (`standalone/simple.html`) that works directly in browsers
✓ Prepared complete Firebase Hosting deployment package with:
  - Firebase configuration files (firebase.json, .firebaserc)
  - Firebase Functions backend (functions/ directory)
  - Build scripts and deployment documentation
  - VS Code setup instructions for local development

## System Architecture

The application follows a monorepo structure with clear separation between client and server code:

- **Frontend**: React with TypeScript, using Vite as the build tool
- **Backend**: Express.js with TypeScript
- **Database**: PostgreSQL with Drizzle ORM
- **UI Components**: shadcn/ui component library with Radix UI primitives
- **Styling**: Tailwind CSS with custom design tokens
- **State Management**: React Query (TanStack Query) for server state
- **Form Handling**: React Hook Form with Zod validation

## Key Components

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Build Tool**: Vite with custom configuration for development and production
- **Routing**: Wouter for lightweight client-side routing
- **UI Library**: shadcn/ui components built on Radix UI primitives
- **Styling**: Tailwind CSS with custom CSS variables for theming
- **Forms**: React Hook Form with Zod schema validation
- **Data Fetching**: TanStack Query for server state management

### Backend Architecture
- **Runtime**: Node.js with Express.js framework
- **Language**: TypeScript with ESM modules
- **Database**: PostgreSQL with Drizzle ORM
- **Validation**: Zod schemas shared between client and server
- **Development**: tsx for TypeScript execution in development

### Database Schema
The system uses a single `notebooks` table with the following fields:
- **id**: UUID primary key (auto-generated)
- **assetCode**: Text field for asset identification
- **model**: Laptop model information
- **serialNumber**: Device serial number
- **location**: Physical location of the device
- **userName**: Optional user assignment
- **department**: Department ownership
- **status**: Device status (active, inactive, damaged)
- **deviceNumber**: Optional device numbering
- **purchasedUnder**: Purchase information
- **dueDate**: 5-year maintenance due date
- **remark**: Additional notes

## Data Flow

1. **Client Requests**: React components use TanStack Query to fetch data from REST endpoints
2. **API Layer**: Express.js routes handle HTTP requests and validate input using Zod schemas
3. **Storage Layer**: Currently uses in-memory storage (MemStorage class) but is designed to be replaced with database persistence
4. **Response**: JSON responses are sent back to the client and cached by React Query

## External Dependencies

### Frontend Dependencies
- **UI Components**: Extensive use of Radix UI primitives (@radix-ui/*)
- **State Management**: @tanstack/react-query for server state
- **Form Handling**: react-hook-form with @hookform/resolvers
- **Validation**: zod with drizzle-zod integration
- **Styling**: tailwindcss with class-variance-authority for component variants
- **Utilities**: date-fns for date handling, xlsx for Excel export
- **Icons**: lucide-react icon library

### Backend Dependencies
- **Database**: @neondatabase/serverless for PostgreSQL connection
- **ORM**: drizzle-orm with drizzle-kit for migrations
- **Session**: connect-pg-simple for PostgreSQL session storage
- **Validation**: zod for schema validation
- **Development**: tsx for TypeScript execution

## Deployment Strategy

The application is configured for both development and production environments:

### Development
- **Frontend**: Vite dev server with HMR (Hot Module Replacement)
- **Backend**: tsx with auto-restart on file changes
- **Database**: Drizzle kit for schema management and migrations
- **Environment**: NODE_ENV=development

### Production Build
- **Frontend**: Vite builds static assets to `dist/public`
- **Backend**: esbuild bundles server code to `dist/index.js`
- **Database**: Drizzle migrations applied via `db:push` command
- **Deployment**: Single Node.js process serving both API and static files

### Key Build Commands
- `npm run dev`: Start development servers
- `npm run build`: Build for production
- `npm run start`: Run production build
- `npm run db:push`: Apply database schema changes

The application is designed to be deployed on platforms that support Node.js with PostgreSQL databases, with specific optimizations for Replit deployment including the replit dev banner and cartographer plugin for development.