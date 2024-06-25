import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./reducers/cartReducer";
import productsReducer from "./reducers/productsReducer";
import orderReducer from "./reducers/orderReducer";
import loginReducer from "./reducers/loginReducer";
import buttonTextReducer from "./reducers/buttonTextReducer";

export default configureStore({
  reducer: {
    cart: cartReducer,
    products: productsReducer,
    orders: orderReducer,
    isLogin: loginReducer,
    buttonText: buttonTextReducer
  }
});