import React, { useEffect, useState } from "react";
import "./dashboard.css";
import { Link } from "react-router-dom";
import axios from "axios";
import Loader from "../loader/Loader";

const Profile = () => {
  // GET CUSTOMER DETAILS
  const id = localStorage.getItem("cID");
  const [customer, setCustomer] = useState({});
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const fatchCustomer = async () => {
      const { data } = await axios.get(
        process.env.REACT_APP_SERVER + `/api/admin/customers/${id}`,
        {
          headers: {
            Authorization: localStorage.getItem("cToken"),
          },
        }
      );
      setCustomer(data);
      setLoading(true);
    };
    fatchCustomer();
  }, [customer, id]);

  // CUSTOMER LOGOUT
  const customerLogout = () => {
    localStorage.removeItem("cToken");
    localStorage.removeItem("cID");
    localStorage.removeItem("cName");
    window.location.href = "/";
  };

  return (
    <>
      <div className="user-profile">
        {loading ? (
          <>
            {!customer.thumb ? (
              <img src="/img/placeholder.png" alt="" />
            ) : (
              <img
                src={
                  process.env.REACT_APP_SERVER + "/customers/" + customer.thumb
                }
                alt=""
              />
            )}
            <div className="user-details">
              <p>
                <i className="fa fa-fw fa-user"></i> {customer.name}
              </p>
              <p>
                <i className="fa fa-fw fa-phone"></i> {customer.phone}
              </p>
              <p>
                <i className="fa fa-fw fa-envelope"></i> {customer.email}
              </p>
              <p>
                <i className="fa fa-fw fa-location-dot"></i> {customer.address}
              </p>
              <Link to="/customer">Dashboard</Link>{" "}
              <Link to="/customer/settings">Setting</Link>{" "}
              <Link to="/customer/profile-picture">Picture</Link>{" "}
              <Link to="/customer/password">Password</Link>{" "}
              <Link
                onClick={() => {
                  customerLogout();
                }}
              >
                Logout
              </Link>
            </div>
          </>
        ) : (
          <Loader />
        )}
      </div>
    </>
  );
};

export default Profile;
