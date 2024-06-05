import React, { useEffect, useState } from "react";
import Title from "../common/title/Title";
import "./profile.css";
import { Link } from "react-router-dom";
import axios from "axios";
import moment from "moment";
import Loader from "../common/loader/Loader";

const Profile = () => {
  // GET ADMIN DETAILS
  const id = localStorage.getItem("aID");
  const [admin, setAdmin] = useState({});
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const fatchAdmin = async () => {
      const { data } = await axios.get(
        process.env.REACT_APP_SERVER + `/api/admin/users/${id}`,
        {
          headers: {
            Authorization: localStorage.getItem("aToken"),
          },
        }
      );
      setAdmin(data);
      setLoading(true);
    };
    fatchAdmin();
  }, [admin, id]);

  return (
    <>
      <section className="profile content">
        <Title title="Profile" />
        <div className="profile-items admin-profile">
          {loading ? (
            <div className="left">
              <img
                src={process.env.REACT_APP_SERVER + "/users/" + admin.thumb}
                alt={admin.name}
              />
              <div className="card">
                <ul className="list-group list-group-flush">
                  <li className="list-group-item">
                    <b>Name: </b> {admin.name}
                  </li>
                  <li className="list-group-item">
                    <b>Username: </b> {admin.username}
                  </li>
                  <li className="list-group-item">
                    <b>Email: </b> {admin.email}
                  </li>
                  <li className="list-group-item">
                    <b>Phone: </b> {admin.phone}
                  </li>
                  <li className="list-group-item">
                    <b>Joining Date: </b> {moment(admin.date).format("ll")}
                  </li>
                  <li className="list-group-item">
                    <b>Address: </b> {admin.address}
                  </li>
                  <li>
                    <Link className="btn-small" to="/change-details">
                      Settings
                    </Link>{" "}
                    <Link className="btn-small" to="/change-profile-pic">
                      Change picture
                    </Link>{" "}
                    <Link className="btn-small" to="/change-password">
                      Change password
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          ) : (
            <Loader />
          )}
        </div>
      </section>
    </>
  );
};

export default Profile;
