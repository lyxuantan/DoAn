import { Box, Container, Grid } from '@mui/material';
import { Budget } from './Dashboards/budget';
import { TasksProgress } from './Dashboards/taskProcess';
import { TotalCustomers } from './Dashboards/totalCustomer';
import { TotalProfit } from './Dashboards/totalProfit';
import { Chart } from './Dashboards/Chart';
import { LatestOrders } from './Dashboards/lastOrder.';
import { DashboardLayout } from './Dashboards/DashboardLayout';


const HomePage = () => (
    <>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 8,
          mt: 3,
          backgroundColor: '#f9fafc'
        }}
      >
        <Container maxWidth={false}>
          <Grid
            container
            spacing={3}
          >
            <Grid
              item
              lg={3}
              sm={6}
              xl={3}
              xs={12}
            >
              <Budget />
            </Grid>
            <Grid
              item
              xl={3}
              lg={3}
              sm={6}
              xs={12}
            >
              <TotalCustomers />
            </Grid>
            <Grid
              item
              xl={3}
              lg={3}
              sm={6}
              xs={12}
            >
              <TasksProgress />
            </Grid>
            <Grid
              item
              xl={3}
              lg={3}
              sm={6}
              xs={12}
            >
              <TotalProfit sx={{ height: '100%' }} />
            </Grid>
            <Grid
            item
            md={12}
            xs={12}
          >
            <Chart />
          </Grid>
          <Grid
            item
            md={12}
            xs={12}
          >
            <LatestOrders />
          </Grid>
          </Grid>
        </Container>
      </Box>
    </>
  );
  HomePage.getLayout = (page) => (
    <DashboardLayout>
      {page}
    </DashboardLayout>
  )
export default HomePage;