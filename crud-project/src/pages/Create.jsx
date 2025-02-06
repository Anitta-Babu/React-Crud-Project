import React, { useState, useRef, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import { CreateData } from "../functions/dataBaseOperations";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../functions/Auth";
function Create() {
  const [values, setValues] = useState({
    name: "",
    email: "",
    course: "",
    password: "",
  });

  const [students, setStudents] = useState([]);
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const nameInputRef = useRef(null);
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useAuth();
  useEffect(() => {
    if (user) {
      navigate(location.pathname);
    }
    if (nameInputRef.current) {
      nameInputRef.current.focus();
    }
  }, []);

  const handleChange = useCallback((e) => {
    const { name: inputFieldName, value } = e.target;
    setValues((prevValues) => ({ ...prevValues, [inputFieldName]: value }));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!values.name || !values.email || !values.course || !values.password) {
      setError("All fields are required.");
      setSuccessMessage("");
      return;
    }

    const response = await CreateData(values, setStudents);
    if (!response.success) {
      setError(response.message);
      setSuccessMessage("");
    } else {
      setSuccessMessage(response.message);
      setValues({ name: "", email: "", course: "", password: "" });
      setError("");
    }
  };

  return (
    <div className="d-flex w-100 vh-100 justify-content-center align-items-center bg-light">
      <div className="w-50 border bg-white shadow px-5 pt-3 pb5 rounded">
        <h1 className="text-center text-success p-3 fw-bold text-uppercase">
          Add New Student
        </h1>
        {error && <div className="alert alert-danger">{error}</div>}
        {successMessage && (
          <div className="alert alert-success">{successMessage}</div>
        )}{" "}
        <form onSubmit={handleSubmit}>
          <div className="mb-2 row">
            <label htmlFor="name" className="col-sm-2 form-label fw-bold">
              Name
            </label>
            <input
              type="text"
              name="name"
              className="form-control"
              placeholder="Enter the student name "
              ref={nameInputRef}
              value={values.name}
              onChange={handleChange}
            />
          </div>
          <div className="mb-3 row">
            <label htmlFor="email" className="col-sm-2 form-label fw-bold">
              Email
            </label>
            <input
              type="email"
              name="email"
              className="form-control"
              placeholder="Enter the student email"
              value={values.email}
              onChange={handleChange}
            />
          </div>
          <div className="mb-2 row">
            <label htmlFor="course" className="col-sm-2 form-label fw-bold">
              Course
            </label>
            <input
              type="text"
              name="course"
              className="form-control"
              placeholder="Enter the student course "
              value={values.course}
              onChange={handleChange}
            />
          </div>
          <div className="mb-4 row">
            <label htmlFor="password" className="col-sm-2 form-label fw-bold">
              Password
            </label>
            <input
              type="password"
              name="password"
              className="form-control"
              placeholder="Enter the student password "
              value={values.password}
              onChange={handleChange}
            />
          </div>
          <div className="mb-4 d-flex justify-content-start">
            <button className="btn btn-success me-3">Submit</button>
            <Link className="btn btn-info" to="/home">
              Back
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Create;
