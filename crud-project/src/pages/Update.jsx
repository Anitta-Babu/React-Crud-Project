import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { GetDataById, UpdateDataById } from "../functions/dataBaseOperations";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../functions/Auth";
function Update() {
  const { id } = useParams();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    course: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [showToast, setShowToast] = useState(false);
  const [unsuccessfulMessage, setUnsuccessfulMessage] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useAuth();
  useEffect(() => {
    const fetchStudentData = async () => {
      const studentData = await GetDataById(id);
      if (studentData) {
        if (user) {
          navigate(location.pathname);
        }
        setFormData({
          name: studentData.name || "",
          email: studentData.email || "",
          course: studentData.course || "",
          password: studentData.password || "",
        });
      } else {
        setError("Student data not found.");
      }
    };

    fetchStudentData();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.course || !formData.password) {
      setError("Please fill in all fields.");
      return;
    }
    setError("");
    setUnsuccessfulMessage("");

    const updatedData = await UpdateDataById(id, formData);
    if (updatedData) {
      setShowToast(true);
      setTimeout(() => {
        setShowToast(false);
      }, 1500);
    } else {
      setUnsuccessfulMessage("Failed to update student data.");
    }
  };

  return (
    <div className="d-flex w-100 vh-100 justify-content-center align-items-center bg-light">
      <div className="w-50 border bg-white shadow px-5 pt-3 pb-5 rounded">
        <h1 className="text-center text-success p-3 fw-bold text-uppercase">
          Update Student
        </h1>
        {error && <div className="alert alert-danger">{error}</div>}
        {unsuccessfulMessage && (
          <div className="alert alert-danger">{unsuccessfulMessage}</div>
        )}
        <form onSubmit={handleSubmit}>
          <div className="mb-2 row">
            <label htmlFor="name" className="col-sm-2 form-label fw-bold">
              Name
            </label>
            <input
              type="text"
              name="name"
              className="form-control"
              value={formData.name}
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
              value={formData.email}
              readOnly
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
              value={formData.course}
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
              value={formData.password}
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
