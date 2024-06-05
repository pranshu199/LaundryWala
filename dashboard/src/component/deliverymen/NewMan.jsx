import axios from "axios";
import React, { useState } from "react";
import Swal from "sweetalert2";
import Title from "../common/title/Title";

const NewMan = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");

  const submitHandler = (e) => {
    e.preventDefault();
    let data = {
      name,
      email,
      phone,
      address,
    };
    axios
      .post(process.env.REACT_APP_SERVER + "/api/admin/delivery-men", data, {
        headers: {
          "Content-Type": "application/json",
          Authorization: localStorage.getItem("aToken"),
        },
      })
      .then((response) => {
        if (response.data.message === "Registration successfull.") {
          Swal.fire({
            icon: "success",
            text: response.data.message,
            showConfirmButton: false,
            timer: 1000,
          }).then(() => (window.location.href = "/delivery-men"));
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
          text: "Email already exist.",
        });
      });
  };

  return (
    <>
      <section className="delivery-men content">
        <Title title="New Delivery Man" />
        <div className="delivery-men-content">
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

export default NewMan;
