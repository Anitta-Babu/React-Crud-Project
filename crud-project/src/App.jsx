import React, { Suspense, lazy } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { AuthProvider } from "./functions/Auth";
import ProtectedRoute from "./functions/ProtectedRoute";
 

const Home = lazy(() => import("./pages/Home"));
const View = lazy(() => import("./pages/View"));
const Create = lazy(() => import("./pages/Create"));
const Update = lazy(() => import("./pages/Update"));
const Login = lazy(() => import("./pages/Login"));

const LoadingSpinner = () => (
  <div className="d-flex justify-content-center align-items-center vh-100">
    <div className="spinner-border" role="status">
      <span className="visually-hidden">Loading.....</span>
    </div>
  </div>
);

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Suspense fallback={<LoadingSpinner />}>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route
              path="/home"
              element={<ProtectedRoute element={<Home />} />}
            />
            <Route
              path="/viewStudent"
              element={<ProtectedRoute element={<View />} />}
            />
            <Route
              path="/updateStudent/:id"
              element={<ProtectedRoute element={<Update />} />}
            />
            <Route
              path="/createStudent"
              element={<ProtectedRoute element={<Create />} />}
            />
          </Routes>
        </Suspense>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
