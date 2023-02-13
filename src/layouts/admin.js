import React from "react";
import { Outlet, Navigate } from "react-router-dom";

import AdminNavbar from "components/navbars/adminNavbar";
import { useSelector } from "react-redux";
import useLocalStorage from "hooks/useLocalStorage";

const Admin = () => {
  const { token } = useSelector((state) => state.login);
  const [localToken] = useLocalStorage("token", "");

  if (!token && !localToken) {
    return <Navigate to={"/auth"} replace />;
  }

  return (
    <>
      <div className="main-content">
        <AdminNavbar/>
        <Outlet />
      </div>
    </>
  );
};

export default Admin;
