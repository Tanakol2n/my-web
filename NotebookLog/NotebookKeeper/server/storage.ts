import { type Notebook, type InsertNotebook } from "@shared/schema";
import { randomUUID } from "crypto";

export interface IStorage {
  getNotebook(id: string): Promise<Notebook | undefined>;
  getAllNotebooks(): Promise<Notebook[]>;
  createNotebook(notebook: InsertNotebook): Promise<Notebook>;
  updateNotebook(id: string, notebook: Partial<InsertNotebook>): Promise<Notebook | undefined>;
  deleteNotebook(id: string): Promise<boolean>;
  searchNotebooks(query: string): Promise<Notebook[]>;
}

export class MemStorage implements IStorage {
  private notebooks: Map<string, Notebook>;
  private indexCounter: number = 1;

  constructor() {
    this.notebooks = new Map();
  }

  async getNotebook(id: string): Promise<Notebook | undefined> {
    return this.notebooks.get(id);
  }

  async getAllNotebooks(): Promise<Notebook[]> {
    return Array.from(this.notebooks.values()).sort((a, b) => 
      a.assetCode.localeCompare(b.assetCode)
    );
  }

  async createNotebook(insertNotebook: InsertNotebook): Promise<Notebook> {
    const id = randomUUID();
    const notebook: Notebook = { 
      ...insertNotebook, 
      id,
      userName: insertNotebook.userName || null,
      deviceNumber: insertNotebook.deviceNumber || null,
      purchasedUnder: insertNotebook.purchasedUnder || null,
      dueDate: insertNotebook.dueDate || null,
      remark: insertNotebook.remark || null
    };
    this.notebooks.set(id, notebook);
    return notebook;
  }

  async updateNotebook(id: string, updates: Partial<InsertNotebook>): Promise<Notebook | undefined> {
    const existing = this.notebooks.get(id);
    if (!existing) return undefined;
    
    const updated: Notebook = { ...existing, ...updates };
    this.notebooks.set(id, updated);
    return updated;
  }

  async deleteNotebook(id: string): Promise<boolean> {
    return this.notebooks.delete(id);
  }

  async searchNotebooks(query: string): Promise<Notebook[]> {
    const lowercaseQuery = query.toLowerCase();
    return Array.from(this.notebooks.values()).filter(notebook => 
      Object.values(notebook).some(value => 
        value?.toString().toLowerCase().includes(lowercaseQuery)
      )
    );
  }
}

export const storage = new MemStorage();
