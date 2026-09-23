import express from 'express'
import cors from 'cors'
import 'dotenv/config'
import { pool } from "./config/database.js";

const app = express()
const PORT = process.env.PORT || 5000

app.use(cors());
app.use(express.json());

app.get("/health/database", async (req, res) => {
  try {
    const result = await pool.query("SELECT NOW()");

    res.status(200).json({
      status: "ok",
      databaseTime: result.rows[0].now
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      status: "error",
      message: "Database connection failed"
    });
  }
});

app.get("/health", (req, res) => {
    res.status(200).json({
        status: "ok",
        message: "Training Center API is running"
    });
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});