import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";
import { initializeDatabase, getVoteCounts, addVote } from "./database";
import cors from "cors";
import { Database } from "sqlite3";

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

app.use(cors());
app.use(express.json());

// Initialize database
let db: Database | null = null;
initializeDatabase().then((database) => {
  db = database;
});

// Socket.IO connection handling
io.on("connection", async (socket) => {
  console.log("Client connected");

  // Send initial vote counts to new client
  if (db) {
    const counts = await getVoteCounts(db);
    socket.emit("voteCounts", counts);
  }

  // Handle vote events
  socket.on("vote", async (treatment: "water" | "cocaCola" | "redBull") => {
    if (db) {
      try {
        await addVote(db, treatment);
        const counts = await getVoteCounts(db);
        io.emit("voteCounts", counts);
      } catch (error) {
        console.error("Error processing vote:", error);
      }
    }
  });

  socket.on("disconnect", () => {
    console.log("Client disconnected");
  });
});

const PORT = process.env.PORT || 3001;
httpServer.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
