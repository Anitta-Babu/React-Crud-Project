import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { StudentRow, TableHeader } from "../functions/pureComponents";
import { Link } from "react-router-dom";
import { GetData, DeleteData } from "../functions/dataBaseOperations";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../functions/Auth";

function View() {
  const [data, setData] = useState([]);
  const navigate = useNavigate();
  const location = useLocation();
  const user = useAuth();
  const updateViewHeaders = [
    "ID",
    "Name",
    "Email",
    "Course",
    "Password",
    "Actions",
  ];

  useEffect(() => {
    GetData(setData);
    if (user) {
      navigate(location.pathname);
    }
  }, []);

  const handleDelete = (id) => {
    console.log("Delete student with ID:", id);
    DeleteData(id, setData);
  };

  return (
    <div
      className="d-flex flex-column justify-content-center align-items-center bg-light vh-100 rounded"
      style={{ maxHeight: "650px" }}
    >
      <div className="position-fixed" style={{ top: "20px", left: "20px" }}>
        <Link to="/home" className="fs-5 btn btn-dark rounded-pill">
          Back
        </Link>
      </div>
      <h1
        className="text-center text-primary"
        style={{
          textShadow: "2px 2px 4px rgba(0, 0, 0, 0.5)",
          fontSize: "70px",
        }}
      >
        List Of Students
      </h1>
      <div
        className="w-75 rounded bg-white border shadow p-4"
        style={{ maxHeight: "450px" }}
      >
        <div className="overflow-auto h-100">
          <table className="table table-striped table-bordered table-hover text-center">
            <TableHeader headers={updateViewHeaders} />
            <tbody>
              {data.map((d, index) => (
                <StudentRow
                  key={d.id}
                  student={d}
                  onDelete={handleDelete}
                  showButtons={true}
                  id={index + 1}
                />
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default View;
