import axios from "axios";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import Loader from "../common/loader/Loader";
import Title from "../common/title/Title";
import "./order.css";

const Order = () => {
  // GET ORDERS
  const [orders, setOrders] = useState([]);
  const [Loading, setLoading] = useState(false);
  useEffect(() => {
    const fatchOrders = async () => {
      const { data } = await axios.get(
        process.env.REACT_APP_SERVER + "/api/admin/orders",
        {
          headers: {
            Authorization: localStorage.getItem("aToken"),
          },
        }
      );
      setOrders(data);
      setLoading(true);
    };
    fatchOrders();
  }, [orders]);

  // DELETE ORDER
  const deleteHandler = (id) => {
    Swal.fire({
      text: "Are you sure?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Delete",
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .delete(process.env.REACT_APP_SERVER + `/api/admin/orders/${id}`, {
            headers: {
              Authorization: localStorage.getItem("aToken"),
            },
          })
          .then((response) => {
            Swal.fire({
              icon: "success",
              text: "Order Deleted.",
              showConfirmButton: false,
              timer: 1000,
            });
          })
          .catch((error) => {
            Swal.fire({
              icon: "error",
              title: "Oops...",
              text: "Order deleted field!",
            });
          });
      }
    });
  };

  return (
    <>
      <section className="order content">
        <Title title="Orders" />
        <div className="order-items">
          <table>
            <tr>
              <th>ID</th>
              <th>Customer</th>
              <th>Items</th>
              <th>Qty</th>
              <th>Total_price</th>
              <th>Payment</th>
              <th>Status</th>
              <th>Order_date</th>
              <th>Exp_time</th>
              <th>Delivery_man</th>
              <th>Action</th>
            </tr>
            {Loading ? (
              <>
                {orders.length === 0 ? (
                  <tr>
                    <td className="text-center" colSpan="13">
                      No items found!
                    </td>
                  </tr>
                ) : (
                  orders.map((item, index) => (
                    <tr
                      key={index}
                      className={
                        (item.status === "Ordered" && "text-bold") ||
                        (item.status === "OnDelivery" && "text-bold") ||
                        (item.status === "Accept" && "text-bold")
                      }
                    >
                      <td>
                        <Link to={"/orders/" + item._id}>{item._id}</Link>
                      </td>
                      <td>
                        <Link to={"/customers/" + item.customer_id}>
                          {item.customer_name}
                        </Link>
                      </td>
                      <td>{item.totalItems}</td>
                      <td>{item.total_quantity}</td>
                      <td>$ {item.total_price}</td>
                      <td>
                        {item.payment + " "}
                        {item.payment === "Cash on delivery" && (
                          <>
                            {item.pendingPayment === "Yes" ? (
                              <b className="btn-cncl">Pending</b>
                            ) : (
                              <b className="btn-delv">Paid</b>
                            )}
                          </>
                        )}
                      </td>
                      <td>
                        <span
                          className={
                            (item.status === "Ordered" && "btn-order") ||
                            (item.status === "Accepted" && "btn-on-delv") ||
                            (item.status === "On_service" && "btn-on-delv") ||
                            (item.status === "Cancelled" && "btn-cncl") ||
                            (item.status === "Delivered" && "btn-delv")
                          }
                        >
                          {item.status}
                        </span>
                      </td>
                      <td>{moment(item.order_date).format("lll")}</td>
                      <td>
                        {item.expTime === "0"
                          ? "NaN"
                          : moment(item.expTime).format("lll")}
                      </td>
                      <td>
                        {item.delivery_man_name === "NaN" ? (
                          "Nan"
                        ) : (
                          <Link to={"/delivery-men/" + item.delivery_man_id}>
                            {item.delivery_man_name}
                          </Link>
                        )}
                      </td>
                      <td>
                        <Link to={"/orders/" + item._id} className="btn-edit">
                          <i className="ri-edit-box-fill"></i>
                        </Link>{" "}
                        <Link
                          onClick={() => deleteHandler(item._id)}
                          className="btn-delete"
                        >
                          <i className="ri-delete-bin-5-fill"></i>
                        </Link>
                      </td>
                    </tr>
                  ))
                )}
              </>
            ) : (
              <tr>
                <td colSpan={11}>
                  <Loader />
                </td>
              </tr>
            )}
          </table>
        </div>
      </section>
    </>
  );
};

export default Order;
