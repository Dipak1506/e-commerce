import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import api from "../../Api";
import homecss from "../../css/view_products.module.css";
import { setOrders } from "../../redux/reducers/orderReducer";

const Vieworders = ({ setShowLoading }) => {
  const orders = useSelector((state) => state.orders.value);
  const dispatch = useDispatch();
  const [loadingState, setLoadingState] = useState("loading");
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [newStatus, setNewStatus] = useState("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const fetchorders = async () => {
    api
      .getApi(`${process.env.REACT_APP_BACKEND_URL}get-orders`)
      .then((response) => response.json())
      .then((result) => {
        console.log(result, "result");
        dispatch(setOrders(result.data));
        setLoadingState("ready");
      })
      .catch((err) => {
        console.log(err, "error");
        setLoadingState("error");
      });
  };


  const handleStatusUpdate = async () => {
    try {
      const response = await api.PostApi(`${process.env.REACT_APP_BACKEND_URL}update-order`, {
        orderId: selectedOrder.order_id,
        newStatus: newStatus,
      });
      const result = await response.json();
      console.log("update result"+result); 
      setIsDropdownOpen(false);
      alert("updated successfully");
      fetchorders();
    } catch (error) {
      console.error("Error updating order status:", error);
    }
  };


  useEffect(() => {
    //alert(orders.length)
    if (orders.length == 0) {
      fetchorders();
    } else {
      setLoadingState("ready");
    }
  }, []);

  return (
    <div>
      <h1 style={{ fontSize: 35 }}>View orders</h1>
      <div className={`${homecss.product_div} col-12`}>
        {loadingState === "loading" ? (
          <h2>Loading orders</h2>
        ) : loadingState === "error" ? (
          <h2>Error loading orders</h2>
        ) : orders.length === 0 ? (
          <span>No order havae been added</span>
        ) : (
          <table>
            <tr>
              <th>Id</th>
              <th>Order Name</th>
              <th>Quantity</th>
              <th>Date</th>
              <th>Total Price</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
            {orders.map((order) => (
              <tr>
                <td>{order.order_id}</td>
                <td>{order.products}</td>
                <td>{order.quantity}</td>
                <td>{order.order_date}</td>
                <td>{order.total}</td>
                <td>{order.status}</td>
                <td>
                  <span
                     onClick={() => {
                        setSelectedOrder(order);
                        setIsDropdownOpen(true);
                      }}
                  >
                    Edit
                  </span>
                  {isDropdownOpen && selectedOrder && selectedOrder.order_id === order.order_id && (
                      <div>
                        <select
                          value={newStatus}
                          onChange={(e) => setNewStatus(e.target.value)}
                        >
                          <option value="">Select Status</option>
                          <option value="Cancelled">Cancelled</option>
                          <option value="Delivered">Delivered</option>
                        </select>
                        <button onClick={handleStatusUpdate}>Update</button>
                      </div>
                    )}
                </td>
              </tr>
            ))}
          </table>
        )}
      </div>
      
    </div>
  );
};
export default Vieworders;
