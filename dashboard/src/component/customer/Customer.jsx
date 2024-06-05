import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Title from "../common/title/Title";
import "./customer.css";
import axios from "axios";
import Swal from "sweetalert2";
import Loader from "../common/loader/Loader";

const Customer = () => {
  // GET CUSTOMERS
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(false);
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
      setCustomers(data);
      setLoading(true);
    };
    fatchCustomers();
  }, [customers]);

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
      <section className="customer content">
        <Title title="Customers" />
        <div className="customer-items">
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
                {customers.length === 0 ? (
                  <tr>
                    <td className="text-center" colSpan="9">
                      No items found!
                    </td>
                  </tr>
                ) : (
                  customers.map((item) => (
                    <tr>
                      <td>
                        <img
                          src={
                            process.env.REACT_APP_SERVER +
                            "/customers/" +
                            item.thumb
                          }
                          alt={item.name}
                        />
                      </td>
                      <td>
                        <Link to={"/customers/" + item._id}>{item.name}</Link>
                      </td>
                      <td>{item.email}</td>
                      <td>{item.phone}</td>
                      <td>{item.address}</td>
                      <td>
                        <Link
                          to={"/customers/" + item._id}
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

export default Customer;
