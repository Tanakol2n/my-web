import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertNotebookSchema } from "@shared/schema";
import { z } from "zod";

export async function registerRoutes(app: Express): Promise<Server> {
  // Get all notebooks
  app.get("/api/notebooks", async (req, res) => {
    try {
      const notebooks = await storage.getAllNotebooks();
      res.json(notebooks);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch notebooks" });
    }
  });

  // Search notebooks
  app.get("/api/notebooks/search", async (req, res) => {
    try {
      const query = req.query.q as string;
      if (!query) {
        return res.status(400).json({ message: "Search query is required" });
      }
      const notebooks = await storage.searchNotebooks(query);
      res.json(notebooks);
    } catch (error) {
      res.status(500).json({ message: "Failed to search notebooks" });
    }
  });

  // Get single notebook
  app.get("/api/notebooks/:id", async (req, res) => {
    try {
      const notebook = await storage.getNotebook(req.params.id);
      if (!notebook) {
        return res.status(404).json({ message: "Notebook not found" });
      }
      res.json(notebook);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch notebook" });
    }
  });

  // Create notebook
  app.post("/api/notebooks", async (req, res) => {
    try {
      const validatedData = insertNotebookSchema.parse(req.body);
      const notebook = await storage.createNotebook(validatedData);
      res.status(201).json(notebook);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Validation error", errors: error.errors });
      }
      res.status(500).json({ message: "Failed to create notebook" });
    }
  });

  // Update notebook
  app.put("/api/notebooks/:id", async (req, res) => {
    try {
      const validatedData = insertNotebookSchema.partial().parse(req.body);
      const notebook = await storage.updateNotebook(req.params.id, validatedData);
      if (!notebook) {
        return res.status(404).json({ message: "Notebook not found" });
      }
      res.json(notebook);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Validation error", errors: error.errors });
      }
      res.status(500).json({ message: "Failed to update notebook" });
    }
  });

  // Delete notebook
  app.delete("/api/notebooks/:id", async (req, res) => {
    try {
      const success = await storage.deleteNotebook(req.params.id);
      if (!success) {
        return res.status(404).json({ message: "Notebook not found" });
      }
      res.json({ message: "Notebook deleted successfully" });
    } catch (error) {
      res.status(500).json({ message: "Failed to delete notebook" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
