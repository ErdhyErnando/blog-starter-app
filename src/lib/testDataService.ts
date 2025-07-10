import pool from '@/lib/db';
import { TestData } from '@/interfaces/testData';

export async function getAllTestData(): Promise<TestData[]> {
    try {
        const result = await pool.query('SELECT * FROM test_data ORDER BY created_at DESC');
        return result.rows;
    } catch (error) {
        console.error('Error fetching test data:', error);
        throw new Error('Failed to fetch test data');
    }
}

export async function getTestDataById(id: number): Promise<TestData | null> {
    try {
        const result = await pool.query('SELECT * FROM test_data WHERE id = $1', [id]);
        return result.rows[0] || null;
    } catch (error) {
        console.error('Error fetching test data by id:', error);
        throw new Error('Failed to fetch test data');
    }
}

export async function createTestData(title: string, content: string): Promise<TestData> {
    try {
        const result = await pool.query(
            'INSERT INTO test_data (title, content, created_at, updated_at) VALUES ($1, $2, NOW(), NOW()) RETURNING *',
            [title, content]
        );
        return result.rows[0];
    } catch (error) {
        console.error('Error creating test data:', error);
        throw new Error('Failed to create test data');
    }
}
