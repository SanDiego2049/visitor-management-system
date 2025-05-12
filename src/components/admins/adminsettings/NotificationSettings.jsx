import { Mail, Bell, AlertCircle } from "lucide-react";
import SectionHeading from "../../reusable/SectionHeading";
import ToggleSwitch from "../../reusable/ToggleSwitch";

const NotificationSettings = ({ notificationsData, handleCheckboxChange }) => {
  return (
    <div>
      <h2 className="text-xl font-semibold mb-6 text-gray-800 dark:text-white">
        Notification Preferences
      </h2>

      <div className="space-y-6">
        <div className="border-b border-gray-200 dark:border-gray-700 pb-6">
          <SectionHeading
            icon={<Mail size={18} />}
            title="Email Notifications"
          />

          <div className="space-y-4">
            <ToggleSwitch
              checked={notificationsData.emailAlerts}
              onChange={() =>
                handleCheckboxChange("notifications", "emailAlerts")
              }
              label="Email alerts for new visitors"
            />

            <ToggleSwitch
              checked={notificationsData.dailyReports}
              onChange={() =>
                handleCheckboxChange("notifications", "dailyReports")
              }
              label="Daily visitor reports"
            />
          </div>
        </div>

        <div className="border-b border-gray-200 dark:border-gray-700 pb-6">
          <SectionHeading
            icon={<Bell size={18} />}
            title="System Notifications"
          />

          <div className="space-y-4">
            <ToggleSwitch
              checked={notificationsData.smsAlerts}
              onChange={() =>
                handleCheckboxChange("notifications", "smsAlerts")
              }
              label="SMS alerts"
            />

            <ToggleSwitch
              checked={notificationsData.pushNotifications}
              onChange={() =>
                handleCheckboxChange("notifications", "pushNotifications")
              }
              label="Push notifications"
            />
          </div>
        </div>

        <div>
          <SectionHeading
            icon={<AlertCircle size={18} />}
            title="Alert Preferences"
          />

          <div className="space-y-4">
            <ToggleSwitch
              checked={notificationsData.visitorCheckins}
              onChange={() =>
                handleCheckboxChange("notifications", "visitorCheckins")
              }
              label="Visitor check-ins"
            />

            <ToggleSwitch
              checked={notificationsData.securityAlerts}
              onChange={() =>
                handleCheckboxChange("notifications", "securityAlerts")
              }
              label="Security alerts"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotificationSettings;
