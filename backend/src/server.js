import express from 'express';
import path from 'path';
import pkg from 'pg';

const { Pool } = pkg;

const pool = new Pool({
	user: 'TopTTeDHbIu-DeJLbFuH4uk',
	host: 'localhost',
	database: 'tasks_react',
	password: 'qwerty321',
	port: 5432,
});
pool.connect().then(() => console.log('Connected to PostgreSQL and table "tasks_react" is accessible'));

const PORT = 5000;
const app = express();

app.post('/tasks', async (req, response) => {
	console.log(req.body.task);
});

app.listen(PORT, () => console.log(`SERVER STARTED ON PORT ${ PORT }`));