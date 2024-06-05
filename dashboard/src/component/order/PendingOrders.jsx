import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Title from "../common/title/Title";
import "./order.css";
import axios from "axios";
import moment from "moment";
import Loader from "../common/loader/Loader";

const PendingOrders = () => {
  // GET COMPLETED ORDER
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
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
      const completeOrder = data.filter((curData) => {
        return (
          curData.status.toLowerCase() !== "delivered" &&
          curData.status.toLowerCase() !== "cancelled"
        );
      });
      setOrders(completeOrder);
      setLoading(true);
    };
    fatchOrders();
  }, [orders]);

  return (
    <>
      <section className="order content">
        <Title title="Pending Orders" />
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
              <th>Exp_Time</th>
              <th>Delivery_man</th>
            </tr>
            {loading ? (
              <>
                {orders.length === 0 ? (
                  <tr>
                    <td className="text-center" colSpan="13">
                      No items found!
                    </td>
                  </tr>
                ) : (
                  orders.map((item) => (
                    <tr>
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
                      <td>{item.payment}</td>
                      <td>
                        <span className="btn-small">{item.status}</span>
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
                    </tr>
                  ))
                )}
              </>
            ) : (
              <tr>
                <td colSpan={10}>
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

export default PendingOrders;
