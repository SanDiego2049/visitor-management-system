import { Save, CheckCircle } from "lucide-react";

const SaveButton = ({ saveStatus }) => {
  return (
    <div className="mt-8 flex items-center justify-end">
      {saveStatus === "saved" && (
        <span className="mr-4 text-green-600 dark:text-green-400 flex items-center">
          <CheckCircle size={16} className="mr-1" />
          Settings saved successfully
        </span>
      )}
      <button
        type="submit"
        className={`flex items-center gap-2 px-4 py-2 bg-blue-500 dark:bg-blue-600 text-white rounded-lg hover:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-300 dark:focus:ring-blue-400 transition-colors duration-200 ${
          saveStatus === "saving" ? "opacity-70 cursor-not-allowed" : ""
        }`}
        disabled={saveStatus === "saving"}
      >
        {saveStatus === "saving" ? (
          <>
            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
            Saving...
          </>
        ) : (
          <>
            <Save size={18} />
            Save Changes
          </>
        )}
      </button>
    </div>
  );
};

export default SaveButton;
