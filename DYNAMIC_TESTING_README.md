# Dynamic Testing Setup

This guide will help you set up the dynamic testing route that connects to a PostgreSQL database.

## Prerequisites

- PostgreSQL installed and running locally
- pnpm (package manager)

## Setup Instructions

### 1. Install Dependencies

The necessary dependencies have been added to your project:
- `pg` - PostgreSQL client for Node.js  
- `@types/pg` - TypeScript definitions for pg

### 2. Create Database

Create a PostgreSQL database for testing:

```sql
CREATE DATABASE blog_test;
```

### 3. Setup Environment Variables

Create a `.env.local` file in your project root with your database credentials:

```env
DB_HOST=localhost
DB_PORT=5432
DB_NAME=blog_test
DB_USER=postgres
DB_PASSWORD=your_password_here
```

### 4. Initialize Database

Run the SQL script to create the table and insert sample data:

```bash
psql -U postgres -d blog_test -f database/init.sql
```

Or manually run the SQL commands:

```sql
-- Create the test_data table
CREATE TABLE IF NOT EXISTS test_data (
  id SERIAL PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  content TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Insert sample data
INSERT INTO test_data (title, content) VALUES 
  ('First Test', 'This is the first test data entry from PostgreSQL!'),
  ('Second Test', 'This is another test entry to verify the dynamic data loading.'),
  ('Database Integration', 'Successfully connected Next.js with PostgreSQL database.');
```

### 5. Run the Application

Start your Next.js development server:

```bash
pnpm dev
```

### 6. Test the Dynamic Route

Visit `http://localhost:3000/dynamic-testing` to see the dynamic data fetched from your PostgreSQL database.

## Files Created

- `src/app/dynamic-testing/page.tsx` - Main dynamic testing page
- `src/lib/db.ts` - Database connection pool
- `src/lib/testDataService.ts` - Database service functions
- `src/interfaces/testData.ts` - TypeScript interface for test data
- `database/init.sql` - Database initialization script
- `.env.local.example` - Environment variables example

## Features

- Server-side rendering with dynamic data
- Error handling for database connection issues
- Responsive design with dark mode support
- Sample data and setup instructions displayed on the page

## Troubleshooting

If you encounter connection issues:

1. Make sure PostgreSQL is running
2. Verify your database credentials in `.env.local`
3. Ensure the database and table exist
4. Check that your PostgreSQL server accepts connections from localhost

## Deployment to Dokploy

When deploying to Dokploy, make sure to:

1. Set up a PostgreSQL database on your VPS
2. Configure the environment variables in your Dokploy deployment
3. Run the database initialization script on your production database
4. Ensure your VPS firewall allows database connections
