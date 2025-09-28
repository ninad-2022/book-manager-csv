import { FileText } from "lucide-react";

const EmptyTable = () => {
  return (
    <div className="bg-white rounded-xl shadow-lg p-12 text-center">
      <FileText size={48} className="text-gray-400 mx-auto mb-4" />
      <h3 className="text-lg font-medium text-gray-900 mb-2">No Data Loaded</h3>
      <p className="text-gray-600 mb-6">
        Upload a CSV file to get started, or use the sample data that's already
        loaded.
      </p>
      <p className="text-sm text-gray-500">
        Expected CSV format: Title, Author, Genre, PublishedYear, ISBN
      </p>
    </div>
  );
};

export default EmptyTable;
