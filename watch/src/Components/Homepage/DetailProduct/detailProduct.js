import "./detailProduct.scss";
import {useEffect, useState} from 'react'
import Footer from '../../Footer/footer';
import Navbar from '../../Navbar/navbar';
import Infor from "../../InforHeader/infor-header";
import {useParams} from "react-router-dom";
import {getProductDetail} from "../../../api/product";
import {thousandsSeparators} from "../../../common/fCommon";
import {addToCart, getCart} from "../../../redux/cartSlice";
import {updateCustomerOrder} from "../../../api/customer-order";
import {useDispatch, useSelector} from "react-redux";

const TAB_KEY = [
    {
        key: "TAB_1",
        name: "THÔNG TIN SẢN PHẨM"
    },
    {
        key: "TAB_2",
        name: "CHÍNH SÁCH VẬN CHUYỂN"
    },
    {
        key: "TAB_3",
        name: "ĐỔI TRẢ & BẢO HÀNH"
    },
    {
        key: "TAB_4",
        name: "HÌNH THỨC THANH TOÁN"
    }
]

function DetailProduct() {

    const {id} = useParams();

    const [product, setProduct] = useState(null)

    const [tabSelected, setTabSelected] = useState(TAB_KEY[0]);
    const [imgPresent, setImgPresent] = useState("");

    const cartStore = useSelector(state => state.cartSlice);
    const dispatch = useDispatch();
    useEffect(() => {
        getProductDetail(
            {productId: id}
        ).then(res => {
            const {data} = res.data;
            if(data) {
                setProduct(data);
                setImgPresent("https://curnonwatch.com/_next/image/?url=https%3A%2F%2Fshop.curnonwatch.com%2Fmedia%2Fcatalog%2Fproduct%2Fg%2Fr%2Fgrace.png&w=640&q=75")
            }
            console.log(data)
        })
    }, [id])

    const renderCustomTab = (item) => {
        console.log(31, tabSelected)
        switch (tabSelected.key) {
            case "TAB_1":
                return <>
                    <div className="product-detail">
                        <table>
                            <tr>
                                <td className="detail-title">
                                    Kích thước mặt
                                </td>
                                <td className="detail-right">
                                    {item?.size?.name}
                                </td>
                            </tr>
                            <tr>
                                <td className="detail-title">
                                    Độ dày
                                </td>
                                <td className="detail-right">
                                    {item?.thickness}
                                </td>
                            </tr>
                            <tr>
                                <td className="detail-title">
                                    Màu mặt
                                </td>
                                <td className="detail-right">
                                    {item?.colors?.name}
                                </td>
                            </tr>
                            <tr>
                                <td className="detail-title">
                                    Loại máy
                                </td>
                                <td className="detail-right">
                                    {item?.machineType}
                                </td>
                            </tr>
                        </table>
                    </div>
                </>
            case "TAB_2":
                return <>
                    <ul>

                    </ul>
                </>
            case "TAB_3":
                return <>
                </>
            case "TAB_4":
                return <>
                </>
            default:
                return <></>

        }
    }

    const onChangeCustomTab = (item) => {
        setTabSelected(item);
    }

    const onAddToCart = (item) => {
        // dispatch(addToCart(item));
        // eslint-disable-next-line no-unused-expressions
        const findIndexItem = cartStore?.customerOrderDetails && cartStore?.customerOrderDetails.length ? cartStore?.customerOrderDetails.findIndex(i => i?.product?.id === item?.id) : -1;
        const newDetail = [];
        if(findIndexItem > -1) {
            cartStore?.customerOrderDetails.forEach((item, index) =>
            {
                if(index === findIndexItem) {
                    newDetail.push({
                        ...item,
                        id: item.id,
                        orderId: item.orderId,
                        quantity: item.quantity + 1,
                        product: item.product,
                    })
                }
                else {
                    newDetail.push(
                        {
                            ...item,
                            id: item.id,
                            orderId: item.orderId,
                            quantity: item.quantity,
                            product: item.product,
                        }
                    );
                }
            });
        }
        else {
            cartStore?.customerOrderDetails.forEach((item, index) => {
                newDetail.push(item);
            });
            newDetail.push(
                {
                    orderId: cartStore?.id,
                    quantity: 1,
                    // status: item.status,
                    product: item,
                });
        }

        const payload = {
            ...cartStore,
            orderId: cartStore?.id,
            userId: cartStore?.user?.id,
            isPaid: false,
            status: 0,
            customerOrderDetails: newDetail

        }
        updateCustomerOrder(payload).then(res => {
            const {data} = res;
            if (data.errorCode == "200") {
                dispatch(getCart(payload));
            }
        })
    }

    const onSelectImgPresent = (img) => {
        setImgPresent(img);
    }

    return (
        <>
            <Navbar/>
            <div className="container overDetailProduct">
                <div className="row">
                    <div className="col-7">
                        <div className="row detailImgProduct">
                            <div className="col-2 detailMiniProduct">
                                <div className="mini-ImgProduct"><img className="miniShow"
                                                                      onClick={() => onSelectImgPresent("https://curnonwatch.com/_next/image/?url=https%3A%2F%2Fshop.curnonwatch.com%2Fmedia%2Fcatalog%2Fproduct%2Fg%2Fr%2Fgrace.png&w=640&q=75")}
                                                                      src="https://curnonwatch.com/_next/image/?url=https%3A%2F%2Fshop.curnonwatch.com%2Fmedia%2Fcatalog%2Fproduct%2Fg%2Fr%2Fgrace.png&w=640&q=75"></img>
                                </div>
                                <div className="mini-ImgProduct"><img className="miniShow"
                                                                      onClick={() => onSelectImgPresent("https://curnonwatch.com/_next/image/?url=https%3A%2F%2Fshop.curnonwatch.com%2Fmedia%2Fcatalog%2Fproduct%2Fj%2Fk%2Fjksn-5-3-final-f-crpped.png&w=640&q=75")}
                                                                      src="https://curnonwatch.com/_next/image/?url=https%3A%2F%2Fshop.curnonwatch.com%2Fmedia%2Fcatalog%2Fproduct%2Fj%2Fk%2Fjksn-5-3-final-f-crpped.png&w=640&q=75"></img>
                                </div>
                                {/*<div className="mini-ImgProduct"><img className="miniShow"*/}
                                {/*                                      src="https://curnonwatch.com/_next/image/?url=https%3A%2F%2Fshop.curnonwatch.com%2Fmedia%2Fcatalog%2Fproduct%2F8%2F_%2F8.jpg&w=640&q=75"></img>*/}
                                {/*</div>*/}
                                {/*<div className="mini-ImgProduct"><img className="miniShow"*/}
                                {/*                                      src="https://curnonwatch.com/_next/image/?url=https%3A%2F%2Fshop.curnonwatch.com%2Fmedia%2Fcatalog%2Fproduct%2Fu%2Fn%2Funtitled_capture9245.jpg&w=640&q=75"></img>*/}
                                {/*</div>*/}
                            </div>
                            <div className="col-10 bigImgProduct"><img
                                src={imgPresent}></img>
                            </div>
                        </div>
                    </div>
                    <div className="col-4 First">
                        <div className="coverPayment">
                            <div className="topPayment">
                                <p className="brandTopPayment">{product?.collections?.name}</p>
                                <h2 className="titleTopPayment">{product?.name}</h2>
                            </div>
                            <div className=" text-center mb-5">
                                <span className="cardPrice Detail">{thousandsSeparators(product?.priceSale)} VNĐ</span>
                                <span className="cardOldPrice Detail">{thousandsSeparators(product?.priceRef)} VNĐ</span>
                                <span className="text-endNote">Giá sau khi giảm </span>
                            </div>
                            {/*<div className="brandTopPayment">*/}
                            {/*    <span className="">hoặc Price$ x 3 kỳ với Fundiin</span>*/}
                            {/*</div>*/}
                            <div style={{textAlign: 'center'}} className="product-details-footer">
                                <button type="button" className="btn btn-success btnPayment">THANH TOÁN NGAY</button>
                                <button type="button" className="btn btn-outline-dark btnAddStore" onClick={() => onAddToCart(product)}>THÊM VÀO GIỎ</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Infor/>
            <div className="custom-tab">
                <ul>{
                    TAB_KEY.map((item, index) => (
                        <>
                            <li key={item.key} className={`custom-tab-list ${tabSelected.key === item.key ? "active" : ""}`} onClick={() => onChangeCustomTab(item)}>{item.name}</li>
                        </>
                    ))
                }</ul>
                <div className="custom-tab-content">
                    {renderCustomTab(product)}
                </div>
            </div>
            {/*<Footer/>*/}
        </>
    );
}

export default DetailProduct;
