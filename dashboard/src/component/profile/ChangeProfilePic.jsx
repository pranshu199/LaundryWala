import React, { useEffect, useState } from "react";
import Title from "../common/title/Title";
import axios from "axios";
import Swal from "sweetalert2";
import Loader from "../common/loader/Loader";

const ChangeProfilePic = () => {
  const [currentThumb, setThumb] = useState("");
  const [loaidng, setLoading] = useState(false);

  // GET CUSTOMER DETAILS
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
      setThumb(data.thumb);
      setLoading(true);
    };
    fatchAdmin();
  }, [id]);

  const submitHandler = (e) => {
    e.preventDefault();
    let updateData = {
      thumb: document.querySelector("#thumb").files[0],
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

  // SHOWING UPLOADED IMAGE
  const [file, setFile] = useState();
  function handleThumbChange(e) {
    setFile(URL.createObjectURL(e.target.files[0]));
  }

  return (
    <>
      <section className="profile content">
        <Title title="Change Profile Picture" />
        <div className="profile-content">
          {loaidng ? (
            <form enctype="multipart/form-data" onSubmit={submitHandler}>
              {file ? (
                <img src={file} alt="" />
              ) : (
                <img
                  src={process.env.REACT_APP_SERVER + "/users/" + currentThumb}
                  alt=""
                />
              )}
              <div className="mb-3">
                <input
                  type="file"
                  onChange={handleThumbChange}
                  id="thumb"
                  className="form-control"
                  required
                />
              </div>

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

export default ChangeProfilePic;
