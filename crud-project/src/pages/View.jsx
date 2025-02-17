import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { StudentRow, TableHeader } from "../functions/pureComponents";
import { Link } from "react-router-dom";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../functions/Auth";
import { useQuery, useMutation } from "@apollo/client";
import { GET_STUDENTS, DELETE_STUDENT } from "../GraphQl/Queries";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function View() {
  const navigate = useNavigate();
  const location = useLocation();
  const user = useAuth();
  const updateViewHeaders = ["S.No", "Name", "Email", "Course", "Actions"];
  const { loading, error, data } = useQuery(GET_STUDENTS);

  const [deleteStudent] = useMutation(DELETE_STUDENT, {
    refetchQueries: [{ query: GET_STUDENTS }],
    onCompleted: () => {
      toast.success("Student deleted successfully!");
    },
    onError: (err) => {
      toast.error("Error deleting student: " + err.message);
    },
  });

  useEffect(() => {
    if (user) {
      navigate(location.pathname);
    }
  }, [user, navigate, location.pathname]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error fetching data: {error.message}</p>;

  const handleDelete = async (id) => {
    const response = await deleteStudent({ variables: { id } });
    console.log(response);
  };

  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
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
                {data.students.map((d, index) => (
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
    </>
  );
}

export default View;
