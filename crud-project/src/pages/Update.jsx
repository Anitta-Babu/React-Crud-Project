import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useQuery, useMutation } from "@apollo/client";
import { GET_STUDENT_BYID, UPDATE_STUDENT } from "../GraphQl/Queries";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../functions/Auth";

function Update() {
  const { id } = useParams();
  const [formData, setFormData] = useState({
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
  const [showToast, setShowToast] = useState(false);
  const [unsuccessfulMessage, setUnsuccessfulMessage] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useAuth();

  const {
    loading,
    data,
    error: queryError,
  } = useQuery(GET_STUDENT_BYID, {
    variables: { id },
  });

  const [updateStudent] = useMutation(UPDATE_STUDENT);

  useEffect(() => {
    if (data && data.student) {
      if (user) {
        navigate(location.pathname);
      }
      setFormData({
        firstName: data.student.firstName || "",
        lastName: data.student.lastName || "",
        age: data.student.age || "",
        dateOfBirth: data.student.dateOfBirth || "",
        gender: data.student.gender || "",
        email: data.student.email || "",
        course: data.student.course || "",
        country: data.student.country || "",
      });
    } else if (queryError) {
      setError("Student data not found.");
    }
  }, [data, queryError, user, navigate, location.pathname]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.firstName || !formData.course) {
      setError("Please fill in all fields.");
      return;
    }
    setError("");
    setUnsuccessfulMessage("");

    try {
      const { data } = await updateStudent({
        variables: {
          id,
          input: { ...formData },
        },
      });
      if (data.updateStudent) {
        setShowToast(true);
        setTimeout(() => {
          setShowToast(false);
        }, 1500);
      } else {
        setUnsuccessfulMessage("Failed to update student data.");
      }
    } catch (error) {
      setUnsuccessfulMessage("Failed to update student data.");
    }
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div className="d-flex W-100 vh-100 justify-content-center align-items-center bg-light">
      <div className="w-75 border bg-white shadow px-5 pt-3 pb-5 rounded">
        <h1 className="text-center text-success p-3 fw-bold text-uppercase">
          Update Student
        </h1>
        {error && <div className="alert alert-danger">{error}</div>}
        {unsuccessfulMessage && (
          <div className="alert alert-danger">{unsuccessfulMessage}</div>
        )}
        <form onSubmit={handleSubmit}>
          <div className="mb-2 row">
            <div className="col-md-6">
              <label htmlFor="firstName" className="form-label fw-bold">
                First Name
              </label>
              <input
                type="text"
                name="firstName"
                className="form-control"
                value={formData.firstName}
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
                value={formData.lastName}
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="mb-2 row">
            <div className="col-md-6">
              <label htmlFor="email" className="form-label fw-bold">
                Email
              </label>
              <input
                type="email"
                name="email"
                className="form-control"
                value={formData.email}
                readOnly
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
                value={formData.dateOfBirth}
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="mb-2 row">
            <div className="col-md-6">
              <label htmlFor="age" className="form-label fw-bold">
                Age
              </label>
              <input
                type="number"
                name="age"
                className="form-control"
                value={formData.age}
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
                value={formData.course}
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="mb-2 row">
            <div className="col-md-6">
              <label htmlFor="gender" className="form-label fw-bold">
                Gender
              </label>
              <input
                type="text"
                name="gender"
                className="form-control"
                value={formData.gender}
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
                value={formData.country}
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="mb-4 d-flex justify-content-start">
            <button className="btn btn-success me-3">Submit</button>
            <Link className="btn btn-info" to="/viewStudent">
              Back
            </Link>
          </div>
        </form>
      </div>

      <div
        className={`toast align-items-center text-white bg-success ${
          showToast ? "show" : ""
        }`}
        style={{
          position: "absolute",
          top: "20px",
          content: "20px",
          zIndex: 1050,
          transition: "opacity 0.5s ease-in-out",
        }}
      >
        <div className="d-flex">
          <div className="toast-body">Student data updated successfully!</div>
        </div>
      </div>
    </div>
  );
}

export default Update;
