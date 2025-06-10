import { Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import VisitorDashboard from "./features/dashboards/visitor/VisitorDashboard";
import VisitSummary from "./components/visitors/VisitSummary";
import Notifications from "./components/visitors/Notifications";
import AdminDashboard from "./features/dashboards/admin/AdminDashboard";
import NotFound from "./pages/NotFound";
import ProtectedRoute from "./routes/ProtectedRoute";
import { ProfileProvider } from "./hooks/ProfileContext";
import { VisitProvider } from "./hooks/VisitContext";
import VisitorsList from "./components/admins/VisitorsList";
import ScanQR from "./components/admins/ScanQR";
import Schedule from "./components/admins/Schedule";
import Analytics from "./components/admins/Analytics";
import Settings from "./components/admins/AdminSettings";
import { ThemeProvider } from "./hooks/ThemeContext";
import VisitorSettings from "./components/visitors/VisitorSettings";
import UserManagement from "./components/admins/UserManagement";
import { Toaster } from "react-hot-toast";

function App() {
  return (
    <>
      <Toaster
        position="top-right"
        gutter={8}
        toastOptions={{
          className: "font-sans text-sm",
          duration: 5000,
          style: {
            background: "#363636",
            color: "#fff",
            padding: "12px",
          },

          success: {
            duration: 3000,
            iconTheme: {
              primary: "#10B981", 
              secondary: "white",
            },
            style: {
              background: "#E0F2F1", 
              color: "#0D7377",
            },
          },

          error: {
            duration: 4000,
            iconTheme: {
              primary: "#EF4444", 
              secondary: "white",
            },
            style: {
              background: "#FEE2E2", 
              color: "#B91C1C",
            },
          },
        }}
      />
      <ThemeProvider>
        <ProfileProvider>
          <VisitProvider>
            <Routes>
              <Route path="/" element={<LandingPage />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />

              {/* Visitor */}
              <Route path="/visitor" element={<VisitorDashboard />}>
                <Route index element={null} />
                <Route path="check-in" element={<VisitorDashboard />} />
                <Route path="visit-summary" element={<VisitSummary />} />
                <Route path="notifications" element={<Notifications />} />
                <Route path="settings" element={<VisitorSettings />} />
              </Route>

              {/* Admin */}
            <Route
              path="/admin"
              element={
                <ProtectedRoute allowedRoles={["admin"]}>
                  <AdminDashboard />
                </ProtectedRoute>
              }
            >
              <Route index element={null} />
              <Route path="user-management" element={<UserManagement />} />
              <Route path="visitors-list" element={<VisitorsList />} />
              <Route path="scan" element={<ScanQR />} />
              <Route path="schedule" element={<Schedule />} />
              <Route path="analytics" element={<Analytics />} />
              <Route path="settings" element={<Settings />} />
            </Route>

              {/* Super Admin */}
              {/* <Route
            path="/superadmin"
            element={
              <ProtectedRoute allowedRoles={["superadmin"]}>
                <SuperAdminDashboard />
              </ProtectedRoute>
            }
          /> */}

              <Route path="*" element={<NotFound />} />
            </Routes>
          </VisitProvider>
        </ProfileProvider>
      </ThemeProvider>
    </>
  );
}

export default App;
