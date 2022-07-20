import "./adminHome.css";
import HomePage from "./HomePage";
import { theme } from "./theme";
import { ThemeProvider } from "@mui/material/styles";
import { DashboardSidebar } from "./Dashboards/DashboardSidebar";
import { DashboardNavbar } from "./Dashboards/DashboardNavbar";

function AdminHome() {
  return (
    <ThemeProvider theme={theme}>
      <div className="dashBoardNarBar">
        <DashboardNavbar />
      </div>
      <DashboardSidebar />
      <div className="wrapper-AdminHome">
        <HomePage />
      </div>
    </ThemeProvider>
  );
}
export default AdminHome;
