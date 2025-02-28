import express from 'express';
import path from 'path';
// import pkg from 'pg';
// import cookieParser from 'cookie-parser'

const PORT = 5000;
const app = express();


app.listen(PORT, () => console.log(`SERVER STARTED ON PORT ${ PORT }`));