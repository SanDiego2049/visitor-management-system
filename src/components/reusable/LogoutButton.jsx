import { LogOut } from "lucide-react";

const LogoutButton = ({ isCollapsed, onClick }) => (
  <button
    onClick={onClick}
    className="flex items-center justify-center gap-2 bg-red-600 hover:bg-red-700 px-4 py-3 rounded-lg w-full mt-auto text-white"
  >
    <LogOut size={18} />
    {!isCollapsed && <span>Logout</span>}
  </button>
);

export default LogoutButton;
