import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import {
  MenuDropdown,
  StudentRow,
  TableHeader,
} from "../functions/pureComponents";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../functions/Auth";
import { useQuery } from "@apollo/client";
import { GET_STUDENTS } from "../GraphQl/Queries";

function Home() {
  const homeViewHeaders = ["S.No", "Name", "Email", "Course"];
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useAuth();

  const { loading, error, data } = useQuery(GET_STUDENTS);

  useEffect(() => {
    if (user) {
      navigate(location.pathname);
    }
  }, [user, navigate, location.pathname]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error fetching data: {error.message}</p>;

  return (
    <div
      className="d-flex flex-column justify-content-center align-items-center bg-light vh-100 rounded"
      style={{ maxHeight: "650px" }}
    >
      <div className="position-fixed" style={{ top: "20px", left: "20px" }}>
        <MenuDropdown />
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
            <TableHeader headers={homeViewHeaders} />
            <tbody>
              {data.students.map((d, index) => (
                <StudentRow
                  key={d.id}
                  student={d}
                  showButtons={false}
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

export default Home;
