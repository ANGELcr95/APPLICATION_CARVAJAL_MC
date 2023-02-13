import React from "react";
import ReactDOM from "react-dom/client";

import {
  BrowserRouter as Router,
  Routes,
  Navigate,
  Route,
} from "react-router-dom";

import "@fortawesome/fontawesome-free/css/all.min.css";
import "assets/scss/argon-dashboard-react.scss";
import "assets/plugins/nucleo/css/nucleo.css";

import { Provider } from "react-redux";
import AdminLayout from "layouts/admin";
import AuthLayout from "layouts/auth";
import { store } from "redux/store";
import NotFound from "components/NotFound";
import routes from "views/routes";

const root = ReactDOM.createRoot(document.getElementById("root"));

const getRoutes = (routes, hash) => {
  return routes.map((prop, key) => {
    if (prop.layout === hash) {
      return (
        <Route
          path={prop.layout + prop.path}
          element={<prop.component />}
          key={key}
        />
      );
    } else {
      return null;
    }
  });
};

root.render(
  <>
    <Provider store={store}>
      <Router>
        <Routes>
          <Route path="/" element={<Navigate replace to="/auth" />} />
          <Route path="/auth" element={<AuthLayout />}>
            {getRoutes(routes, "/auth")}
            <Route
              path="/auth"
              element={<Navigate replace to="/auth/login" />}
            />
          </Route>
          <Route path="/admin" element={<AdminLayout />}>
            {getRoutes(routes, "/admin")}
            <Route
              path="/admin"
              element={<Navigate replace to="/admin/tables" />}
            />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </Provider>
  </>
);
