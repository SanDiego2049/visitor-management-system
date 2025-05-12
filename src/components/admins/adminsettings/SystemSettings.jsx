import { Calendar, Globe, Mail } from "lucide-react";
import FormSection from "../../reusable/FormSection";

const SystemSettings = ({ systemData, handleInputChange }) => {
  return (
    <div>
      <h2 className="text-xl font-semibold mb-6 text-gray-800 dark:text-white">
        System Settings
      </h2>

      <div className="space-y-6">
        <FormSection title="Visitor Management" icon={<Calendar size={18} />}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Visitor Data Retention (days)
              </label>
              <select
                value={systemData.visitorRetention}
                onChange={(e) =>
                  handleInputChange(
                    "system",
                    "visitorRetention",
                    e.target.value
                  )
                }
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 bg-white dark:bg-gray-700 text-gray-800 dark:text-white"
              >
                <option value="30">30 days</option>
                <option value="60">60 days</option>
                <option value="90">90 days</option>
                <option value="180">180 days</option>
                <option value="365">365 days</option>
              </select>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                How long to keep visitor records before automatic deletion
              </p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Auto-Checkout After (hours)
              </label>
              <select
                value={systemData.autoCheckout}
                onChange={(e) =>
                  handleInputChange("system", "autoCheckout", e.target.value)
                }
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 bg-white dark:bg-gray-700 text-gray-800 dark:text-white"
              >
                <option value="4">4 hours</option>
                <option value="6">6 hours</option>
                <option value="8">8 hours</option>
                <option value="12">12 hours</option>
                <option value="24">24 hours</option>
              </select>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                Automatically check out visitors after this duration
              </p>
            </div>
          </div>
        </FormSection>

        <FormSection title="Default Settings" icon={<Globe size={18} />}>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Default Dashboard View
            </label>
            <select
              value={systemData.defaultDashboard}
              onChange={(e) =>
                handleInputChange("system", "defaultDashboard", e.target.value)
              }
              className="w-full md:w-1/2 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 bg-white dark:bg-gray-700 text-gray-800 dark:text-white"
            >
              <option value="overview">Overview</option>
              <option value="visitors">Visitors</option>
              <option value="analytics">Analytics</option>
            </select>
          </div>
        </FormSection>

        <FormSection title="System Notifications" icon={<Mail size={18} />}>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              System Email Recipients (comma separated)
            </label>
            <textarea
              value={systemData.systemEmails}
              onChange={(e) =>
                handleInputChange("system", "systemEmails", e.target.value)
              }
              placeholder="e.g. admin@company.com, security@company.com"
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 h-24 bg-white dark:bg-gray-700 text-gray-800 dark:text-white"
            />
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
              Email addresses that will receive system notifications
            </p>
          </div>
        </FormSection>
      </div>
    </div>
  );
};

export default SystemSettings;
