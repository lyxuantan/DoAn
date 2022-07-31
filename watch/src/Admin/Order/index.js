import {ThemeProvider} from "@mui/material/styles";
import {Box, Button, Container, InputAdornment, Modal, SvgIcon, TextField} from "@mui/material";
import {theme} from "../theme";
import {DashboardLayout} from "../Dashboards/DashboardLayout";
import {DashboardSidebar} from "../Dashboards/DashboardSidebar";
import {DashboardNavbar} from "../Dashboards/DashboardNavbar";
import {OrderListToolbar} from "./orderToolbar";
import {OrderListResults} from "./orderDetail";
import DashboardTitle from "../../Components/DashboardTitle";
import {Search as SearchIcon} from "../icons/search";
import {useState} from "react";


const Orders = () => {


    return (<>
            <ThemeProvider theme={theme}>
                <div className="dashBoardNarBar">
                    <DashboardNavbar/>
                </div>
                <DashboardSidebar/>
                <div className="wrapper-AdminHome body-container">
                    <DashboardTitle title="Danh Sách Đơn Hàng"/>
                    <Box
                        component="main"
                        sx={{
                            flexGrow: 1,
                        }}
                    >
                        <Container maxWidth={false}>
                            <Box sx={{mt: 3}}>
                                <OrderListResults/>
                            </Box>
                        </Container>
                    </Box>
                </div>
            </ThemeProvider>

        </>
    );
}
Orders.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Orders;
