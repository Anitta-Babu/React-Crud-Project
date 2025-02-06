import React from "react";
import { Dropdown } from "react-bootstrap";
import { FaEye, FaUserPlus, FaSignOutAlt } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useAuth } from "./Auth";
export const MenuDropdown = React.memo(() => {
  const { user, logout } = useAuth();
  return (
    <Dropdown>
      <Dropdown.Toggle
        variant="success"
        id="dropdown-basic"
        className="rounded-pill shadow"
      >
        Menu
      </Dropdown.Toggle>

      <Dropdown.Menu className="shadow-lg">
        <Dropdown.Item
          as={Link}
          to="/viewStudent"
          className="d-flex align-items-center"
        >
          <FaEye className="me-2" /> View Students
        </Dropdown.Item>
        <Dropdown.Item
          as={Link}
          to="/createStudent"
          className="d-flex align-items-center"
        >
          <FaUserPlus className="me-2" /> Add New Student
        </Dropdown.Item>
        <Dropdown.Item onClick={logout} className="d-flex align-items-center">
          <FaSignOutAlt className="me-2" /> Logout
        </Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
});

export const StudentRow = React.memo(({ student, onDelete, showButtons, id }) => {
  return (
    <tr>
      <td>{id}</td> 
      <td>{student.name}</td>
      <td>{student.email}</td>
      <td>{student.course}</td>
      <td>{student.password}</td>
      {showButtons ? (
        <td>
          <Link
            to={{
              pathname: `/updateStudent/${student.id}`,
              state: { student },
            }}
            className="btn btn-warning me-2"
          >
            Edit
          </Link>
          <button
            className="btn btn-danger"
            onClick={() => onDelete(student.id)}
          >
            Delete
          </button>
        </td>
      ) : null}
    </tr>
  );
});

export const TableHeader = React.memo(({ headers }) => {
  return (
    <thead className="table-dark">
      <tr>
        {headers.map((header, index) => (
          <th key={index}>{header}</th>
        ))}
      </tr>
    </thead>
  );
});
