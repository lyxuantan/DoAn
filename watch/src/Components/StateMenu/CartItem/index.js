import imgTest from "../../../Images/7.jpg";
import * as React from "react";
import {AddCircle, RemoveCircle} from "@mui/icons-material";
import CloseIcon from "@mui/icons-material/Close";
import './styles.scss'

const CartItem = ({item, onChangeTotal, onDeleteOrderDetail}) => {
    return (
        <div className="cart-item">
            <div className="cart-item-left">
                <CloseIcon fontSize="small" onClick={() => onDeleteOrderDetail(item)}/>
                {console.log(12, item)}
                <img src={item?.product?.productImages?.[0]?.photosImagePath} alt=""/>
            </div>
            <div className="cart-item-right">
                <div className="right-top">
                    <div>
                        {item?.product?.name}
                    </div>
                    <div>
                        <div>
                            {item?.price}
                        </div>
                        <div>
                            {item?.priceRef}
                        </div>
                    </div>
                </div>
                <div className="right-bottom">
                    <div className="size">
                        {item?.product?.size?.name}
                    </div>
                    <div className="quantity">
                        <RemoveCircle onClick={() => onChangeTotal(item, -1)}/>
                        <span className="t">Qty: {item.quantity}</span>
                        <AddCircle onClick={() => onChangeTotal(item, 1)}/>

                    </div>

                </div>
            </div>
        </div>
    )

}
export default CartItem;