-- Database setup script for dynamic testing
-- Run this in your PostgreSQL database

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
  ('First Test', 'This is the first test data entry from PostgreSQL! It demonstrates that our Next.js app can successfully fetch dynamic data from the database.'),
  ('Second Test', 'This is another test entry to verify the dynamic data loading. Each refresh will fetch the latest data from the database.'),
  ('Database Integration', 'Successfully connected Next.js with PostgreSQL database. This proves that our deployment can handle dynamic content alongside static markdown posts.'),
  ('Dynamic Content', 'This content is stored in PostgreSQL and fetched dynamically on each request. This is different from the static markdown posts that are built at compile time.'),
  ('Test Deployment', 'This test will help verify that your Dokploy deployment can handle database connections and dynamic content rendering.');

-- Create an index for better performance
CREATE INDEX IF NOT EXISTS idx_test_data_created_at ON test_data(created_at DESC);
