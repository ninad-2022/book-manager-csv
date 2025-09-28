import { useState, useEffect, useRef } from "react";
import Papa from "papaparse";
import Header from "./Header";
import EmptyTable from "./EmptyTable";
import Table from "./Table";
import { Search, Filter } from "lucide-react";
const CSVBookManager = () => {
  const [originalData, setOriginalData] = useState([]);
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [editingCell, setEditingCell] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterColumn, setFilterColumn] = useState("all");
  const [sortColumn, setSortColumn] = useState("");
  const [sortDirection, setSortDirection] = useState("asc");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(50);
  const [fileName, setFileName] = useState("");
  const fileInputRef = useRef(null);

  const columns = ["Title", "Author", "Genre", "PublishedYear", "ISBN"];

  const generateSampleData = () => {
    const genres = [
      "Fiction",
      "Non-Fiction",
      "Mystery",
      "Romance",
      "Sci-Fi",
      "Fantasy",
      "Biography",
      "History",
      "Thriller",
      "Poetry",
    ];
    const authors = [
      "Jane Smith",
      "John Doe",
      "Alice Johnson",
      "Bob Wilson",
      "Carol Brown",
      "David Lee",
      "Emma Davis",
      "Frank Miller",
      "Grace Taylor",
      "Henry Clark",
    ];
    const titlePrefixes = [
      "The",
      "A",
      "An",
      "My",
      "Our",
      "Great",
      "Lost",
      "Hidden",
      "Secret",
      "Ancient",
    ];
    const titleSuffixes = [
      "Journey",
      "Adventure",
      "Mystery",
      "Story",
      "Tale",
      "Chronicles",
      "Legacy",
      "Destiny",
      "Quest",
      "Discovery",
    ];

    const sampleData = [];
    for (let i = 1; i <= 10000; i++) {
      const title = `${
        titlePrefixes[Math.floor(Math.random() * titlePrefixes.length)]
      } ${
        titleSuffixes[Math.floor(Math.random() * titleSuffixes.length)]
      } ${i}`;
      const author = authors[Math.floor(Math.random() * authors.length)];
      const genre = genres[Math.floor(Math.random() * genres.length)];
      const year = Math.floor(Math.random() * 70) + 1954; // 1954-2023
      const isbn = `978-${Math.floor(Math.random() * 9000) + 1000}-${
        Math.floor(Math.random() * 9000) + 1000
      }-${Math.floor(Math.random() * 90) + 10}`;

      sampleData.push({
        id: i,
        Title: title,
        Author: author,
        Genre: genre,
        PublishedYear: year.toString(),
        ISBN: isbn,
        modified: false,
      });
    }
    return sampleData;
  };

  // Load sample data on component mount. you can comment this and upload csv file
  useEffect(() => {
    const sampleData = generateSampleData();
    setOriginalData(sampleData);
    setData(sampleData);
    setFilteredData(sampleData);
    setFileName("Sample Book Data (10,000 entries)");
  }, []);

  // Filter and search effect
  useEffect(() => {
    let filtered = [...data];
    // Apply search
    if (searchTerm) {
      filtered = filtered.filter((row) =>
        columns.some((col) =>
          row[col]?.toString().toLowerCase().includes(searchTerm.toLowerCase())
        )
      );
    }

    // Apply column filter
    if (filterColumn !== "all" && searchTerm) {
      filtered = data.filter((row) =>
        row[filterColumn]
          ?.toString()
          .toLowerCase()
          .includes(searchTerm.toLowerCase())
      );
    }

    // Apply sorting
    if (sortColumn) {
      filtered.sort((a, b) => {
        const aVal = a[sortColumn]?.toString().toLowerCase() || "";
        const bVal = b[sortColumn]?.toString().toLowerCase() || "";

        if (sortColumn === "PublishedYear") {
          const numA = parseInt(aVal) || 0;
          const numB = parseInt(bVal) || 0;
          return sortDirection === "asc" ? numA - numB : numB - numA;
        }

        if (sortDirection === "asc") {
          return aVal.localeCompare(bVal);
        } else {
          return bVal.localeCompare(aVal);
        }
      });
    }

    setFilteredData(filtered);
    setCurrentPage(1);
  }, [data, searchTerm, filterColumn, sortColumn, sortDirection]);

  // Pagination
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentData = filteredData.slice(startIndex, endIndex);

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (!file) return;

    setLoading(true);
    setFileName(file.name);

    Papa.parse(file, {
      complete: (results) => {
        try {
          const parsedData = results.data
            .filter((row) => row.some((cell) => cell.trim() !== ""))
            .map((row, index) => ({
              id: index + 1,
              Title: row[0]?.trim() || "",
              Author: row[1]?.trim() || "",
              Genre: row[2]?.trim() || "",
              PublishedYear: row[3]?.trim() || "",
              ISBN: row[4]?.trim() || "",
              modified: false,
            }))
            .filter((row) => row.Title || row.Author);

          setOriginalData(parsedData);
          setData(parsedData);
          setFilteredData(parsedData);
          setCurrentPage(1);
        } catch (error) {
          alert("Error parsing CSV file. Please check the format.");
        } finally {
          setLoading(false);
        }
      },
      header: false,
      skipEmptyLines: true,
      error: (error) => {
        alert("Error reading file: " + error.message);
        setLoading(false);
      },
    });
  };

  const handleCellEdit = (rowId, column, value) => {
    setData((prevData) =>
      prevData.map((row) =>
        row.id === rowId ? { ...row, [column]: value, modified: true } : row
      )
    );
    setEditingCell(null);
  };

  const handleSort = (column) => {
    if (sortColumn === column) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortColumn(column);
      setSortDirection("asc");
    }
  };

  const resetAllEdits = () => {
    if (window.confirm("Are you sure you want to reset all edits?")) {
      setData([...originalData]);
      setFilteredData([...originalData]);
    }
  };

  const downloadCSV = () => {
    const csvData = data.map((row) => [
      row.Title,
      row.Author,
      row.Genre,
      row.PublishedYear,
      row.ISBN,
    ]);

    csvData.unshift(["Title", "Author", "Genre", "PublishedYear", "ISBN"]);

    const csv = Papa.unparse(csvData);
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    const url = URL.createObjectURL(blob);

    link.setAttribute("href", url);
    link.setAttribute("download", fileName.replace(".csv", "") + "_edited.csv");
    link.style.visibility = "hidden";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const modifiedCount = data.filter((row) => row.modified).length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <Header
          fileInputRef={fileInputRef}
          handleFileUpload={handleFileUpload}
          downloadCSV={downloadCSV}
          modifiedCount={modifiedCount}
          data={data}
          resetAllEdits={resetAllEdits}
          fileName={fileName}
        />

        {/* Controls */}
        {data.length > 0 && (
          <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
            <div className="flex flex-col md:flex-row gap-4 items-center">
              <div className="flex-1 relative">
                <Search
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                  size={18}
                />
                <input
                  type="text"
                  placeholder="Search across all columns..."
                  value={searchTerm.searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div className="flex items-center gap-2">
                <Filter size={16} className="text-gray-500" />
                <select
                  value={filterColumn}
                  onChange={(e) => setFilterColumn(e.target.value)}
                  className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                >
                  <option value="all">All Columns</option>
                  {columns.map((col) => (
                    <option key={col} value={col}>
                      {col}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="mt-4 text-sm text-gray-600">
              Showing {currentData.length} of {filteredData.length} records
              {searchTerm && ` (filtered from ${data.length} total)`}
            </div>
          </div>
        )}

        {loading && (
          <div className="bg-white rounded-xl shadow-lg p-12 text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p className="text-gray-600">Processing your CSV file...</p>
          </div>
        )}

        {/* Data Table */}
        {data.length > 0 && !loading && (
          <Table
            handleSort={handleSort}
            sortColumn={sortColumn}
            sortDirection={sortDirection}
            currentData={currentData}
            columns={columns}
            setEditingCell={setEditingCell}
            editingCell={editingCell}
            handleCellEdit={handleCellEdit}
            originalData={originalData}
            totalPages={totalPages}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
          />
        )}

        {/* Empty State */}
        {data.length === 0 && !loading && <EmptyTable />}
      </div>
    </div>
  );
};

export default CSVBookManager;
