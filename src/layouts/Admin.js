
import React, { useEffect, useRef, useState } from "react";
import { useLocation, Outlet, Navigate} from "react-router-dom";

import { Container } from "reactstrap";

// import AdminNavbar from "components/Navbars/AdminNavbar.js";
// import AdminFooter from "components/Footers/AdminFooter.js";
// import Sidebar from "components/Sidebar/Sidebar.js";

import routes from "../views/routes.js";
import { useSelector } from "react-redux";
import useLocalStorage from "../hooks/useLocalStorage.js";

const Admin = () => {
  const location = useLocation();
  const { user } = useSelector((state) => state.login)
  const [localuser] = useLocalStorage('user', '')

  const getBrandText = (path) => {
    for (let i = 0; i < routes.length; i++) {
      if (
        location.pathname.indexOf(routes[i].layout + routes[i].path) !==
        -1
      ) {
        return routes[i].name;
      }
    }
    return "Brand";
  };

  if (!user && !localuser  ) {
    return <Navigate to={'/auth'} replace />;
  }

  return (
    <>
    <h1>Admin</h1>
      {/* <Sidebar
      routes={routes}
        logo={{
          innerLink: "/admin/index",
          imgSrc: require("../assets/img/brand/argon-react.png"),
          imgAlt: "..."
        }}
      />
      <div className="main-content">
        <AdminNavbar
          brandText={getBrandText(location.pathname)}
        />
          <Outlet/>
        <Container fluid>
          <AdminFooter />
        </Container>
      </div> */}
    </>
  );
};

export default Admin;
