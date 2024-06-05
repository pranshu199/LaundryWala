import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Loader from "../common/loader/Loader";

const CartItems = () => {
  // Loading
  const [loading, setLoading] = useState(false);

  // Get Customers
  const [customers, setCustomers] = useState();
  useEffect(() => {
    const fatchCustomers = async () => {
      const { data } = await axios.get(
        process.env.REACT_APP_SERVER + "/api/admin/customers",
        {
          headers: {
            Authorization: localStorage.getItem("aToken"),
          },
        }
      );
      setCustomers(data.length);
    };
    fatchCustomers();
  }, [customers]);

  // Get Delivery Men
  const [riders, setRiders] = useState();
  useEffect(() => {
    const fatchRiders = async () => {
      const { data } = await axios.get(
        process.env.REACT_APP_SERVER + "/api/admin/delivery-men",
        {
          headers: {
            Authorization: localStorage.getItem("aToken"),
          },
        }
      );
      setRiders(data.length);
    };
    fatchRiders();
  }, [riders]);

  // Get Admin
  const [admins, setAdmins] = useState();
  useEffect(() => {
    const fatchAdmins = async () => {
      const { data } = await axios.get(
        process.env.REACT_APP_SERVER + "/api/admin/users",
        {
          headers: {
            Authorization: localStorage.getItem("aToken"),
          },
        }
      );
      setAdmins(data.length);
    };
    fatchAdmins();
  }, [customers]);

  // Get Orders
  const [orders, setOrders] = useState([]);
  const [pendingOrders, setPendingOrders] = useState([]);
  const [completeOrders, setCompleteOrders] = useState([]);
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
      const pendingOrder = data.filter((curData) => {
        return (
          curData.status.toLowerCase() !== "delivered" &&
          curData.status.toLowerCase() !== "cancelled"
        );
      });
      const completeOrder = data.filter((curData) => {
        return curData.status.toLowerCase() === "delivered";
      });
      setPendingOrders(pendingOrder);
      setCompleteOrders(completeOrder);
      setOrders(data);
      setLoading(true);
    };
    fatchOrders();
  }, [orders]);

  // Branch wise revenue
  const [query, setQuery] = useState("");
  const [revenue, setRevenue] = useState([]);
  const [branchName, setBranchName] = useState("");
  useEffect(() => {
    const fatchRevenue = async () => {
      const { data } = await axios.get(
        process.env.REACT_APP_SERVER + `/api/admin/revenue?q=${query}`,
        {
          headers: {
            Authorization: localStorage.getItem("aToken"),
          },
        }
      );
      setRevenue(data);
      setBranchName(query);
    };
    fatchRevenue();
  }, [query]);

  return (
    <>
      {loading ? (
        <>
          <div className="dashboard-cards">
            <Link to="/orders">
              <div className="single-card">
                <div className="card-content">
                  <h4>Total Orders</h4>
                  <span>{orders.length}+</span>
                </div>
                <span className="card-icon">
                  <i className="ri-shopping-basket-line"></i>
                </span>
              </div>
            </Link>

            <Link to="/pending-orders">
              <div className="single-card">
                <div className="card-content">
                  <h4>Pending Orders</h4>
                  <span>{pendingOrders.length}+</span>
                </div>
                <span className="card-icon">
                  <i className="ri-exchange-dollar-fill"></i>
                </span>
              </div>
            </Link>

            <Link to="/complete-orders">
              <div className="single-card">
                <div className="card-content">
                  <h4>Complete Orders</h4>
                  <span>{completeOrders.length}+</span>
                </div>
                <span className="card-icon">
                  <i className="ri-check-double-fill"></i>
                </span>
              </div>
            </Link>
          </div>
          <div className="dashboard-cards">
            {/* Total Customers */}
            <Link to="/customers">
              <div className="single-card">
                <div className="card-content">
                  <h4>Total Customer</h4>
                  <span>{customers}+</span>
                </div>
                <span className="card-icon">
                  <i class="ri-map-pin-user-fill"></i>
                </span>
              </div>
            </Link>

            <Link to="/delivery-men">
              <div className="single-card">
                <div className="card-content">
                  <h4>Total Delivery Man</h4>
                  <span>{riders}+</span>
                </div>
                <span className="card-icon">
                  <i class="ri-truck-line"></i>
                </span>
              </div>
            </Link>

            <Link to="/users">
              <div className="single-card">
                <div className="card-content">
                  <h4>Total Admin</h4>
                  <span>{admins}+</span>
                </div>
                <span className="card-icon">
                  <i class="ri-team-line"></i>
                </span>
              </div>
            </Link>
          </div>
          <div className="dashboard-cards">
            <div>
              <h4>Branch Wise Sales</h4>
              <select
                name="branchName"
                onChange={(e) => setQuery(e.target.value)}
              >
                <option value="">Select Branch</option>
                <option value="Toronto">Toronto Branch</option>
                <option value="Ottawa">Ottawa Branch</option>
                <option value="sudbury">sudbury Branch</option>
                <option value="Peterborough">Peterborough Branch</option>
                <option value="GEC">GEC Branch</option>
                <option value="Missisauga">Missisauga Branch</option>
                <option value="Dewanhat">Dewanhat Branch</option>
              </select>
            </div>

            {query && (
              <Link>
                <div className="single-card">
                  <div className="card-content">
                    <h4>{branchName} Branch</h4>
                    <h3>
                      <span>
                        ${" "}
                        {revenue.length !== 0 ? (
                          revenue.map((item) => (
                            <span>{item._id && item.revenue + "+"}</span>
                          ))
                        ) : (
                          <span>0+</span>
                        )}
                      </span>
                    </h3>
                  </div>
                  <span className="card-icon">
                    <i className="ri-briefcase-4-fill"></i>
                  </span>
                </div>
              </Link>
            )}
          </div>
        </>
      ) : (
        <Loader />
      )}
    </>
  );
};

export default CartItems;
