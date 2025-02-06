import React, { useState, useRef, useEffect, useCallback } from "react";
import { isValidUser } from "../functions/dataBaseOperations";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../functions/Auth";

function Login() {
  const { login, user } = useAuth();
  const InputRef = useRef(null);
  const navigate = useNavigate();
  const [values, setValues] = useState({
    email: "",
    password: "",
  });
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showErrorModal, setShowErrorModal] = useState(false);
  const location = useLocation();
  useEffect(() => {
    console.log(location);
    
    if (InputRef.current) {
      InputRef.current.focus();
    }
  }, []);

  const handleChange = useCallback((e) => {
    const { name: inputFieldName, value } = e.target;
    setValues((prevValues) => ({ ...prevValues, [inputFieldName]: value }));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const isUser = await isValidUser(values);

    if (isUser) {
      login(values);
      setShowSuccessModal(true);
      setTimeout(() => {
        navigate("/home");
      }, 1000);
    } else {
      setShowErrorModal(true);
    }
  };

  const handleCloseSuccessModal = () => {
    setShowSuccessModal(false);
  };

  const handleCloseErrorModal = () => {
    setShowErrorModal(false);
  };

  return (
    <div className="d-flex w-100 vh-100 justify-content-center align-items-center bg-light">
      <div className="w-50 border bg-white shadow px-5 pt-3 pb-5 rounded">
        <h1 className="text-center text-success p-3 fw-bold text-uppercase">
          Please LogIn !
        </h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-3 row">
            <label htmlFor="email" className="col-sm-2 form-label fw-bold">
              Email
            </label>
            <input
              type="email"
              name="email"
              className="form-control"
              ref={InputRef}
              placeholder="Enter the user name"
              value={values.email}
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
              placeholder="Enter the user password "
              value={values.password}
              onChange={handleChange}
            />
          </div>
          <div className="mb-4 d-flex justify-content-start">
            <button className="btn btn-success me-3">Submit</button>
          </div>
        </form>
      </div>

      {showSuccessModal && (
        <div
          className="modal fade show"
          style={{ display: "block", backgroundColor: "rgba(0, 0, 0, 0.5)" }}
        >
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title text-success">Login Successful</h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={handleCloseSuccessModal}
                ></button>
              </div>
              <div className="modal-body text-center">
                <p className="text-success">
                  🎉 You have successfully logged in! 🎉
                </p>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={handleCloseSuccessModal}
                >
                  Ok
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {showErrorModal && (
        <div
          className="modal fade show"
          style={{ display: "block", backgroundColor: "rgba(0, 0, 0, 0.5)" }}
        >
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title text-danger">Login Failed</h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={handleCloseErrorModal}
                ></button>
              </div>
              <div className="modal-body text-center">
                <p className="text-danger">
                  ❌ Invalid email or password. Please try again. ❌
                </p>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={handleCloseErrorModal}
                >
                  Ok
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Login;
