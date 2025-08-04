# Notebook Inventory Management System

A comprehensive full-stack web application for managing notebook/laptop inventory with CRUD operations, search functionality, status tracking, and Excel export capabilities.

## Features

- ✅ Complete CRUD operations for notebook inventory
- ✅ Search functionality across all fields
- ✅ Pagination with configurable rows per page
- ✅ Status tracking (Active, Inactive, Damaged) with color coding
- ✅ Excel export functionality
- ✅ Responsive design with professional UI
- ✅ Real-time search and filtering
- ✅ Department field with manual text input
- ✅ Remark column with text wrapping at 50 characters

## Prerequisites

- Node.js (version 18 or higher)
- npm or yarn package manager

## Installation & Setup

1. **Clone or download the project**
   ```bash
   cd notebook-management-system
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:5000`

## Available Scripts

- `npm run dev` - Start development server (backend + frontend)
- `npm run build` - Build for production
- `npm start` - Run production build
- `npm run db:push` - Apply database schema changes (if using database)

## Project Structure

```
├── client/                 # Frontend React application
│   ├── src/
│   │   ├── components/     # Reusable UI components
│   │   ├── pages/         # Page components
│   │   ├── lib/           # Utility functions
│   │   └── hooks/         # Custom React hooks
├── server/                # Backend Express.js application
│   ├── index.ts           # Server entry point
│   ├── routes.ts          # API routes
│   └── storage.ts         # Data storage layer
├── shared/                # Shared types and schemas
└── package.json

```

## Technology Stack

### Frontend
- **React 18** with TypeScript
- **Vite** for build tooling and development server
- **Tailwind CSS** for styling
- **shadcn/ui** component library
- **React Hook Form** for form handling
- **TanStack Query** for data fetching
- **Wouter** for routing

### Backend
- **Express.js** with TypeScript
- **Zod** for validation
- **In-memory storage** (can be replaced with database)

## Usage

1. **Adding Notebooks**: Click "Add Data" to open the form and enter notebook details
2. **Editing**: Click the edit button on any row to modify existing entries
3. **Deleting**: Click the delete button and confirm to remove entries
4. **Searching**: Use the search bar to filter notebooks by any field
5. **Exporting**: Click "Export to Excel" to download data as spreadsheet
6. **Status Tracking**: View color-coded rows based on device status

## Data Storage

Currently uses in-memory storage. Data will reset when the server restarts. To persist data, you can integrate with a database like PostgreSQL using the existing Drizzle ORM setup.

## Customization

- **Status Colors**: Modify in `client/src/index.css`
- **Table Columns**: Update schema in `shared/schema.ts`
- **UI Components**: Customize in `client/src/components/`
- **API Endpoints**: Modify in `server/routes.ts`

## Troubleshooting

### Common Issues

1. **Port already in use**: Change the port in `server/index.ts`
2. **Dependencies not installed**: Run `npm install` again
3. **Build errors**: Delete `node_modules` and `package-lock.json`, then run `npm install`

### Development Tips

- The application auto-reloads when you make changes
- Check browser console for any JavaScript errors
- API calls go to `/api/*` endpoints
- Static files are served from the `client` directory

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is open source and available under the MIT License.