const functions = require('firebase-functions');
const express = require('express');
const cors = require('cors');

const app = express();

// Enable CORS for all routes
app.use(cors({ origin: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Simple in-memory storage for Firebase
let notebooks = [
  {
    id: 1,
    assetCode: "00OE6200872",
    model: "ThinkPad T14 Gen 3",
    serialNumber: "PC2F1234",
    location: "IT Department - Floor 3",
    userName: "John Smith",
    department: "Information Technology",
    status: "active",
    deviceNumber: "DEV-001",
    purchasedUnder: "IT Budget 2024",
    dueDate: "2029-01-15",
    remark: "Primary development laptop with Windows 11 Pro and development tools installed"
  },
  {
    id: 2,
    assetCode: "00OE6200873",
    model: "Dell Latitude 5520",
    serialNumber: "DL5520001",
    location: "HR Department - Floor 2",
    userName: "Jane Doe",
    department: "Human Resources",
    status: "active",
    deviceNumber: "DEV-002",
    purchasedUnder: "HR Budget 2024",
    dueDate: "2029-02-20",
    remark: "Standard office laptop for HR administrative tasks"
  },
  {
    id: 3,
    assetCode: "00OE6200874",
    model: "MacBook Pro 14",
    serialNumber: "MBA14001",
    location: "Design Department - Floor 4",
    userName: "",
    department: "Design Team",
    status: "inactive",
    deviceNumber: "DEV-003",
    purchasedUnder: "Design Budget 2023",
    dueDate: "2028-12-10",
    remark: "High-performance laptop for graphic design work, currently being serviced"
  }
];
let idCounter = 4;

// API Routes
app.get('/api/notebooks', (req, res) => {
  res.json(notebooks);
});

app.post('/api/notebooks', (req, res) => {
  const notebook = { ...req.body, id: idCounter++ };
  notebooks.push(notebook);
  res.status(201).json(notebook);
});

app.patch('/api/notebooks/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const index = notebooks.findIndex(n => n.id === id);
  if (index === -1) {
    return res.status(404).json({ error: 'Notebook not found' });
  }
  notebooks[index] = { ...notebooks[index], ...req.body };
  res.json(notebooks[index]);
});

app.delete('/api/notebooks/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const index = notebooks.findIndex(n => n.id === id);
  if (index === -1) {
    return res.status(404).json({ error: 'Notebook not found' });
  }
  notebooks.splice(index, 1);
  res.status(204).send();
});

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Export as Firebase Function
exports.api = functions.https.onRequest(app);