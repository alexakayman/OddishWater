import express from "express";
import { createServer } from "http";
import cors from "cors";

const app = express();
const httpServer = createServer(app);

app.use(cors());
app.use(express.json());

// Initialize database
// Note: Database initialization removed since vote functionality is no longer needed

const PORT = process.env.PORT || 3001;
httpServer.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
