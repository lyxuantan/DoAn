import "./navbar.scss";
import { Link } from "react-router-dom";
import StateMenu from "../StateMenu";
import LoginIcon from "@mui/icons-material/Login";
import { useTranslation } from "react-i18next";
import { useState, useEffect } from "react";
import DropDownMen from "./DropdownMen";
import Tooltip from '@mui/material/Tooltip';
import Cart from "../StateMenu/Cart";
import {getAllCategory} from "../../api/category";
import {useDispatch, useSelector} from "react-redux";
import {addCategory} from "../../redux/categorySlice";

const nest = (items, id = 0, link = 'parentId') =>
  items
  .filter(item => item[link] === id)
  .map(item => ({
    ...item,
    children: nest(items, item.id)
}));

function Navbar() {
  const { t } = useTranslation();

  const [showChildren, setShowChildren] = useState(false);
  const [children, setChildren] = useState([]);
  const [listCategory, setListCategory] = useState([]);

  const categoryStore = useSelector(state => state);
  const dispatch = useDispatch();

  useEffect(() => {
    getAllCategory().then((res) => {
      if (res && res.data) {
        const {data} = res.data;
        const list = nest(data);
        setListCategory(list)
        dispatch(addCategory(list))
      }
    });
  }, []);


  const leaveHover = () => {
    setChildren([]);
    setShowChildren(false);
  }

  const onShowChildren = (children) => {
    setChildren(children);
    setShowChildren(true);
  }

  return (
    <>
    <div className={showChildren ? "showMenu" : "hideMenu"} onMouseLeave={leaveHover}>
      <DropDownMen children={children} />
    </div>
      <div className=" container-fluid overNav">
        <div className="row">
          <div className="col-4 nav justify-content-left left">
            <StateMenu />
            {listCategory && listCategory.length ? listCategory.map(item => <li className="nav-item menu  dropdown men" onMouseEnter={() => onShowChildren(item.children)}
             >
              <Link
                to="/"
                className="nav-link active"
                aria-current="page"
                href="#"
              >
                <span className="nav-text">{item.name}</span>
              </Link>
            </li>) : null}
            <li className="nav-item menu dropdown" onMouseEnter={leaveHover}>
              <Link
                to="/aboutUs"
                className="nav-link active"
                aria-current="page"
                href="#"
              >
                {t("we")}
              </Link>
            </li>
          </div>
          <div className="col-4 text-center logo">
              <img
                src="https://curnonwatch.com/_next/static/media/logo.cc5d661a.svg"
                alt=""
              ></img>
          </div>
          <div className="col-4 text-end nav justify-content-end right align-items-center">
            <li className="nav-item">
                <span className="nav-icon cart-icon">
                  <Cart />
                  {/*<div className="total-cart">*/}
                  {/*  <span className="total-cart">4</span>*/}
                  {/*</div>*/}
                </span>
            </li>
            {/*<li className="nav-item">*/}
            {/*  <Link*/}
            {/*    className="nav-link active"*/}
            {/*    id="two"*/}
            {/*    aria-current="page"*/}
            {/*    to="/"*/}
            {/*  >*/}
            {/*    <span className="nav-icon">*/}
            {/*      /!*<Cart />*!/*/}
            {/*      <div className="total-cart">*/}

            {/*      </div>*/}
            {/*    </span>*/}
            {/*  </Link>*/}
            {/*</li>*/}
            <li className="nav-item">
              <Tooltip title="Đăng Nhập">
              <Link
                className="nav-link active"
                id="three"
                aria-current="page"
                to="/login"
              >
                <span className="nav-text">LOGIN</span>
                <span className="nav-icon">
                  <LoginIcon />
                </span>
              </Link>
              </Tooltip>
            </li>
            <li className="nav-item">
              <Tooltip title="Đăng Nhập">
              <Link
                className="nav-link active"
                id="four"
                aria-current="page"
                to="/login"
              >
                <span className="nav-icon">
                  <LoginIcon />
                </span>
              </Link>
              </Tooltip>
            </li>
            <li className="nav-item">
              <div className="nav-link active">
                {/* <AccountSetting /> */}
              </div>
            </li>
          </div>
        </div>
      </div>
    </>
  );
}

export default Navbar;
