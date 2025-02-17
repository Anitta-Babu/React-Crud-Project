import React, { useState, useRef, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../functions/Auth";
import { CREATE_STUDENT } from "../GraphQl/Queries";
import { useMutation } from "@apollo/client";

function Create() {
  const [values, setValues] = useState({
    firstName: "",
    lastName: "",
    age: "",
    gender: "",
    dateOfBirth: "",
    email: "",
    country: "",
    course: "",
  });

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
  }, [user, navigate, location.pathname]);

  const handleChange = useCallback((e) => {
    const { name: inputFieldName, value } = e.target;

    if (inputFieldName === "age") {
      setValues((prevValues) => ({
        ...prevValues,
        [inputFieldName]: value ? parseInt(value, 10) : "",
      }));
    } else {
      setValues((prevValues) => ({ ...prevValues, [inputFieldName]: value }));
    }
  }, []);

  const [createStudent, { loading }] = useMutation(CREATE_STUDENT, {
    onCompleted: () => {
      setSuccessMessage("Student added successfully!");
      setError("");
    },
    onError: (err) => {
      setError("Error adding student: " + err.message);
      setSuccessMessage("");
    },
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !values.firstName ||
      !values.lastName ||
      !values.age ||
      !values.gender ||
      !values.dateOfBirth ||
      !values.email ||
      !values.course ||
      !values.country
    ) {
      setError("All fields are required.");
      setSuccessMessage("");
      return;
    }

    try {
      const response = await createStudent({
        variables: { input: { ...values } },
      });
      console.log(response);
    } catch (err) {
      console.error("Error: ", err);
    }
  };

  return (
    <div className="d-flex W-100 vh-100 justify-content-center align-items-center bg-light">
      <div className="w-75 border bg-white shadow px-5 pt-3 pb-5 rounded">
        <h1 className="text-center text-success p-3 fw-bold text-uppercase">
          Add New Student
        </h1>
        {error && <div className="alert alert-danger">{error}</div>}
        {successMessage && (
          <div className="alert alert-success">{successMessage}</div>
        )}
        <form onSubmit={handleSubmit}>
          <div className="row mb-2">
            <div className="col-md-6">
              <label htmlFor="firstName" className="form-label fw-bold">
                First Name
              </label>
              <input
                type="text"
                name="firstName"
                className="form-control"
                placeholder="Enter the student first name"
                ref={nameInputRef}
                value={values.firstName}
                onChange={handleChange}
              />
            </div>
            <div className="col-md-6">
              <label htmlFor="lastName" className="form-label fw-bold">
                Last Name
              </label>
              <input
                type="text"
                name="lastName"
                className="form-control"
                placeholder="Enter the student last name"
                value={values.lastName}
                onChange={handleChange}
              />
            </div>
            <div className="col-md-6">
              <label htmlFor="email" className="form-label fw-bold">
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

            <div className="col-md-6">
              <label htmlFor="dateOfBirth" className="form-label fw-bold">
                Date Of Birth
              </label>
              <input
                type="date"
                name="dateOfBirth"
                className="form-control"
                placeholder="Enter the student date of birth"
                value={values.dateOfBirth}
                onChange={handleChange}
              />
            </div>
            <div className="col-md-6">
              <label htmlFor="age" className="form-label fw-bold">
                Age
              </label>
              <input
                type="number"
                name="age"
                className="form-control"
                placeholder="Enter the student age"
                value={values.age}
                onChange={handleChange}
              />
            </div>
            <div className="col-md-6">
              <label htmlFor="course" className="form-label fw-bold">
                Course
              </label>
              <input
                type="text"
                name="course"
                className="form-control"
                placeholder="Enter the student course"
                value={values.course}
                onChange={handleChange}
              />
            </div>
            <div className="col-md-6">
              <label htmlFor="country" className="form-label fw-bold">
                Country
              </label>
              <input
                type="text"
                name="country"
                className="form-control"
                placeholder="Enter the student country"
                value={values.country}
                onChange={handleChange}
              />
            </div>
            <div className="col-md-6">
              <label htmlFor="gender" className="form-label fw-bold">
                Gender
              </label>
              <input
                type="text"
                name="gender"
                className="form-control"
                placeholder="Enter the student gender"
                value={values.gender}
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="mb-4 d-flex justify-content-start">
            <button className="btn btn-success me-3" disabled={loading}>
              {loading ? "Submitting..." : "Submit"}
            </button>
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
