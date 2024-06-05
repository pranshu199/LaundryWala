import React, { useEffect, useState } from "react";
import Title from "../common/title/Title";
import "./customer.css";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import moment from "moment";
import Swal from "sweetalert2";
import Loader from "../common/loader/Loader";

const SingleCustomer = () => {
  // GET CUSTOMER DETAILS
  const { id } = useParams();
  const [customer, setCustomer] = useState({});
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const fatchCustomer = async () => {
      const { data } = await axios.get(
        process.env.REACT_APP_SERVER + `/api/admin/customers/${id}`,
        {
          headers: {
            Authorization: localStorage.getItem("aToken"),
          },
        }
      );
      setCustomer(data);
      setLoading(true);
    };
    fatchCustomer();
  }, [customer, id]);

  // GET ORDERS
  const [orders, setOrders] = useState([]);
  const [loaidng2, setLoading2] = useState(false);
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
        return curData.customer_id === id;
      });
      setOrders(fatchOrders);
      setLoading2(true);
    };
    fatchOrders();
  }, [orders, id]);

  // CUSTOMER DELETE
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
              `/api/admin/customers/${id}?thumb=${thumb}`,
            {
              headers: {
                Authorization: localStorage.getItem("aToken"),
              },
            }
          )
          .then((response) => {
            Swal.fire({
              icon: "success",
              text: "Customer deleted successfull.",
              showConfirmButton: false,
              timer: 1000,
            }).then(() => (window.location.href = "/customers"));
          })
          .catch((error) => {
            Swal.fire({
              icon: "error",
              title: "Oops...",
              text: "Customer deleted field!",
            });
          });
      }
    });
  };

  return (
    <>
      <section className="single-customer content">
        <Title title="Customer Profile" />
        <div className="profile-items">
          {loading ? (
            <div className="left">
              {customer.thumb ? (
                <img
                  src={
                    process.env.REACT_APP_SERVER +
                    "/customers/" +
                    customer.thumb
                  }
                  alt={customer.name}
                />
              ) : (
                <img src="/img/placeholder.png" alt={customer.name} />
              )}
              <div className="card">
                <ul className="list-group list-group-flush">
                  <li className="list-group-item">
                    <b>Name: </b> {customer.name}
                  </li>
                  <li className="list-group-item">
                    <b>Email: </b> {customer.email}
                  </li>
                  <li className="list-group-item">
                    <b>Phone: </b> {customer.phone}
                  </li>
                  <li className="list-group-item">
                    <b>Address: </b> {customer.address}
                  </li>
                </ul>
              </div>
              <Link className="btn-primary" to="/customers">
                BACK
              </Link>{" "}
              <Link
                onClick={() => deleteHandler(customer._id, customer.thumb)}
                className="btn-delete"
              >
                DELETE
              </Link>
            </div>
          ) : (
            <Loader />
          )}
          {loaidng2 ? (
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

export default SingleCustomer;
