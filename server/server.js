
import express from "express";
import "dotenv/config";
import cors from "cors";
import { clerkMiddleware } from "@clerk/express";
import { serve } from "inngest/express";
import { inngest, functions } from "./inngest/index.js";

const app = express();

app.use(cors());
app.use(express.json());

// Public health-check route
app.get("/", (req, res) => {
    res.send("server is live");
});

// Inngest endpoint
// Register before Clerk middleware
app.use("/api/inngest", serve({ client: inngest, functions }));

// Clerk middleware for the remaining routes
app.use(clerkMiddleware());

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`server running on port ${PORT}`);
});

