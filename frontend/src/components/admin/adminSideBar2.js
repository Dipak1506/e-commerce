import sidebar from "../../css/admin_sb.module.css";
import { Link } from "react-router-dom";
import { RiDashboardFill } from "react-icons/ri";
import { BsCart4 } from "react-icons/bs";
import { MdAddShoppingCart } from "react-icons/md";
import { IoMdClose } from "react-icons/io";
import { AiFillContacts } from "react-icons/ai";

import { useState, useEffect } from "react";
import { BiLogOut } from "react-icons/bi";
import { useNavigate } from 'react-router-dom';
//import logo from "../images/logo.png";

const Sidebar = ({ menu, setMenu }) => {
  const [clickedNumber, setClickedNumber] = useState(1);

  const hideShowSubContent = (num) => {
    if (clickedNumber !== num) setClickedNumber(num);
    else setClickedNumber(-1);
  };



  const logOut =  () => {
    sessionStorage.removeItem("user");
    
  }

  useEffect(() => {}, []);

  return (
    <div
      className={`${sidebar.nav} ${
        window.innerWidth < 991
          ? menu === true
            ? `${sidebar.show_menu}`
            : ""
          : ""
      } col-12`}
    >
      {/* <div style={{position:"relative", width: '100%'}}><img className={sidebar.brand}/> <span onClick={()=>setMenu(false)} className={sidebar.cancel_menu} style={{color:'#fff'}}><IoMdClose/></span></div> */}
      <Link
        className={`${sidebar.nav__link} ${
          clickedNumber == 1 ? sidebar.active_nav : ""
        }`}
        onClick={() => setClickedNumber(1)}
        to="dashboard"
      >
        <RiDashboardFill /> Dashboard
      </Link>
      <Link
        className={`${sidebar.nav__link} ${
          clickedNumber == 2 ? sidebar.active_nav : ""
        }`}
        onClick={() => setClickedNumber(2)}
        to="add-product"
      >
        <MdAddShoppingCart /> Add Product
      </Link>
      <Link
        className={`${sidebar.nav__link} ${
          clickedNumber == 3 ? sidebar.active_nav : ""
        }`}
        onClick={() => setClickedNumber(3)}
        to="view-products"
      >
        <BsCart4 /> View Products
      </Link>
      <Link
        className={`${sidebar.nav__link} ${
          clickedNumber == 4 ? sidebar.active_nav : ""
        }`}
        onClick={() => setClickedNumber(4)}
        to="view-orders" // This should be the correct path for View Orders
      >
        <BsCart4 /> View Orders
      </Link>
      <Link
        className={`${sidebar.nav__link} ${
          clickedNumber == 5 ? sidebar.active_nav : ""
        }`}
        onClick={() => {setClickedNumber(5); logOut()}}
        to="/" // This should be the correct path for View Orders
      >
        <BiLogOut /> LogOut
      </Link>
    </div>
  );
};
export default Sidebar;
