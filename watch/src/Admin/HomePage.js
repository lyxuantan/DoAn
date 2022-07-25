import {Box, Container, Grid} from '@mui/material';
import {Budget} from './Dashboards/budget';
import {TasksProgress} from './Dashboards/taskProcess';
import {TotalCustomers} from './Dashboards/totalCustomer';
import {TotalProfit} from './Dashboards/totalProfit';
import Chart from './Dashboards/Chart';
// import {LatestOrders} from './Dashboards/lastOrder.';
import {DashboardLayout} from './Dashboards/DashboardLayout';
import {useEffect, useState} from "react";
import {getOrderHistory} from "../api/order-hitory";
import LatestOrders from "./Dashboards/lastOrder.";
import {getAllProduct} from "../api/product";


const HomePage = () => {
    const [listOrderHistory, setListOrderHistory] = useState([]);
    const [listAllProduct, setListAllProduct] = useState([]);
    useEffect(() => {
        getOrderHistory().then(res => {
            const {data} = res.data;
            if(data && data.length) {
                setListOrderHistory(data);
            }
        })
    }, [])

    useEffect(() => {
        getAllProduct().then(res => {
            const {data} = res.data;
            if(data && data.length) {
                setListAllProduct(data);
            }
        })
    }, [])

    return (<>
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
                            <Budget/>
                        </Grid>
                        <Grid
                            item
                            xl={3}
                            lg={3}
                            sm={6}
                            xs={12}
                        >
                            <TotalCustomers/>
                        </Grid>
                        <Grid
                            item
                            xl={3}
                            lg={3}
                            sm={6}
                            xs={12}
                        >
                            <TasksProgress/>
                        </Grid>
                        <Grid
                            item
                            xl={3}
                            lg={3}
                            sm={6}
                            xs={12}
                        >
                            <TotalProfit sx={{height: '100%'}}/>
                        </Grid>
                        <Grid
                            item
                            md={12}
                            xs={12}
                        >
                            <Chart listOrderHistory={listOrderHistory}  listAllProduct={listAllProduct}/>
                        </Grid>
                        <Grid
                            item
                            md={12}
                            xs={12}
                        >
                            <LatestOrders listOrderHistory={listOrderHistory}/>
                        </Grid>
                    </Grid>
                </Container>
            </Box>
        </>
    );
}
HomePage.getLayout = (page) => (
    <DashboardLayout>
        {page}
    </DashboardLayout>
)
export default HomePage;