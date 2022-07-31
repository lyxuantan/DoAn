import {Box, Container, Grid} from '@mui/material';
import {Budget} from './Dashboards/budget';
import {TasksProgress} from './Dashboards/taskProcess';
import TotalCustomers from './Dashboards/totalCustomer';
import {TotalProfit} from './Dashboards/totalProfit';
import Chart from './Dashboards/Chart';
import {DashboardLayout} from './Dashboards/DashboardLayout';
import {useEffect, useState} from "react";
import {getOrderHistory} from "../api/order-hitory";
import LatestOrders from "./Dashboards/lastOrder.";
import {getAllProduct} from "../api/product";

const HomePage = () => {
    const [listOrderHistory, setListOrderHistory] = useState([]);
    const [listAllProduct, setListAllProduct] = useState([]);

    const fetchOrderHistory = () => {
        getOrderHistory().then(res => {
            const {data} = res.data;
            if (data && data.length) {
                setListOrderHistory(data);
            }
        })
    }

    useEffect(() => {
        fetchOrderHistory();
    }, [])

    useEffect(() => {
        getAllProduct().then(res => {
            const {data} = res.data;
            if (data && data.length) {
                setListAllProduct(data);
            }
        })
    }, [])

    function onFetchOrderHistory() {
        fetchOrderHistory();
    }

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
                            lg={6}
                            sm={6}
                            xl={6}
                            xs={12}
                        >
                            <Budget listOrderHistory={listOrderHistory}/>
                        </Grid>
                        <Grid
                            item
                            xl={6}
                            lg={6}
                            sm={6}
                            xs={12}
                        >
                            <TotalCustomers/>
                        </Grid>
                        <Grid
                            item
                            md={12}
                            xs={12}
                        >
                            <Chart listOrderHistory={listOrderHistory} listAllProduct={listAllProduct}/>
                        </Grid>
                        <Grid
                            item
                            md={12}
                            xs={12}
                        >
                            <LatestOrders listOrderHistory={listOrderHistory}
                                          onFetchOrderHistory={onFetchOrderHistory}/>
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