import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";

const Create = () => {
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!name || !age || !email) {
      setError("Please fill in all fields.");
      return;
    }

    axios
      .post("https://647f2153c246f166da90216c.mockapi.io/crud", {
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
        <div className="col-md-8">
          <div className="mb-2 mt-2">
            <Link to="/">
              <button className="btn btn-success">Read</button>
            </Link>
          </div>
          <div className="bg-success p-4 text-center">
            <h1>Create data</h1>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Enter Name:</label>
              <input
                type="text"
                placeholder="Name"
                className="form-control"
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label>Enter Age:</label>
              <input
                type="number"
                placeholder="Age"
                className="form-control"
                onChange={(e) => setAge(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label>Enter Email:</label>
              <input
                type="email"
                placeholder="Email"
                className="form-control"
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            {error && <div className="text-danger">{error}</div>}
            <br />
            <div className="d-grid">
              <input
                type="submit"
                value="Create"
                className="btn btn-success"
              ></input>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Create;
