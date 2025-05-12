import { Key, Clock, Shield } from "lucide-react";
import SectionHeading from "../../reusable/SectionHeading";

const SecuritySettings = ({
  securityData,
  handleInputChange,
  handleCheckboxChange,
}) => {
  return (
    <div>
      <h2 className="text-xl font-semibold mb-6 text-gray-800 dark:text-white">
        Security Settings
      </h2>

      <div className="space-y-6">
        <div className="border-b border-gray-200 dark:border-gray-700 pb-6">
          <SectionHeading
            icon={<Key size={18} />}
            title="Password & Authentication"
          />

          <div className="mb-4">
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
              Password last changed:{" "}
              <span className="font-medium text-gray-800 dark:text-gray-200">
                {securityData.passwordLastChanged}
              </span>
            </p>
            <button
              type="button"
              className="px-4 py-2 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-200 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 text-sm font-medium transition-colors duration-200"
            >
              Change Password
            </button>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-medium text-gray-800 dark:text-white">
                Two-Factor Authentication
              </h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Add an extra layer of security to your account
              </p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                className="sr-only peer"
                checked={securityData.twoFactorAuth}
                onChange={() =>
                  handleCheckboxChange("security", "twoFactorAuth")
                }
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-500 dark:peer-checked:bg-blue-600 dark:bg-gray-600"></div>
            </label>
          </div>
        </div>

        <div className="border-b border-gray-200 dark:border-gray-700 pb-6">
          <SectionHeading icon={<Clock size={18} />} title="Session Settings" />

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Session Timeout (minutes)
            </label>
            <select
              value={securityData.sessionTimeout}
              onChange={(e) =>
                handleInputChange("security", "sessionTimeout", e.target.value)
              }
              className="w-full md:w-1/3 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 bg-white dark:bg-gray-700 text-gray-800 dark:text-white"
            >
              <option value="15">15 minutes</option>
              <option value="30">30 minutes</option>
              <option value="60">60 minutes</option>
              <option value="120">2 hours</option>
              <option value="240">4 hours</option>
            </select>
          </div>

          <div>
            <button
              type="button"
              className="px-4 py-2 bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300 rounded-lg hover:bg-red-200 dark:hover:bg-red-800 text-sm font-medium transition-colors duration-200"
            >
              Log Out All Other Sessions
            </button>
          </div>
        </div>

        <div>
          <SectionHeading
            icon={<Shield size={18} />}
            title="Access Restrictions"
          />

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              IP Whitelist (comma separated)
            </label>
            <textarea
              value={securityData.ipWhitelist}
              onChange={(e) =>
                handleInputChange("security", "ipWhitelist", e.target.value)
              }
              placeholder="e.g. 192.168.1.1, 10.0.0.1"
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 h-24 bg-white dark:bg-gray-700 text-gray-800 dark:text-white"
            />
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
              Leave empty to allow access from any IP address
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SecuritySettings;
