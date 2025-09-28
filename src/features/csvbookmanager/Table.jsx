import {
  X,
  ChevronLeft,
  ChevronRight,
  SortAsc,
  SortDesc,
} from "lucide-react";
const Table = ({
  columns=[],
  handleSort,
  sortColumn,
  sortDirection,
  currentData=[],
  setEditingCell,
  editingCell,
  handleCellEdit,
  originalData=[],
  totalPages,
  currentPage,
  setCurrentPage,
}) => {
  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              {columns.map((column) => (
                <th
                  key={column}
                  className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100 transition-colors"
                  onClick={() => handleSort(column)}
                >
                  <div className="flex items-center gap-2">
                    {column}
                    {sortColumn === column &&
                      (sortDirection === "asc" ? (
                        <SortAsc size={14} />
                      ) : (
                        <SortDesc size={14} />
                      ))}
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {currentData.map((row) => (
              <tr
                key={row.id}
                className={`hover:bg-gray-50 ${
                  row.modified
                    ? "bg-yellow-50 border-l-4 border-l-yellow-400"
                    : ""
                }`}
              >
                {columns.map((column) => (
                  <td
                    key={`${row.id}-${column}`}
                    className="px-4 py-3 whitespace-nowrap text-sm text-gray-900 cursor-pointer hover:bg-blue-50 transition-colors"
                    onClick={() => setEditingCell({ rowId: row.id, column })}
                  >
                    {editingCell?.rowId === row.id &&
                    editingCell?.column === column ? (
                      <div className="flex items-center gap-2">
                        <input
                          type="text"
                          defaultValue={row[column]}
                          onBlur={(e) =>
                            handleCellEdit(row.id, column, e.target.value)
                          }
                          onKeyDown={(e) => {
                            if (e.key === "Enter") {
                              handleCellEdit(row.id, column, e.target.value);
                            } else if (e.key === "Escape") {
                              setEditingCell(null);
                            }
                          }}
                          autoFocus
                          className="w-full px-2 py-1 border border-blue-500 rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
                        />
                        <button
                          onClick={() => setEditingCell(null)}
                          className="text-gray-400 hover:text-gray-600"
                        >
                          <X size={14} />
                        </button>
                      </div>
                    ) : (
                      <div
                        className={`${
                          row.modified &&
                          originalData.find((orig) => orig.id === row.id)?.[
                            column
                          ] !== row[column]
                            ? "bg-yellow-200 px-2 py-1 rounded"
                            : ""
                        }`}
                      >
                        {row[column]}
                      </div>
                    )}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="bg-gray-50 px-4 py-3 flex items-center justify-between border-t border-gray-200">
          <div className="text-sm text-gray-700">
            Page {currentPage} of {totalPages}
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
              disabled={currentPage === 1}
              className="px-3 py-1 text-sm bg-white border border-gray-300 rounded hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-1"
            >
              <ChevronLeft size={14} />
              Previous
            </button>
            <button
              onClick={() =>
                setCurrentPage(Math.min(totalPages, currentPage + 1))
              }
              disabled={currentPage === totalPages}
              className="px-3 py-1 text-sm bg-white border border-gray-300 rounded hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-1"
            >
              Next
              <ChevronRight size={14} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Table;
