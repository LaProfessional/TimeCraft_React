import pkg from 'pg';
import dotenv from 'dotenv';

dotenv.config();

const { Pool } = pkg;

const pool = new Pool({
    user: process.env.DB_USER || 'TopTTeDHbIu-DeJLbFuH4uk',
    host: process.env.DB_HOST || 'localhost',
    database: process.env.DB_NAME || 'tasks_react',
    password: process.env.DB_PASS || 'qwerty321',
    port: process.env.DB_PORT || 5432,
});
pool.connect().then(() => console.log('Connected to PostgreSQL'));

export default pool;