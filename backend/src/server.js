import pool from '../src/config/db.js';
import app from './app.js';
import authRoutes from './auth.js';

app.use('/auth', authRoutes);

app.get('/tasks', async (req, response) => {
    const {
        search,
        field,
        order,
        portionLength,
    } = req.query;
    const limit = 20;

    const getTasksCount = async () => {
        let countQuery = `SELECT COUNT(*)
                          FROM tasks`;
        let queryParams = [];

        if (search) {
            countQuery += ` WHERE (title ILIKE $1 OR description ILIKE $1)`;
            queryParams.push(`%${ search }%`);
        }

        const countRes = await pool.query(countQuery, queryParams);
        return countRes.rows[0].count;
    };

    if (search) {
        const queryString = `
            SELECT id,
                   creation_datetime,
                   title,
                   description,
                   start_datetime,
                   end_datetime
            FROM tasks
            WHERE (title ILIKE $1 OR description ILIKE $1)
                LIMIT $2
            OFFSET $3
            ;`;

        const tasksCount = await getTasksCount();

        const searchResults = await pool.query(queryString, [ `%${ search }%`, limit, portionLength ]);
        const tasks = searchResults.rows;
        const res = tasks.map(task => convertToCamelCase(task));

        return response.status(200).json({ tasks: res, portionLength: portionLength, tasksCount: tasksCount });
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
            LIMIT $1
            OFFSET $2
            ;`;

        const tasksCount = await getTasksCount();

        const sortedValues = await pool.query(querySort, [ limit, portionLength ]);
        const tasks = sortedValues.rows;
        const res = tasks.map(task => convertToCamelCase(task));

        return response.status(200).json({ tasks: res, portionLength: portionLength, tasksCount: tasksCount });
    }

    const getTasks = `
        SELECT id,
               creation_datetime,
               title,
               description,
               start_datetime,
               end_datetime
        FROM tasks LIMIT $1
        OFFSET $2
        ;`;

    const tasksCount = await getTasksCount();

    const getTasksRes = await pool.query(getTasks, [ limit, portionLength ]);
    const tasks = getTasksRes.rows;
    const res = tasks.map(task => convertToCamelCase(task));

    response.status(200).json({ tasks: res, portionLength: portionLength, tasksCount: tasksCount });
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
    const { selectedTaskIds, isDeleteAllTasks } = req.body;

    let query;
    let params;

    if (isDeleteAllTasks) {
        query = `DELETE FROM tasks;`;
        params = [];
    } else {
        const numericIds = selectedTaskIds.map(taskId => parseInt(taskId));
        query = `DELETE
                 FROM tasks
                 WHERE id = ANY ($1);`;
        params = [ numericIds ];
    }

    await pool.query(query, params);
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