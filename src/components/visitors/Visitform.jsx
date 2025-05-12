import { useState, useCallback, useEffect } from "react";
import { QRCodeSVG } from "qrcode.react";

const VisitForm = ({ onSubmit, onQRGenerated, initialQRData = "" }) => {
  const [newCompany, setNewCompany] = useState("");
  const [newDate, setNewDate] = useState("");
  const [newTime, setNewTime] = useState("");
  const [purpose, setPurpose] = useState("");
  const [generatedQRData, setGeneratedQRData] = useState(initialQRData);
  const [showQR, setShowQR] = useState(!!initialQRData);

  // Use useCallback to prevent recreation of handler functions on each render
  const handleCompanyChange = useCallback((e) => {
    const value = e.target.value;
    const sentenceCase = value.charAt(0).toUpperCase() + value.slice(1);
    setNewCompany(sentenceCase);
  }, []);

  const handleDateChange = useCallback((e) => {
    setNewDate(e.target.value);
  }, []);

  const handleTimeChange = useCallback((e) => {
    setNewTime(e.target.value);
  }, []);

  const handlePurposeChange = useCallback((e) => {
    setPurpose(e.target.value);
  }, []);

  const handleSubmit = useCallback(
    (e) => {
      e.preventDefault();

      const newVisit = {
        id: crypto.randomUUID(),
        company: newCompany,
        date: newDate,
        time: newTime,
        purpose: purpose,
      };

      const success = onSubmit(newVisit);

      if (success) {
        const qrData = JSON.stringify({
          fullName: "User", // Will be replaced with actual user name by parent
          company: newCompany,
          date: newDate,
          time: newTime,
          purpose: purpose,
        });

        setGeneratedQRData(qrData);
        setShowQR(true);

        if (onQRGenerated) {
          onQRGenerated(qrData);
        }
      }
    },
    [newCompany, newDate, newTime, purpose, onSubmit, onQRGenerated]
  );

  // Use effect to update local QR data state when parent passes new data
  useEffect(() => {
    if (initialQRData) {
      setGeneratedQRData(initialQRData);
      setShowQR(true);
    }
  }, [initialQRData]);

  // Reset form function
  const handleReset = useCallback(() => {
    setNewCompany("");
    setNewDate("");
    setNewTime("");
    setPurpose("");
    setGeneratedQRData("");
    setShowQR(false);
  }, []);

  return (
    <form
      onSubmit={handleSubmit}
      className="grid grid-cols-1 md:grid-cols-2 gap-4"
    >
      <div className="space-y-4 md:col-span-1">
        <div>
          <label
            htmlFor="company"
            className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
          >
            Company Name
          </label>
          <input
            id="company"
            type="text"
            placeholder="Enter company name"
            value={newCompany}
            onChange={handleCompanyChange}
            required
            className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-gray-700 text-gray-800 dark:text-white transition-all duration-200"
          />
        </div>

        <div>
          <label
            htmlFor="purpose"
            className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
          >
            Purpose of Visit
          </label>
          <input
            id="purpose"
            type="text"
            value={purpose}
            placeholder="Brief description of your visit"
            onChange={handlePurposeChange}
            required
            className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-gray-700 text-gray-800 dark:text-white transition-all duration-200"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label
              htmlFor="date"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
            >
              Date
            </label>
            <input
              id="date"
              type="date"
              value={newDate}
              onChange={handleDateChange}
              required
              className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-gray-700 text-gray-800 dark:text-white transition-all duration-200"
            />
          </div>

          <div>
            <label
              htmlFor="time"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
            >
              Time
            </label>
            <input
              id="time"
              type="time"
              value={newTime}
              onChange={handleTimeChange}
              required
              className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-gray-700 text-gray-800 dark:text-white transition-all duration-200"
            />
          </div>
        </div>

        <div className="flex gap-2">
          <button
            type="submit"
            className="flex-1 bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white p-3 rounded-lg font-medium transition-all duration-200 focus:ring-4 focus:ring-blue-300 focus:ring-opacity-50 flex items-center justify-center"
          >
            <span>Generate QR & Add Visit</span>
          </button>

          {showQR && (
            <button
              type="button"
              onClick={handleReset}
              className="px-4 py-3 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-all duration-200"
            >
              New
            </button>
          )}
        </div>
      </div>

      <div className="flex flex-col items-center justify-center md:col-span-1">
        {showQR && generatedQRData ? (
          <div className="p-4 w-full max-w-xs mx-auto flex flex-col items-center">
            <QRCodeSVG
              value={generatedQRData}
              size={300}
              bgColor="#ffffff"
              fgColor="#000000"
              level="H"
              renderAs="svg"
            />
            <p className="text-center text-sm text-gray-600 dark:text-gray-400 mt-3">
              Show this at the front desk
            </p>
          </div>
        ) : (
          <div className="text-center flex flex-col items-center justify-center h-full">
            <div className="w-32 h-32 border-4 border-dashed border-gray-300 dark:border-gray-600 rounded-lg flex items-center justify-center mb-2">
              <p className="text-gray-400 dark:text-gray-500">QR Preview</p>
            </div>
            <p className="text-gray-500 dark:text-gray-400 text-sm">
              Fill the form to generate a QR code
            </p>
          </div>
        )}
      </div>
    </form>
  );
};

export default VisitForm;
