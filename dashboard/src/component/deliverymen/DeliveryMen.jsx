import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Title from "../common/title/Title";
import "./deliverymen.css";
import axios from "axios";
import Swal from "sweetalert2";
import Loader from "../common/loader/Loader";

export const DeliveryMen = () => {
  // GET DELIVERY MEN
  const [deliveryMen, setDeliveryMen] = useState([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const fatchDeliveryMen = async () => {
      const { data } = await axios.get(
        process.env.REACT_APP_SERVER + "/api/admin/delivery-men",
        {
          headers: {
            Authorization: localStorage.getItem("aToken"),
          },
        }
      );
      setDeliveryMen(data);
      setLoading(true);
    };
    fatchDeliveryMen();
  }, [deliveryMen]);

  // DELETE DELIVERY MAN
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
          .catch((error) => {
            Swal.fire({
              icon: "error",
              title: "Oops...",
              text: "Delivery men deleted field!",
            });
          });
      }
    });
  };

  return (
    <>
      <section className="delivery-men content">
        <Title title="Delivery Men" />
        <div className="delivery-men-items">
          <Link to="/new-man" className="btn-primary">
            Add Delivery Man
          </Link>
          <table>
            <tr>
              <th>Thumb</th>
              <th>Name</th>
              <th>Email</th>
              <th>phone</th>
              <th>Address</th>
              <th>Action</th>
            </tr>
            {loading ? (
              <>
                {deliveryMen.length === 0 ? (
                  <tr>
                    <td className="text-center" colSpan="9">
                      No items found!
                    </td>
                  </tr>
                ) : (
                  deliveryMen.map((item) => (
                    <tr>
                      <td>
                        <img
                          src={
                            process.env.REACT_APP_SERVER +
                            "/delivery-men/" +
                            item.thumb
                          }
                          alt={item.name}
                        />
                      </td>
                      <td>
                        <Link to={"/delivery-men/" + item._id}>
                          {item.name}
                        </Link>
                      </td>
                      <td>{item.email}</td>
                      <td>{item.phone}</td>
                      <td>{item.address}</td>
                      <td>
                        <Link
                          to={"/delivery-men/" + item._id}
                          className="btn-success"
                        >
                          <i className="ri-eye-fill"></i>
                        </Link>{" "}
                        <Link
                          onClick={() => deleteHandler(item._id, item.thumb)}
                          className="btn-delete"
                        >
                          <i className="ri-delete-bin-5-fill"></i>
                        </Link>
                      </td>
                    </tr>
                  ))
                )}
              </>
            ) : (
              <tr>
                <td colSpan={6}>
                  <Loader />
                </td>
              </tr>
            )}
          </table>
        </div>
      </section>
    </>
  );
};
export default DeliveryMen;
