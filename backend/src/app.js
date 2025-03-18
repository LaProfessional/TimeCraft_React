import express from "express";
import cors from "cors";

const app = express();
app.use(express.json());
app.use(cors({ origin: 'http://localhost:3000' }));

app.listen(5000, () => console.log("Server started on port 5000"));

export default app;