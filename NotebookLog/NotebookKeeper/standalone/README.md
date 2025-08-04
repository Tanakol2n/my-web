# Standalone Notebook Management System

This folder contains standalone HTML files that can be opened directly in any web browser without requiring a development server or build process.

## Files Available

1. **`simple.html`** - Recommended version using vanilla JavaScript (no external dependencies)
2. **`index.html`** - React-based version (requires internet connection for CDN libraries)

## Recommended: Use simple.html

The `simple.html` file is recommended because it:
- Works completely offline
- No external dependencies 
- Faster loading
- More reliable across different browsers

## How to Use

1. **Simply open the file**: Double-click on `index.html` or right-click and select "Open with" your preferred web browser
2. **No installation required**: The application runs entirely in your browser
3. **Data persistence**: Your data is automatically saved to your browser's local storage

## Features

✅ **Complete Notebook Management**
- Add, edit, and delete notebook entries
- All the same fields as the original application

✅ **Search and Filter**
- Real-time search across all notebook fields
- Instant filtering of results

✅ **Status Tracking**
- Color-coded rows (Green: Active, Red: Inactive, Yellow: Damaged)
- Status badges with emoji indicators

✅ **Table Features**
- Sortable columns (click headers to sort)
- Pagination with configurable rows per page
- Responsive design that works on all screen sizes

✅ **Excel Export**  
- Export your data to Excel spreadsheet format
- Maintains all formatting and column structure

✅ **Data Persistence**
- Data is automatically saved to browser's local storage
- Your information persists between browser sessions
- No server required - everything runs locally

## Technical Details

**Built with:**
- Pure HTML, CSS, and JavaScript
- React (loaded from CDN)
- Tailwind CSS (loaded from CDN)
- Lucide icons (loaded from CDN)
- SheetJS (for Excel export)

**Browser Compatibility:**
- Chrome, Firefox, Safari, Edge (modern versions)
- Works offline after initial load

## Usage Instructions

### Adding Notebooks
1. Click the "Add Data" button
2. Fill in the required fields (marked with *)
3. Click "Save Notebook"

### Editing Notebooks
1. Click the edit icon (pencil) next to any row
2. Modify the information in the form
3. Click "Update Notebook"

### Deleting Notebooks
1. Click the delete icon (trash) next to any row
2. Confirm the deletion in the popup dialog

### Searching
- Type in the search box to filter notebooks
- Search works across all fields simultaneously

### Exporting to Excel
1. Click "Export to Excel" button
2. The file will automatically download
3. Open in Excel, Google Sheets, or any spreadsheet application

### Pagination
- Use the dropdown to change how many rows are shown per page
- Navigate between pages using the pagination controls at the bottom

## Data Storage

- All data is stored locally in your browser using LocalStorage
- Data persists between browser sessions
- Data is specific to the browser and device you're using
- To backup data, use the Excel export feature

## Troubleshooting

**If the application doesn't load:**
1. Make sure you have an internet connection (for loading external libraries)
2. Try a different web browser
3. Check if JavaScript is enabled in your browser

**If data is lost:**
- This can happen if browser storage is cleared
- Use the Excel export feature regularly to backup your data
- Consider bookmarking the page to avoid accidentally clearing data

**Performance:**
- The application can handle thousands of notebook entries
- Large amounts of data may slow down sorting and searching slightly

## Customization

The standalone version includes all the custom styling and features from the original:
- Light blue table headers
- Content-based column widths
- Remark column with text wrapping at 50 characters
- Department field as free text input
- All original color schemes and responsive design

This standalone version gives you the complete notebook management experience without any technical setup requirements!