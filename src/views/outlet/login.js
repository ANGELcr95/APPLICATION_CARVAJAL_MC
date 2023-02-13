import {
  Button,
  Card,
  CardBody,
  FormGroup,
  Form,
  Input,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
  Row,
  Col,
} from "reactstrap";
import { useNavigate } from "react-router-dom";

import postAxios from "services/postAxios";
import useLocalStorage from "hooks/useLocalStorage";

import { useDispatch } from "react-redux";
import { useState } from "react";
import { setLogin } from "redux/loginSlice";
import { setToken } from "redux/loginSlice";

import Swal from "sweetalert2";

const Login = () => {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [, setValueUser] = useLocalStorage("user", "");
  const [, setValue] = useLocalStorage("token", "");

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const validateForm = () => {
    const emailRegexp = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
    if (form.email === "" || form.password === "") {
      return { message: "Todos los campos son obligatorios", type: "error" };
    }
    if (form.password.length < 8) {
      return {
        message: "La contraseña debe tener al menos 8 caracteres",
        type: "error",
      };
    }
    if (!emailRegexp.test(form.email)) {
      return { message: "El email no es válido", type: "error" };
    }
    return { message: "Formulario válido", type: "success" };
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setForm({ ...form, [name]: value });
  };

  const handleErrorLogin = () => {
    Swal.fire({
      title: "Error!",
      text: "El email o la contraseña son incorrectos",
      icon: "error",
      confirmButtonText: "Ok",
    });
  };

  const handleLogin = async () => {
    const validate = validateForm();
    if (validate.type === "success") {
      const { user, token } = await postAxios("/auth/login", form);

      if (!token) {
        handleErrorLogin();
        return;
      }
      dispatch(setLogin(`${user?.name} ${user?.last_name}`));
      dispatch(setToken(token));
      setValueUser(`${user?.name} ${user?.last_name}`);
      setValue(token);
      navigate("/admin");
      return;
    }
    Swal.fire({
      title: "Error!",
      text: validate.message,
      icon: "error",
      confirmButtonText: "Ok",
    });
  };

  return (
    <>
      <Col lg="5" md="7">
        <Card className="bg-secondary shadow border-0">
          <CardBody className="px-lg-5 py-lg-5">
            <div className="text-center text-muted mb-4">
              <small>Inicia sesion en el portal</small>
            </div>
            <Form role="form">
              <FormGroup className="mb-3">
                <InputGroup className="input-group-alternative">
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>
                      <i className="ni ni-email-83" />
                    </InputGroupText>
                  </InputGroupAddon>
                  <Input
                    onChange={handleInputChange}
                    value={form.email}
                    name="email"
                    placeholder="Correo"
                    type="email"
                    autoComplete="new-email"
                  />
                </InputGroup>
              </FormGroup>
              <FormGroup>
                <InputGroup className="input-group-alternative">
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>
                      <i className="ni ni-lock-circle-open" />
                    </InputGroupText>
                  </InputGroupAddon>
                  <Input
                    onChange={handleInputChange}
                    value={form.password}
                    name="password"
                    placeholder="Contraseña"
                    type="password"
                    autoComplete="new-password"
                  />
                </InputGroup>
              </FormGroup>
              <div className="custom-control custom-control-alternative custom-checkbox">
                <input
                  className="custom-control-input"
                  id=" customCheckLogin"
                  type="checkbox"
                />
              </div>
              <div className="text-center">
                <Button
                  className="my-4"
                  color="success"
                  type="button"
                  onClick={handleLogin}
                >
                  Entrar
                </Button>
              </div>
            </Form>
          </CardBody>
        </Card>
        <Row className="mt-3">
          <Col className="text-right pointer" xs="12">
            <p
              className="text-light"
              onClick={() => navigate("/auth/register")}
            >
              <small>Crear nueva cuenta</small>
            </p>
          </Col>
        </Row>
      </Col>
    </>
  );
};

export default Login;
