import Container from "@/app/_components/container";
import Header from "@/app/_components/header";
import { getAllTestData } from "@/lib/testDataService";
import { TestData } from "@/interfaces/testData";

export default async function DynamicTestingPage() {
    let testData: TestData[] = [];
    let error: string | null = null;

    try {
        testData = await getAllTestData();
    } catch (err) {
        error = err instanceof Error ? err.message : 'Unknown error occurred';
    }

    return (
        <main>
            <Container>
                <Header />
                <div className="max-w-4xl mx-auto py-8">
                    <h1 className="text-4xl font-bold mb-8 text-center">Dynamic Testing</h1>
                    <p className="text-lg text-gray-600 dark:text-gray-300 mb-8 text-center">
                        This page demonstrates fetching dynamic data from a PostgreSQL database
                    </p>

                    {error ? (
                        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-8">
                            <strong className="font-bold">Error: </strong>
                            <span className="block sm:inline">{error}</span>
                            <div className="mt-2 text-sm">
                                <p>Make sure your PostgreSQL database is running and the connection settings are correct.</p>
                                <p>You may need to create the database table first. See the setup instructions below.</p>
                            </div>
                        </div>
                    ) : (
                        <div className="space-y-6">
                            <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-8">
                                <strong className="font-bold">Success! </strong>
                                <span className="block sm:inline">
                                    Connected to database and found {testData.length} record(s).
                                </span>
                            </div>

                            {testData.length === 0 ? (
                                <div className="text-center py-8">
                                    <p className="text-gray-500 dark:text-gray-400">No test data found. Add some data to your database!</p>
                                </div>
                            ) : (
                                <div className="grid gap-6">
                                    {testData.map((item) => (
                                        <div key={item.id} className="bg-white dark:bg-slate-800 rounded-lg shadow-md p-6 border border-gray-200 dark:border-gray-700">
                                            <h2 className="text-xl font-semibold mb-3 text-gray-800 dark:text-gray-100">
                                                {item.title}
                                            </h2>
                                            <p className="text-gray-600 dark:text-gray-300 mb-4">
                                                {item.content}
                                            </p>
                                            <div className="text-sm text-gray-500 dark:text-gray-400 space-y-1">
                                                <p>ID: {item.id}</p>
                                                <p>Created: {new Date(item.created_at).toLocaleString()}</p>
                                                <p>Updated: {new Date(item.updated_at).toLocaleString()}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    )}

                    <div className="mt-12 bg-gray-50 dark:bg-slate-800 rounded-lg p-6">
                        <h2 className="text-2xl font-bold mb-4">Database Setup Instructions</h2>
                        <div className="space-y-4 text-sm">
                            <div>
                                <h3 className="font-semibold mb-2">1. Create the database table:</h3>
                                <pre className="bg-gray-100 dark:bg-slate-700 p-3 rounded overflow-x-auto">
                                    <code>{`CREATE TABLE test_data (
  id SERIAL PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  content TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);`}</code>
                                </pre>
                            </div>

                            <div>
                                <h3 className="font-semibold mb-2">2. Insert some sample data:</h3>
                                <pre className="bg-gray-100 dark:bg-slate-700 p-3 rounded overflow-x-auto">
                                    <code>{`INSERT INTO test_data (title, content) VALUES 
  ('First Test', 'This is the first test data entry from PostgreSQL!'),
  ('Second Test', 'This is another test entry to verify the dynamic data loading.'),
  ('Database Integration', 'Successfully connected Next.js with PostgreSQL database.');`}</code>
                                </pre>
                            </div>

                            <div>
                                <h3 className="font-semibold mb-2">3. Environment variables (.env.local):</h3>
                                <pre className="bg-gray-100 dark:bg-slate-700 p-3 rounded overflow-x-auto">
                                    <code>{`DB_HOST=localhost
DB_PORT=5432
DB_NAME=blog_test
DB_USER=postgres
DB_PASSWORD=your_password`}</code>
                                </pre>
                            </div>
                        </div>
                    </div>
                </div>
            </Container>
        </main>
    );
}
