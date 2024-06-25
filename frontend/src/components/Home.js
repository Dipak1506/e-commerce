import homecss from "../css/home.module.css";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import api from "../Api";
import { setProducts } from "../redux/reducers/productsReducer";
import Product from "./Product";
import { Link } from "react-router-dom";
import Navbar from "./Navbar.js";
import { FaCopyright } from "react-icons/fa";
import { FaRegCopyright } from "react-icons/fa6";
import { setIsLogin } from "../redux/reducers/loginReducer.js";

const Home = () => {
  const products = useSelector((state) => state.products.value);
  const dispatch = useDispatch();
  const [loadingState, setLoadingState] = useState("loading");
  const [shouldShow, setShouldShow] = useState(true);

  useEffect(() => {
    sessionStorage.getItem("user");

    if (sessionStorage.getItem("user") === null) {
      dispatch(setIsLogin(false));
    } else {
        dispatch(setIsLogin(true));
    }
  });

  const fetchProducts = async () => {
    api
      .getApi("https://fakestoreapi.com/products")
      .then((response) => response.json())
      .then((result) => {
        if (shouldShow) {
          dispatch(setProducts(result));
          setLoadingState("ready");
        }
      })
      .catch((err) => {
        if (shouldShow) setLoadingState("error");
      });
  };

  useEffect(() => {
    setShouldShow(true);
    if (products.length === 0) {
      fetchProducts();
      // fetchMoreProducts();
    } else {
      if (shouldShow) setLoadingState("ready");
    }
    return () => {
      setShouldShow(false);
    };
  }, []);

  return (
    <div>
      <Navbar />
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <h2>Best Deals On Fashion And Accessories</h2>
      </div>
      <div className={`${homecss.product_div} col-12`}>
        {loadingState === "loading" ? (
          <h2>Loading Products</h2>
        ) : loadingState === "error" ? (
          <h2>Error loading products</h2>
        ) : (
          products.map((product) => (
            <Link to={`/product/${product.id}`} key={product.id}>
              <div
                className={`${homecss.product_parent} col-lg-3 col-md-3 col-sm-4 col-xs-6`}
              >
                <Product
                  productProperties={product}
                  css={homecss}
                  buttonObject={{
                    click: () => {
                      window.location.href = "/product/" + product.id;
                    },
                    text: "View Details",
                  }}
                />
              </div>
            </Link>
          ))
        )}
      </div>
      <div className="footer" style={{ marginLeft: "500px" }}>
        <p>
          {" "}
          <FaRegCopyright style={{ marginRight: "8px" }} />
          Copyrights reserved by Tech Amdavad
        </p>
      </div>
    </div>
  );
};

export default Home;
