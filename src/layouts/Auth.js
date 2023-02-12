
import React, { useEffect, useRef, useState } from "react";
import { useLocation, Outlet} from "react-router-dom";

import { Container, Row, Col } from "reactstrap";

import AuthNavbar from "../components/navbars/AuthNavbar.js";
import Footer from "../components/footers/Footer";

const Auth = (props) => {
  const mainContent = useRef(null);
  const location = useLocation();

  useEffect(() => {
    document.body.classList.add("bg-default");
    return () => {
      document.body.classList.remove("bg-default");
    };
  }, []);


  return (
    <>
      <div className="main-content" ref={mainContent}>
        <AuthNavbar />
        <div className="header bg-gradient-green pt-8 pb-5 py-lg-8">
          <Container>
            <div className="header-body text-center mb-7">
              <Row className="justify-content-center">
                <Col lg="5" md="6">
                  
                  <h1 className="text-white">Bienvenido!</h1>
                  <p className="text-lead text-white">
                    Por favor ingresa tus credenciales para que puedas acceder a tu cuenta :)
                    portal de uso testeo de aplicacion a vacante  prefesional desarrolador.
                  </p>
                </Col>
              </Row>
            </div>
          </Container>
          <div className="separator separator-bottom separator-skew zindex-100">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              preserveAspectRatio="none"
              version="1.1"
              viewBox="0 0 2560 100"
              x="0"
              y="0"
            >
              <polygon
                className="fill-default"
                points="2560 0 2560 100 0 100"
              />
            </svg>
          </div>
        </div>
        
        <Container className="mt--8 pb-5">
          <Row className="justify-content-center">
          <Outlet/>
          </Row>
        </Container>
      </div>
      <Footer />
    </>
  );
};

export default Auth;
