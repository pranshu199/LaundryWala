import axios from "axios";
import React, { useState } from "react";
import Title from "../common/title/Title";
import Swal from "sweetalert2";

const NewUser = () => {
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");

  const submitHandler = (e) => {
    e.preventDefault();
    let data = {
      name,
      username,
      email,
      phone,
      address,
    };
    axios
      .post(process.env.REACT_APP_SERVER + "/api/admin/users", data, {
        headers: {
          "Content-Type": "application/json",
          Authorization: localStorage.getItem("aToken"),
        },
      })
      .then((response) => {
        if (response.data.message === "User added successfull.") {
          Swal.fire({
            icon: "success",
            text: response.data.message,
            showConfirmButton: false,
            timer: 1000,
          }).then(() => (window.location.href = "/users"));
        } else if (response.data.message === "Already registered.") {
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: response.data.message,
          });
        }
      })
      .catch((error) => {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Something wrong.",
        });
      });
  };

  return (
    <>
      <section className="user content">
        <Title title="New User" />
        <div className="user-content">
          <form onSubmit={submitHandler}>
            <div className="form-floating mb-3">
              <input
                type="text"
                name="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="form-control"
                placeholder="Name..."
                required
              />
              <label for="floatingInput">Name...</label>
            </div>
            <div className="form-floating mb-3">
              <input
                type="text"
                name="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="form-control"
                placeholder="Username..."
                required
              />
              <label for="floatingInput">Username...</label>
            </div>
            <div className="form-floating mb-3">
              <input
                type="email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="form-control"
                placeholder="Email..."
                required
              />
              <label for="floatingInput">Email...</label>
            </div>
            <div className="form-floating mb-3">
              <input
                type="text"
                className="form-control"
                value="admin (It can be changed later.)"
                readOnly
              />
              <label for="floatingInput">Password...</label>
            </div>
            <div className="form-floating mb-3">
              <input
                type="phone"
                name="phone"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="form-control"
                placeholder="Phone..."
                required
              />
              <label for="floatingInput">Phone...</label>
            </div>
            <div className="form-floating mb-3">
              <input
                type="text"
                name="address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                className="form-control"
                placeholder="Address..."
                required
              />
              <label for="floatingInput">Address...</label>
            </div>
            <input type="submit" className="btn-primary" />
          </form>
        </div>
      </section>
    </>
  );
};

export default NewUser;
