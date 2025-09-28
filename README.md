# 📚 CSV Book Manager

A powerful React web application for managing large CSV files containing book data. Upload, view, edit, filter, sort, and download your book database with ease.

![CSV Book Manager](https://img.shields.io/badge/React-18.2.0-blue?style=flat-square&logo=react)
![Papa Parse](https://img.shields.io/badge/Papa%20Parse-5.4.1-green?style=flat-square)
![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-3.3.0-blue?style=flat-square&logo=tailwindcss)
![Lucide React](https://img.shields.io/badge/Lucide%20React-0.263.1-purple?style=flat-square)

## ✨ Features

### Core Functionality
- 📁 **Large CSV Upload** - Handle CSV files with 10,000+ rows
- 👁️ **View & Edit Records** - Inline editing with real-time updates
- 🔍 **Advanced Filtering** - Search across all columns or filter by specific columns
- 📥 **Download Edited CSV** - Export modified data as a new CSV file

### Bonus Features
- 🔄 **Reset All Edits** - Revert to original uploaded data with confirmation
- 🎨 **Visual Highlighting** - Modified cells and rows are highlighted
- 🔤 **Column Sorting** - Sort by any column (ascending/descending)
- 📊 **Data Statistics** - Row count, page count, and modification tracking
- ⏳ **Loading Feedback** - Progress indicators during file processing
- 📱 **Responsive Design** - Works perfectly on mobile, tablet, and desktop

### Enhanced User Experience
- 🚀 **Sample Data** - Pre-loaded with 10,000 book entries for immediate testing
- 📄 **Pagination** - Efficient handling of large datasets (50 items per page)
- ⌨️ **Keyboard Shortcuts** - Enter to save, Escape to cancel edits
- 🎭 **Modern UI** - Beautiful gradient design with glassmorphism effects
- 🔒 **Data Safety** - All data stored in memory, no browser storage dependencies

## 📋 CSV Format

The application expects CSV files with the following structure:

```csv
Title,Author,Genre,PublishedYear,ISBN
The Great Adventure,Jane Smith,Fiction,2020,978-1234-5678-90
Mystery of the Lost City,John Doe,Mystery,2019,978-2345-6789-01
...
```

**Required Columns:**
- `Title` - Book title
- `Author` - Author name
- `Genre` - Book genre/category
- `PublishedYear` - Year of publication
- `ISBN` - International Standard Book Number

## 🚀 Quick Start

### Prerequisites

Make sure you have the following installed:
- **Node.js** (version 20.0 or higher)
- **npm** (version 7.0 or higher) or **yarn**

### Installation

1. **Clone or download the project**
   ```bash
   # If using Git
   git clone <repository-url>
   cd csv-book-manager
   
   # Or create a new React project
   npx create-react-app csv-book-manager
   cd csv-book-manager
   ```

2. **Install dependencies**
   ```bash
   npm install papaparse lucide-react
   
   # If you're using yarn
   yarn add papaparse lucide-react
   ```

3. **Install Tailwind CSS**
   ```bash
   npm install -D tailwindcss postcss autoprefixer
   npx tailwindcss init -p
   ```

4. **Configure Tailwind CSS**
   
   Update `tailwind.config.js`:
   ```javascript
   /** @type {import('tailwindcss').Config} */
   module.exports = {
     content: [
       "./src/**/*.{js,jsx,ts,tsx}",
     ],
     theme: {
       extend: {},
     },
     plugins: [],
   }
   ```

   Update `src/index.css`:
   ```css
   @import tailwind;
   ```

5. **Replace the default App component**
   
   Copy the CSV Book Manager component code into `src/App.js`

6. **Start the development server**
   ```bash
   npm start
   
   # Or with yarn
   yarn start
   ```

7. **Open your browser**
   
   Navigate to `http://localhost:5173` to see the application.

## 📦Main Dependencies

```json
{
  "dependencies": {
    "react": "^19.1.1",
    "react-dom": "^19.1.1",
    "papaparse": "^5.5.3",
    "lucide-react": "^0.544.0"
  },
}
```

### Dependency Overview

- **Papa Parse** - Robust CSV parsing and generation
- **Lucide React** - Beautiful, customizable icons
- **Tailwind CSS** - Utility-first CSS framework for styling

## 🎯 How to Use

### 1. Getting Started
- The app loads with 10,000 sample book entries automatically
- Or upload your own CSV file using the "Upload CSV" button

### 2. Viewing Data
- Browse through paginated data (50 items per page)
- Use pagination controls at the bottom to navigate
- View total record count and current page information

### 3. Editing Records
- **Click any cell** to enter edit mode
- **Type** to modify the value
- **Press Enter** to save changes
- **Press Escape** to cancel editing
- **Click the X button** to cancel editing

### 4. Searching and Filtering
- **Search Box**: Type to search across all columns
- **Column Filter**: Select a specific column to search within
- **Real-time Results**: See filtered results instantly

### 5. Sorting Data
- **Click column headers** to sort data
- **First click**: Sort ascending
- **Second click**: Sort descending
- **Visual indicator**: Arrow shows current sort direction

### 6. Managing Changes
- **Visual Feedback**: Modified rows have yellow highlighting
- **Modification Counter**: See how many records have been edited
- **Reset Button**: Revert all changes with confirmation dialog

### 7. Exporting Data
- **Download Button**: Export edited data as CSV
- **Filename**: Automatically appends "_edited" to original filename
- **Format**: Maintains original CSV structure

## 🔧 Customization

### Modifying Items Per Page
```javascript
const [itemsPerPage] = useState(50); // Change to your preferred number
```

### Adding New Columns
```javascript
const columns = ['Title', 'Author', 'Genre', 'PublishedYear', 'ISBN', 'NewColumn'];
```

### Custom Sample Data
Modify the `generateSampleData()` function to create your own sample dataset.

## 🐛 Troubleshooting

### Common Issues

1. **CSV Upload Not Working**
   - Check that your CSV has the correct column headers
   - Ensure the file is properly formatted
   - Try with a smaller file first

2. **Styling Issues**
   - Make sure Tailwind CSS is properly configured
   - Check that `@tailwind` directives are in your CSS file
   - Restart the development server after Tailwind setup

3. **Performance Issues**
   - Reduce `itemsPerPage` for very large datasets
   - Check browser console for any JavaScript errors
   - Ensure you're using a modern browser

4. **Icons Not Showing**
   - Verify `lucide-react` is installed correctly
   - Check import statements in the component

### Error Messages

- **"Error parsing CSV file"**: Check your CSV format and column structure
- **"Error reading file"**: Try a different CSV file or check file permissions
- **Component won't load**: Check console for dependency issues

## 🏗️ Project Structure

```
csv-book-manager/
├── public/
│   ├── index.html
│   └── favicon.ico
├── src/
│   ├── App.js          # Main CSV Book Manager component
│   ├── index.js        # React entry point
│   ├── index.css       # Tailwind CSS imports
│   └── App.css         # Additional styles (if needed)
├── package.json        # Project dependencies and scripts
├── tailwind.config.js  # Tailwind CSS configuration
├── postcss.config.js   # PostCSS configuration
└── README.md          # This file
```

Contributions are welcome! Please feel free to submit a Pull Request. For major changes, please open an issue first to discuss what you would like to change.

### Development Setup
1. Fork the repository
2. Create a feature branch: `git checkout -b feature-name`
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 🙏 Acknowledgments

- **Papa Parse** - For excellent CSV parsing capabilities
- **Lucide** - For beautiful, consistent icons
- **Tailwind CSS** - For rapid UI development
- **React** - For the powerful component framework

---

**Happy CSV managing!** 🎉