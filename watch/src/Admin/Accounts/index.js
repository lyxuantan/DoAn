import { ThemeProvider } from "@mui/material/styles";
import { Box, Container } from "@mui/material";
import { theme } from "../theme";
import { DashboardLayout } from "../Dashboards/DashboardLayout";
import { DashboardSidebar } from "../Dashboards/DashboardSidebar";
import { DashboardNavbar } from "../Dashboards/DashboardNavbar";
import { AccountListToolbar } from "./AccountToolBar";
import { AccountListResults } from "./AccountDetail";

const Accounts = () => (
  <>
    <ThemeProvider theme={theme}>
      <div className="dashBoardNarBar">
        <DashboardNavbar />
      </div>
      <DashboardSidebar />
      <div className="wrapper-AdminHome">
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            py: 8,
            backgroundColor: '#f9fafc'
          }}
        >
          <Container maxWidth={false}>
            <AccountListToolbar />
            <Box sx={{ mt: 3 }}>
              <AccountListResults />
            </Box>
          </Container>
        </Box>
      </div>
    </ThemeProvider>
  </>
); Accounts.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Accounts;
