import {
  Upload,
  Download,
  RefreshCw,
  Edit3,
  FileText,
  Hash,
} from "lucide-react";

const Header = ({
  fileInputRef,
  handleFileUpload,
  downloadCSV,
  modifiedCount,
  data,
  fileName,
  resetAllEdits,
}) => {
  return (
    <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
      <div className="flex flex-col md:flex-row items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-800 flex items-center gap-2">
            <FileText className="text-blue-600" />
            CSV Book Manager
          </h1>
          <p className="text-gray-600 mt-1">
            Upload, edit, and manage your book database
          </p>
        </div>

        <div className="flex flex-wrap gap-3">
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileUpload}
            accept=".csv"
            className="hidden"
          />
          <button
            onClick={() => fileInputRef.current?.click()}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
          >
            <Upload size={16} />
            Upload CSV
          </button>

          {data.length > 0 && (
            <>
              <button
                onClick={downloadCSV}
                className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors flex items-center gap-2"
              >
                <Download size={16} />
                Download
              </button>

              <button
                onClick={resetAllEdits}
                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors flex items-center gap-2"
                disabled={modifiedCount === 0}
              >
                <RefreshCw size={16} />
                Reset Edits
              </button>
            </>
          )}
        </div>
      </div>

      {fileName && (
        <div className="mt-4 flex flex-wrap items-center gap-4 text-sm text-gray-600">
          <span className="flex items-center gap-1">
            <FileText size={14} />
            File: {fileName}
          </span>
          <span className="flex items-center gap-1">
            <Hash size={14} />
            Total: {data.length} records
          </span>
          {modifiedCount > 0 && (
            <span className="flex items-center gap-1 text-orange-600 font-medium">
              <Edit3 size={14} />
              Modified: {modifiedCount}
            </span>
          )}
        </div>
      )}
    </div>
  );
};

export default Header;
