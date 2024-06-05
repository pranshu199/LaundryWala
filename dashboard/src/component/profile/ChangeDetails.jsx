import axios from "axios";
import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import Title from "../common/title/Title";
import Loader from "../common/loader/Loader";

const ChangeDetails = () => {
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [currentThumb, setThumb] = useState("");
  const [loading, setLoading] = useState(false);

  // GET ADMIN DETAILS
  const id = localStorage.getItem("aID");
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
      setName(data.name);
      setUsername(data.username);
      setPhone(data.phone);
      setAddress(data.address);
      setThumb(data.thumb);
      setLoading(true);
    };
    fatchAdmin();
  }, [id]);

  const submitHandler = (e) => {
    e.preventDefault();
    let updateData = {
      name,
      username,
      phone,
      address,
      thumb: currentThumb,
    };
    axios
      .put(
        process.env.REACT_APP_SERVER +
          `/api/admin/users/${id}?cthumb=${currentThumb}`,
        updateData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: localStorage.getItem("aToken"),
          },
        }
      )
      .then((response) => {
        Swal.fire({
          icon: "success",
          text: response.data.message,
          showConfirmButton: false,
          timer: 1000,
        }).then(() => (window.location.href = "/profile"));
      })
      .catch((error) => {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Update field!",
        });
      });
  };

  return (
    <>
      <section className="profile content">
        <Title title="Change Details" />
        <div className="profile-content">
          {loading ? (
            <form enctype="multipart/form-data" onSubmit={submitHandler}>
              <label htmlFor="name">Name</label>
              <input
                type="text"
                className="form-control"
                id="floatingInput"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
              <label htmlFor="username">Username</label>
              <input
                type="text"
                className="form-control"
                id="floatingInput"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
              <label htmlFor="phone">Phone</label>
              <input
                type="tel"
                className="form-control"
                id="floatingInput"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                required
              />
              <label htmlFor="address">Address</label>
              <input
                type="text"
                className="form-control"
                id="floatingInput"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                required
              />

              <input type="submit" className="btn-primary" />
            </form>
          ) : (
            <Loader />
          )}
        </div>
      </section>
    </>
  );
};

export default ChangeDetails;
