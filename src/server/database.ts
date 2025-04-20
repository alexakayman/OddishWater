import sqlite3 from "sqlite3";
import { Database } from "sqlite3";

interface VoteCount {
  water: number;
  cocaCola: number;
  redBull: number;
}

interface VoteRow {
  treatment: keyof VoteCount;
  count: number;
}

// Initialize database
export async function initializeDatabase(): Promise<Database> {
  const db = new sqlite3.Database("./votes.db");

  // Create votes table if it doesn't exist
  await new Promise<void>((resolve, reject) => {
    db.run(
      `
      CREATE TABLE IF NOT EXISTS votes (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        treatment TEXT NOT NULL,
        timestamp DATETIME DEFAULT CURRENT_TIMESTAMP
      )
    `,
      (err) => {
        if (err) reject(err);
        else resolve();
      }
    );
  });

  return db;
}

// Get current vote counts
export async function getVoteCounts(db: Database): Promise<VoteCount> {
  return new Promise((resolve, reject) => {
    db.all(
      `
      SELECT treatment, COUNT(*) as count
      FROM votes
      GROUP BY treatment
    `,
      (err, rows: VoteRow[]) => {
        if (err) {
          reject(err);
          return;
        }

        const counts: VoteCount = {
          water: 0,
          cocaCola: 0,
          redBull: 0,
        };

        rows.forEach((row) => {
          counts[row.treatment] = row.count;
        });

        resolve(counts);
      }
    );
  });
}

// Add a new vote
export async function addVote(
  db: Database,
  treatment: keyof VoteCount
): Promise<void> {
  return new Promise((resolve, reject) => {
    db.run("INSERT INTO votes (treatment) VALUES (?)", [treatment], (err) => {
      if (err) reject(err);
      else resolve();
    });
  });
}
