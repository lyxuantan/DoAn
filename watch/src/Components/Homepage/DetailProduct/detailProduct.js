import "./detailProduct.scss";
import {useEffect, useState} from 'react'
import Footer from '../../Footer/footer';
import Navbar from '../../Navbar/navbar';
import Infor from "../../InforHeader/infor-header";

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

    const [tabSelected, setTabSelected] = useState(TAB_KEY[0]);

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
                                    {item?.color?.name}
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
                            {/*<tr>*/}
                            {/*    <td className="detail-title">*/}
                            {/*        Kích cỡ dây*/}
                            {/*    </td>*/}
                            {/*    <td className="detail-right">*/}
                            {/*        {item?.size}*/}
                            {/*    </td>*/}
                            {/*</tr>*/}
                        </table>
                    </div>
                </>
            case "TAB_2":
                return <>
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

    return (
        <>
            <Navbar/>
            <div className="container overDetailProduct">
                <div className="row">
                    <div className="col-7">
                        <div className="row detailImgProduct">
                            <div className="col-2 detailMiniProduct">
                                <div className="mini-ImgProduct"><img className="miniShow"
                                                                      src="https://curnonwatch.com/_next/image/?url=https%3A%2F%2Fshop.curnonwatch.com%2Fmedia%2Fcatalog%2Fproduct%2Fg%2Fr%2Fgrace.png&w=640&q=75"></img>
                                </div>
                                <div className="mini-ImgProduct"><img className="miniShow"
                                                                      src="https://curnonwatch.com/_next/image/?url=https%3A%2F%2Fshop.curnonwatch.com%2Fmedia%2Fcatalog%2Fproduct%2Fj%2Fk%2Fjksn-5-3-final-f-crpped.png&w=640&q=75"></img>
                                </div>
                                <div className="mini-ImgProduct"><img className="miniShow"
                                                                      src="https://curnonwatch.com/_next/image/?url=https%3A%2F%2Fshop.curnonwatch.com%2Fmedia%2Fcatalog%2Fproduct%2F8%2F_%2F8.jpg&w=640&q=75"></img>
                                </div>
                                <div className="mini-ImgProduct"><img className="miniShow"
                                                                      src="https://curnonwatch.com/_next/image/?url=https%3A%2F%2Fshop.curnonwatch.com%2Fmedia%2Fcatalog%2Fproduct%2Fu%2Fn%2Funtitled_capture9245.jpg&w=640&q=75"></img>
                                </div>
                            </div>
                            <div className="col-10 bigImgProduct"><img
                                src="https://curnonwatch.com/_next/image/?url=https%3A%2F%2Fshop.curnonwatch.com%2Fmedia%2Fcatalog%2Fproduct%2Fg%2Fr%2Fgrace.png&w=640&q=75"></img>
                            </div>
                        </div>
                    </div>
                    <div className="col-4 First">
                        <div className="coverPayment">
                            <div className="topPayment">
                                <p className="brandTopPayment">WHITESANDS</p>
                                <h2 className="titleTopPayment">WANDER</h2>
                            </div>
                            <div className=" text-center">
                                <span className="cardPrice Detail">1.614.0000 $</span>
                                <span className="cardOldPrice Detail">1.899.000$</span>
                                <span className="text-endNote">Giá sau khi giảm </span>
                            </div>
                            <div className="brandTopPayment">
                                <span className="">hoặc Price$ x 3 kỳ với Fundiin</span>
                            </div>
                            <div style={{textAlign: 'center'}}>
                                <button type="button" className="btn btn-success btnPayment">THANH TOÁN NGAY</button>
                                <button type="button" className="btn btn-outline-dark btnAddStore">THÊM VÀO GIỎ</button>
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
                    {renderCustomTab()}
                </div>
            </div>
            {/*<Footer/>*/}
        </>
    );
}

export default DetailProduct;
