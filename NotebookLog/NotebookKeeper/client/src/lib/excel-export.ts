import { utils, writeFile } from "xlsx";
import { type Notebook } from "@shared/schema";

export function exportToExcel(notebooks: Notebook[], filename: string) {
  // Prepare data for export
  const exportData = notebooks.map((notebook, index) => ({
    "No.": index + 1,
    "Asset Code": notebook.assetCode,
    "Model": notebook.model,
    "Serial Number": notebook.serialNumber,
    "Location": notebook.location,
    "User Name": notebook.userName || "",
    "Department": notebook.department,
    "Status": notebook.status,
    "Device Number": notebook.deviceNumber || "",
    "Purchased Under": notebook.purchasedUnder || "",
    "5-Year Due Date": notebook.dueDate || "",
    "Remark": notebook.remark || "",
  }));

  // Create workbook and worksheet
  const workbook = utils.book_new();
  const worksheet = utils.json_to_sheet(exportData);

  // Set column widths
  const columnWidths = [
    { wch: 5 },   // No.
    { wch: 15 },  // Asset Code
    { wch: 20 },  // Model
    { wch: 18 },  // Serial Number
    { wch: 25 },  // Location
    { wch: 15 },  // User Name
    { wch: 20 },  // Department
    { wch: 10 },  // Status
    { wch: 15 },  // Device Number
    { wch: 18 },  // Purchased Under
    { wch: 15 },  // 5-Year Due Date
    { wch: 40 },  // Remark
  ];
  worksheet["!cols"] = columnWidths;

  // Add worksheet to workbook
  utils.book_append_sheet(workbook, worksheet, "Notebook Inventory");

  // Save file
  writeFile(workbook, filename);
}
