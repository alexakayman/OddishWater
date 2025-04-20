import { createServer, IncomingMessage, ServerResponse } from "node:http";
import { runInference } from "./run_inference.js";
import { parse } from "node:url";

// Create a native HTTP server
const server = createServer((req: IncomingMessage, res: ServerResponse) => {
  // Set CORS headers
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  
  // Handle preflight OPTIONS request
  if (req.method === "OPTIONS") {
    res.writeHead(204);
    res.end();
    return;
  }

  const { pathname } = parse(req.url || "");

  // API endpoint to run inference
  if (pathname === "/api/run-inference" && req.method === "POST") {
    try {
      console.log("Inference requested from client");
      
      // Parse JSON body from request
      let body = "";
      req.on("data", (chunk) => {
        body += chunk.toString();
      });
      
      req.on("end", async () => {
        try {
          const result = await runInference();
          
          res.setHeader("Content-Type", "application/json");
          res.writeHead(200);
          res.end(JSON.stringify({ success: true, result }));
        } catch (error: any) {
          console.error("Inference error:", error);
          res.setHeader("Content-Type", "application/json");
          res.writeHead(500);
          res.end(JSON.stringify({ success: false, error: error.message }));
        }
      });
    } catch (error: any) {
      console.error("Inference error:", error);
      res.setHeader("Content-Type", "application/json");
      res.writeHead(500);
      res.end(JSON.stringify({ success: false, error: error.message }));
    }
  } else {
    // Handle 404 for unknown routes
    res.writeHead(404);
    res.end(JSON.stringify({ success: false, error: "Not found" }));
  }
});

// Initialize database
// Note: Database initialization removed since vote functionality is no longer needed

const PORT = process.env.PORT || 3001;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
