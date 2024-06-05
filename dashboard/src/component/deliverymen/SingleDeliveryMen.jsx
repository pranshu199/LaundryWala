import React, { useEffect, useState } from "react";
import Title from "../common/title/Title";
import "./deliverymen.css";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import moment from "moment";
import Swal from "sweetalert2";
import Loader from "../common/loader/Loader";

const SingleDeliveryMen = () => {
  // GET DELIVERY MEN DETAILS
  const { id } = useParams();
  const [deliveryMen, setDeliveryMne] = useState({});
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const fatchDeliveryMen = async () => {
      const { data } = await axios.get(
        process.env.REACT_APP_SERVER + `/api/admin/delivery-men/${id}`,
        {
          headers: {
            Authorization: localStorage.getItem("aToken"),
          },
        }
      );
      setDeliveryMne(data);
      setLoading(true);
    };
    fatchDeliveryMen();
  }, [deliveryMen, id]);

  // GET ORDERS
  const [orders, setOrders] = useState([]);
  const [loading2, setLoading2] = useState(false);
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
      const fatchOrders = data.filter((curData) => {
        return curData.delivery_man_id === id;
      });
      setOrders(fatchOrders);
      setLoading2(true);
    };
    fatchOrders();
  }, [orders, id]);

  // DELIVERY MAN DELETE
  const deleteHandler = (id, thumb) => {
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
          .delete(
            process.env.REACT_APP_SERVER +
              `/api/admin/delivery-men/${id}?thumb=${thumb}`,
            {
              headers: {
                Authorization: localStorage.getItem("aToken"),
              },
            }
          )
          .then((response) => {
            Swal.fire({
              icon: "success",
              text: "Delete successfull.",
              showConfirmButton: false,
              timer: 1000,
            }).then(() => (window.location.href = "/delivery-men"));
          })
          .catch((error) => {
            Swal.fire({
              icon: "error",
              title: "Oops...",
              text: "Man deleted field!",
            });
          });
      }
    });
  };

  return (
    <>
      <section className="single-customer content">
        <Title title="Delivery Man Profile" />
        <div className="profile-items">
          {loading ? (
            <div className="left">
              {deliveryMen.thumb ? (
                <img
                  src={
                    process.env.REACT_APP_SERVER +
                    "/delivery-men/" +
                    deliveryMen.thumb
                  }
                  alt={deliveryMen.name}
                />
              ) : (
                <img src="/img/placeholder.png" alt={deliveryMen.name} />
              )}
              <div className="card">
                <ul className="list-group list-group-flush">
                  <li className="list-group-item">
                    <b>Name: </b> {deliveryMen.name}
                  </li>
                  <li className="list-group-item">
                    <b>Email: </b> {deliveryMen.email}
                  </li>
                  <li className="list-group-item">
                    <b>Phone: </b> {deliveryMen.phone}
                  </li>
                  <li className="list-group-item">
                    <b>Address: </b> {deliveryMen.address}
                  </li>
                </ul>
              </div>
              <Link className="btn-primary" to="/delivery-men">
                BACK
              </Link>{" "}
              <Link
                onClick={() =>
                  deleteHandler(deliveryMen._id, deliveryMen.thumb)
                }
                className="btn-delete"
              >
                DELETE
              </Link>
            </div>
          ) : (
            <Loader />
          )}

          {loading2 ? (
            <div className="right">
              <table className="customers-order">
                <tr>
                  <th>Order ID</th>
                  <th>Order date</th>
                  <th>Order status</th>
                  <th>Action</th>
                </tr>
                {orders.length === 0 ? (
                  <tr>
                    <td className="text-center" colSpan="10">
                      No items found!
                    </td>
                  </tr>
                ) : (
                  orders.map((item, index) => (
                    <tr key={index}>
                      <td>
                        <Link to={"/orders/" + item._id}>{item._id}</Link>
                      </td>
                      <td>{moment(item.order_date).format("lll")}</td>
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
                      <td>
                        <Link
                          to={"/orders/" + item._id}
                          className="btn-success"
                        >
                          <i className="ri-eye-fill"></i>
                        </Link>
                      </td>
                    </tr>
                  ))
                )}
              </table>
            </div>
          ) : (
            <Loader />
          )}
        </div>
      </section>
    </>
  );
};

export default SingleDeliveryMen;
