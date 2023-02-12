import { NavItem, NavLink, Nav, Container, Row, Col } from "reactstrap";

const Login = () => {
  return (
    <>
      <footer className="py-5">
        <Container>
          <Row className="align-items-center justify-content-xl-between">
            <Col xl="6">
              <div className="copyright text-center text-xl-left text-muted">
                © {new Date().getFullYear()}{" "}
                <a
                  className="font-weight-bold ml-1"
                >
                  Ing-Developer Miguel Angel Camacho
                </a>
              </div>
            </Col>
            <Col xl="6">
              <Nav className="nav-footer justify-content-center justify-content-xl-end">
                <NavItem>
                  <NavLink
                    href="https://www.linkedin.com/in/miguel-angel-camacho-ramirez-4288211a7/"
                    target="_blank"
                  >
                    Linkedin
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink
                    href="https://github.com/ANGELcr95"
                    target="_blank"
                  >
                    GitHub
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink
                    href="https://web.whatsapp.com/send?phone=573214806752"
                    target="_blank"
                  >
                    Whatsapp
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink
                    href="https://www.facebook.com/miguelangel.camachoramirez.9/"
                    target="_blank"
                  >
                    Facebook
                  </NavLink>
                </NavItem>
              </Nav>
            </Col>
          </Row>
        </Container>
      </footer>
    </>
  );
};

export default Login;
