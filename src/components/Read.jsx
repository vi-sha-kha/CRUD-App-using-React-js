import axios from "axios";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { Link } from "react-router-dom";

function Read() {
  const [apiData, setApiData] = useState([]);

  function getData() {
    axios
      .get("https://647f2153c246f166da90216c.mockapi.io/crud")
      .then((response) => {
        console.log(response.data);
        setApiData(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }
  useEffect(() => {
    getData();
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete(
        `https://647f2153c246f166da90216c.mockapi.io/crud/${id}`
      );

      // Fetch updated data after deletion
      const response = await axios.get(
        "https://647f2153c246f166da90216c.mockapi.io/crud"
      );
      const updatedData = response.data;

      // Update the IDs
      updatedData.forEach((item, index) => {
        item.id = index + 1;
      });

      setApiData(updatedData);
    } catch (error) {
      console.log(error);
    }
  };

  const setDatatoStorage = (id, name, age, email) => {
    localStorage.setItem("id", id);
    localStorage.setItem("name", name);
    localStorage.setItem("age", age);
    localStorage.setItem("email", email);
  };

  // const handleDelete = (id) => {
  //   axios
  //     .delete(`https://647f2153c246f166da90216c.mockapi.io/crud/${id}`)
  //     .then(() => {
  //       getData();
  //     })
  //     .catch((error) => {
  //       console.log("error");
  //     });
  // };
  // const setDatatoStorage = (id, name, age, email) => {
  //   localStorage.setItem("id", id);
  //   localStorage.setItem("name", name);
  //   localStorage.setItem("age", age);
  //   localStorage.setItem("email", email);
  // };
  return (
    <>
      <div className="row">
        <div className="col-md-30">
          <div className="mb-3 mt-3">
            <Link to="/create">
              <button className="btn btn-success">Create</button>
            </Link>
          </div>
          <table className="table table-bordered table-striped table-hover">
            <thead>
              <tr>
                <th>ID</th>
                <th>NAME</th>
                <th>AGE</th>
                <th>EMAIL</th>
                <th>EDIT</th>
                <th>DELETE</th>
              </tr>
            </thead>
            <tbody>
              {apiData.map((item) => {
                return (
                  <React.Fragment key={item.id}>
                    <tr key={item.id}>
                      <td>{item.id}</td>
                      <td>{item.key_name}</td>
                      <td>{item.key_age}</td>
                      <td>{item.key_email}</td>
                      <td>
                        <Link to="/edit">
                          <button
                            className="btn btn-success"
                            onClick={() =>
                              setDatatoStorage(
                                item.id,
                                item.key_name,
                                item.key_age,
                                item.key_email
                              )
                            }
                          >
                            Edit
                          </button>
                        </Link>
                      </td>
                      <td>
                        <button
                          className="btn btn-danger"
                          onClick={() => {
                            if (
                              window.confirm("Are you sure you want to delete?")
                            ) {
                              handleDelete(item.id);
                            }
                          }}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  </React.Fragment>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

export default Read;
