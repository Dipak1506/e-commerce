import "../css/navbar.css";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useLayoutEffect, useState } from "react";
import { AiOutlineSearch, AiOutlineHome } from "react-icons/ai";
import { BsCart3, BsListUl } from "react-icons/bs";
import { FaHome, FaUserCog } from "react-icons/fa";
import headercss from "../css/header.module.css";
import { setCart } from "../redux/reducers/cartReducer";
import Login from "./login";

const Navbar = ({ click }) => {
  const cart = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const isLogin = useSelector((state) => state.isLogin);

  useEffect(() => {
    console.log("isLogin state " + JSON.stringify(isLogin.currentState));
  }, []);

  useLayoutEffect(() => {
    if (cart.value.length === 0) {
      let cart = localStorage.getItem("cart");
      if (cart) {
        dispatch(setCart(JSON.parse(cart)));
      }
    }
    //alert(id)
  }, []);

  return (
    <>
      <div className={`col-12 ${headercss.mobileFot}`}>
        <Link to="/">
          <FaHome className={`${headercss.icon} ${headercss.active}`} />
          <br />
          <span className={`${headercss.mTxt}`}>Home</span>
        </Link>
        <Link to="/">
          <BsListUl className={headercss.icon} />
          <br />
          <span className={`${headercss.mTxt}`}>Categories</span>
        </Link>
        <Link className={headercss.cart} to="/cart">
          <BsCart3 style={{ fontSize: 25 }} />
          <span>{cart.total}</span>
          <br />
          <a className={`${headercss.mTxt}`}>Cart</a>
        </Link>
        <Link to="admin">
          <FaUserCog className={headercss.icon} />
          <br />
          <span className={`${headercss.mTxt}`}>Account</span>
        </Link>
      </div>

      <nav className="navbar">
        <div className="hamburger__menu" onClick={click}>
          <div></div>
          <div></div>
          <div></div>
        </div>
        <div className="navbar__logo">
          <Link to="/">
            <h2> TA-Shop </h2>
          </Link>
        </div>

        <ul className="navbar__links">
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/cart" className="cart__link">
              <i className="fas fa-shopping-cart"></i>
              <span>
                Shopping Cart
                <span className="cartlogo__badge">{cart.total}</span>
              </span>
            </Link>
          </li>
          {/* <li>
          <Link to="/">Shop</Link>
        </li> */}
        </ul>
        {isLogin.currentState ? (
          <a className="login" href="/admin">
            DashBord
          </a>
        ) : (
          <a className="login" href="/login">
            SignIn
          </a>
        )}
      </nav>
    </>
  );
};

export default Navbar;
