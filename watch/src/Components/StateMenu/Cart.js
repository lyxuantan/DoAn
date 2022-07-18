import * as React from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import Button from "@mui/material/Button";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import CloseIcon from "@mui/icons-material/Close";
import Infor from '../InforHeader/infor-header';
import imgTest from '../../Images/7.jpg'
import "./cart.scss";
import {FaTruck} from "react-icons/fa";
import {MdOutlineGppGood} from "react-icons/md";
import {IoIosSwap} from "react-icons/io";
import CartItem from "./CartItem";
import {ArrowRight} from "@mui/icons-material";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {useDispatch, useSelector} from "react-redux";
import {useEffect, useState} from "react";
import {deleteCustomerOrderDetail, getCustomerOrder, updateCustomerOrder} from "../../api/customer-order";
import {getCart} from "../../redux/cartSlice";

export default function Cart() {
    const [state, setState] = React.useState({
        right: false,
    });
    const [customerOrder, setCustomerOrder] = useState([]);

    const toggleDrawer = (anchor, open) => (event) => {
        if (
            event.type === "keydown" &&
            (event.key === "Tab" || event.key === "Shift")
        ) {
            return;
        }
        setState({...state, [anchor]: open});
    };

    const cartStore = useSelector(state => state.cartSlice);
    const dispatch = useDispatch();

    // useEffect(() => {
    //     updateCustomerOrder(
    //         {
    //             userId: 5,
    //             orderId
    //         }
    //     ).then(res => {
    //         const {data} = res;
    //     })
    // }, [])

    useEffect(() => {
        fetchCustomerOrder();
    }, [])

    const fetchCustomerOrder = () => {
        getCustomerOrder({
            userId: 5,
            isPaid: false,
        }).then(
            res => {
                const {data} = res.data;
                if (data && data.length) {
                    setCustomerOrder(data?.[data.length - 1])
                    dispatch(getCart(data?.[data.length - 1]))

                }
            }
        )
    }

    console.log(36, customerOrder)
    const onChangeTotal = (item, num) => {
        console.log(55, item, num)
        const tmp = {...customerOrder};

        const indexOrderDetail = customerOrder.customerOrderDetails.findIndex(i => i.id === item.id);
        // const customerOrderDetail = tmp.customerOrderDetails[indexOrderDetail];
        // customerOrderDetail.total += num;
        console.log(indexOrderDetail)
        console.log(tmp.customerOrderDetails[indexOrderDetail])
        if (indexOrderDetail > -1) {
            tmp.customerOrderDetails = customerOrder.customerOrderDetails.map((item, index) => {
                if (indexOrderDetail === index) {
                    return {
                        ...item,
                        quantity: item.quantity + num,
                    }
                } else {
                    return {
                        ...item,
                    }

                }
            });
            setCustomerOrder(tmp);
            if (tmp.customerOrderDetails[indexOrderDetail].quantity <= 0) {
                onDeleteOrderDetail(item)
            } else {
                updateCustomerOrder({
                    ...tmp,
                    userId: tmp?.user?.id,
                    orderId: tmp.id,
                    isPaid: false,
                }).then(res => {
                    const {data} = res;
                    console.log(106, data)
                    if (data.errorCode == "200") {
                        fetchCustomerOrder();
                    }
                })
            }
        }
    }

    const onDeleteOrderDetail = (item) => {
        deleteCustomerOrderDetail(
            {
                id: item.id,
            }
        ).then(res => {
            const {data} = res;
            if (data.errorCode == '200') {
                fetchCustomerOrder();
            }
        })
    }

    const list = (anchor) => (
        <div className="cart">

            <Box
                sx={{width: "25vw", height: "100vh", overflowY: "hidden"}}
                role="presentation"
            >
                <div className="wrapperCart">
                    <div className="headerCart">
                        <div className="titleCart">GIỎ HÀNG CỦA BẠN</div>
                        <div>
                            <Button>
                                <CloseIcon onClick={toggleDrawer(anchor, false)} fontSize="medium"
                                           sx={{color: "white"}}/>
                            </Button>
                        </div>
                    </div>
                    <div>
                        <div>
                            <div className='overInfortext'>
                                <div className='allIn'>
                                    <div className='index1'>
                    <span className="navbar-brand info" id='one' href="#"><i className='icons mr-2'>
                        <FaTruck className="mr-2 pr-2"/></i><span className="ml-2" ml={2} pl={2}>MIỄN PHÍ VẬN CHUYỂN ĐƠN HÀNG >700K</span></span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="d-flex flex-column">
                        <div className="miniCart">
                            {customerOrder && customerOrder.customerOrderDetails && customerOrder.customerOrderDetails.length ?
                                customerOrder.customerOrderDetails.map((item, index) =>
                                    <CartItem item={item} onChangeTotal={onChangeTotal}
                                              onDeleteOrderDetail={onDeleteOrderDetail}/>
                                ) : null}

                        </div>
                        <div className="cart-bottom">
                            <div className="cart-bottom-top">
                                <span>Thành tiền</span> <span>5.298.000 ₫</span>

                            </div>
                            <button
                                className="pay-now"
                                // type="submit"

                            >
                                THANH TOÁN NGAY
                                <FontAwesomeIcon icon="check-square"/>
                            </button>
                            {/*<div className="cart-bottom-footer">*/}
                            {/*    *Ước tính thời gian ship: 18/07/2022*/}
                            {/*</div>*/}
                        </div>
                    </div>
                </div>
            </Box>
        </div>
    );

    return (
        <>
            <div style={{display: "inline"}}>
                {["right"].map((anchor) => (
                    <React.Fragment key={anchor}>
                        <Button onClick={toggleDrawer(anchor, true)}>
                            <ShoppingCartIcon sx={{color: "black", fontSize: "25px"}}/>
                        </Button>
                        <Drawer
                            anchor={anchor}
                            open={state[anchor]}
                            onClose={toggleDrawer(anchor, false)}
                        >
                            {list(anchor)}
                        </Drawer>
                    </React.Fragment>
                ))}
            </div>
            <span
                className="total-cart">{customerOrder.customerOrderDetails && customerOrder.customerOrderDetails.length}</span>
        </>
    );
}
