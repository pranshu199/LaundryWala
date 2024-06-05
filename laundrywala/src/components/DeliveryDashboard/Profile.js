import React, { useEffect, useState } from "react";
import "./dashboard.css";
import { Link } from "react-router-dom";
import axios from "axios";
import Loader from "../loader/Loader";

const Profile = () => {
  // GET DELIVERY MAN DETAILS
  const id = localStorage.getItem("dID");
  const [deliveryMan, setDeliveryMan] = useState({});
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const fatchDeliveryMan = async () => {
      const { data } = await axios.get(
        process.env.REACT_APP_SERVER + `/api/admin/delivery-men/${id}`,
        {
          headers: {
            Authorization: localStorage.getItem("dToken"),
          },
        }
      );
      setDeliveryMan(data);
      setLoading(true);
    };
    fatchDeliveryMan();
  }, [deliveryMan, id]);

  // DELIVERY LOGOUT
  const deliveryLogout = () => {
    localStorage.removeItem("dToken");
    localStorage.removeItem("dID");
    window.location.href = "/";
  };

  return (
    <>
      <div className="user-profile">
        {loading ? (
          <>
            {" "}
            {!deliveryMan.thumb ? (
              <img src="/img/placeholder.png" alt={deliveryMan.name} />
            ) : (
              <img
                src={
                  process.env.REACT_APP_SERVER +
                  "/delivery-men/" +
                  deliveryMan.thumb
                }
                alt={deliveryMan.name}
              />
            )}
            <div className="user-details">
              <p>
                <i className="fa fa-fw fa-user"></i> {deliveryMan.name}
              </p>
              <p>
                <i className="fa fa-fw fa-phone"></i> {deliveryMan.phone}
              </p>
              <p>
                <i className="fa fa-fw fa-envelope"></i> {deliveryMan.email}
              </p>
              <p>
                <i className="fa fa-fw fa-location-dot"></i>{" "}
                {deliveryMan.address}
              </p>
              <Link to="/delivery">Dashboard</Link>{" "}
              <Link to="/delivery/settings">Setting</Link>{" "}
              <Link to="/delivery/profile-picture">Picture</Link>{" "}
              <Link to="/delivery/password">Password</Link>{" "}
              <Link
                onClick={() => {
                  deliveryLogout();
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
