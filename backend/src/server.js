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
    const {
        search: search,
        field: field,
        order: order,
    } = req.query;

    if (search) {
        const queryString = `
            SELECT 
                id,
                creation_datetime,
                title,
                description,
                start_datetime,
                end_datetime
            FROM tasks
            WHERE title ILIKE $1
            ORDER BY title ASC
            ;`;

        const searchResults = await pool.query(queryString, [ search ]);
        const tasks = searchResults.rows;
        const res = tasks.map(task => convertToCamelCase(task));

        return response.status(200).json(res);
    }

    if (field || order) {
        const querySort = `
            SELECT id,
                   creation_datetime,
                   title,
                   description,
                   start_datetime,
                   end_datetime
            FROM tasks
            ORDER BY ${ field } ${ order }
            ;`;

        const sortedValues = await pool.query(querySort);
        const tasks = sortedValues.rows;
        const res = tasks.map(task => convertToCamelCase(task));

        return response.status(200).json(res);
    }

    const getTasks = `
        SELECT id,
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
    } = req.body.task;
    const creationDatetime = new Date().toISOString();

    const createTask = `
        INSERT INTO tasks (creation_datetime,
                           title,
                           description,
                           start_datetime,
                           end_datetime)
        VALUES ($1,
                $2,
                $3,
                $4,
                $5) RETURNING 
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

app.put('/tasks', async (req, response) => {
    const taskId = req.query.taskId;
    const {
        title,
        description,
        startDatetime,
        endDatetime,
    } = req.body.task;

    const updateTask = `
        UPDATE tasks
        SET title          = $1,
            description    = $2,
            start_datetime = $3,
            end_datetime   = $4
        WHERE id = $5 RETURNING *
        ;`;

    const updateTaskRes = await pool.query(updateTask, [
        title,
        description,
        startDatetime,
        endDatetime,
        taskId
    ]);
    const task = updateTaskRes.rows;
    const res = task.map(task => convertToCamelCase(task));
    response.status(200).json(res[0]);
});

app.delete('/tasks', async (req, response) => {
    const selectedTaskIds = req.body.selectedTaskIds;
    const numericIds = selectedTaskIds.map(taskId => parseInt(taskId));

    const query = `
        DELETE
        FROM tasks
        WHERE id = ANY ($1)
        ;`;

    await pool.query(query, [ numericIds ]);
    response.sendStatus(200);
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