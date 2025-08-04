import { sql } from "drizzle-orm";
import { pgTable, text, varchar, date } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const notebooks = pgTable("notebooks", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  assetCode: text("asset_code").notNull(),
  model: text("model").notNull(),
  serialNumber: text("serial_number").notNull(),
  location: text("location").notNull(),
  userName: text("user_name"),
  department: text("department").notNull(),
  status: text("status").notNull(), // 'active', 'inactive', 'damaged'
  deviceNumber: text("device_number"),
  purchasedUnder: text("purchased_under"),
  dueDate: date("due_date"),
  remark: text("remark"),
});

export const insertNotebookSchema = createInsertSchema(notebooks).omit({
  id: true,
});

export type InsertNotebook = z.infer<typeof insertNotebookSchema>;
export type Notebook = typeof notebooks.$inferSelect;
