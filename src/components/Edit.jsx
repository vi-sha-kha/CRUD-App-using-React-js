import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Edit = () => {
  const [id, setId] = useState(0);
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [email, setEmail] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    setId(localStorage.getItem("id"));
    setName(localStorage.getItem("name"));
    setAge(localStorage.getItem("age"));
    setEmail(localStorage.getItem("email"));
  }, []);

  // axios
  //   .post("https://647f2153c246f166da90216c.mockapi.io/crud")
  //   .then(() => {
  //     navigate("/");
  //   })
  //   .catch((err) => {
  //     console.log(err);
  //   });

  const handleUpdate = (e) => {
    e.preventDefault();
    axios
      .put(`https://647f2153c246f166da90216c.mockapi.io/crud/${id}`, {
        key_name: name,
        key_age: age,
        key_email: email,
      })
      .then(() => {
        navigate("/");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
      <div className="row">
        <div col-md-8>
          <div mb-2>
            <Link to="/">
              <button className="btn btn-dark">Read</button>
            </Link>
          </div>
          <form onSubmit={handleUpdate}>
            <div className="form-group">
              <label>Enter Name:</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Name"
                className="form-control"
              />
            </div>
            <div className="form-group">
              <label>Enter Age:</label>
              <input
                type="number"
                value={age}
                onChange={(e) => setAge(e.target.value)}
                placeholder="Age"
                className="form-control"
              />
            </div>
            <div className="form-group">
              <label>Enter Email:</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
                className="form-control"
              />
            </div>
            <div className="d-grid">
              <input
                type="submit"
                value="Update"
                className="btn btn-success"
                onSubmit={(e) => handleUpdate()}
              ></input>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Edit;
