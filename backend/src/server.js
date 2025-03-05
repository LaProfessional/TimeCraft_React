import express from 'express';
import pkg from 'pg';
import cors from 'cors';

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

app.use(cors({ origin: 'http://localhost:3000' }));
app.use(express.json());

app.get('/tasks', async (req, response) => {
	const getTasks = `
		SELECT 
			id,
			creation_datetime,
			title,
			description,
			start_datetime,
			end_datetime
        FROM tasks
	;`;

	const getTasksRes = await pool.query(getTasks);
	const tasks = getTasksRes.rows;

	const res = tasks.map(task => convertToCamelCase(task));
	response.status(200).json(res);
});

app.post('/tasks', async (req, response) => {
	const {
		title,
		description,
		startDatetime,
		endDatetime,
	} = req.body.newTask;
	const creationDatetime = new Date().toISOString();

	const createTask = `
		INSERT INTO tasks (
			creation_datetime,
		    title,
		    description,
		    start_datetime,
		    end_datetime
		)
		VALUES (
        	$1,
        	$2,
        	$3,
        	$4,
        	$5     
		) RETURNING 
		id,
		creation_datetime,
		title,
		description,
		start_datetime,
		end_datetime
	;`;

	const creationTaskRes = await pool.query(createTask, [
		creationDatetime,
		title,
		description,
		startDatetime,
		endDatetime
	]);

	const task = creationTaskRes.rows;
	const res = task.map(task => convertToCamelCase(task));

	response.status(200).json(res[0]);
});

const convertToCamelCase = dataObject => {
	const transformedObject = {};
	for (let originalKey in dataObject) {
		const camelCaseKey = originalKey.replace(/_([a-z])/g, (_, letter) => letter.toUpperCase());
		transformedObject[camelCaseKey] = dataObject[originalKey];
	}
	return transformedObject;
};

app.listen(PORT, () => console.log(`SERVER STARTED ON PORT ${ PORT }`));