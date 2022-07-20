import { ThemeProvider } from "@mui/material/styles";
import { Box, Container } from "@mui/material";
import { theme } from "../theme";
import { DashboardLayout } from "../Dashboards/DashboardLayout";
import { DashboardSidebar } from "../Dashboards/DashboardSidebar";
import { DashboardNavbar } from "../Dashboards/DashboardNavbar";
import { OrderListToolbar } from "./orderToolbar";
import { OrderListResults } from "./orderDetail";

const Orders = () => (
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
            <OrderListToolbar />
            <Box sx={{ mt: 3 }}>
              <OrderListResults />
            </Box>
          </Container>
        </Box>
      </div>
    </ThemeProvider>
  </>
); Orders.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Orders;
