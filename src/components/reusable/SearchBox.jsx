import { Search } from "lucide-react";

const SearchBox = ({ searchQuery, setSearchQuery }) => {
  return (
    <div className="relative">
      <input
        type="text"
        placeholder="Search visitors..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="pl-10 pr-4 py-2 border dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-gray-700 text-gray-800 dark:text-white transition-all duration-200 w-full md:w-64"
      />
      <Search
        className="absolute left-3 top-2.5 text-gray-400 dark:text-gray-500"
        size={18}
      />
    </div>
  );
};

export default SearchBox;
