import useLocalStorage from "hooks/useLocalStorage";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Form, Navbar, Container, Button } from "reactstrap";
import { setLogin } from "redux/loginSlice";

const AdminNavbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [, setValueUser] = useLocalStorage("user", "");

  return (
    <>
      <Navbar className="navbar-top navbar-dark" expand="md" id="navbar-main">
        <Container fluid>
          <Form className="navbar-search navbar-search-dark "></Form>
          <Button
            onClick={() => {
              setValueUser();
              dispatch(setLogin(null));
              localStorage.removeItem("token");
              navigate("/auth");
            }}
          >
            <i className="ni ni-user-run" />
            <span>Salir</span>
          </Button>
        </Container>
      </Navbar>
    </>
  );
};

export default AdminNavbar;
