import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  FormGroup,
  Form,
  Input,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
  Row,
  Col,
  Label,
} from "reactstrap";

import { useDispatch, useSelector } from "react-redux";
import { setLogin } from "../../redux/loginSlice";
import { setToken } from "../../redux/loginSlice";

import Swal from "sweetalert2";

import getAxios from "../../services/getAxios";
import putAxios from "../../services/putAxios";
import postAxios from "../../services/postAxios";
import useLocalStorage from "../../hooks/useLocalStorage";

const Register = () => {
  const [form, setForm] = useState({
    name: "",
    last_name: "",
    email: "",
    password: "",
    country: "",
    cell_phone: "",
    address: "",
  });
  const [country] = useState([
    { id: "Colombia", name: "Colombia" },
    { id: "Ecuador", name: "Ecuador" },
    { id: "Brazil", name: "Brazil" },
  ]);
  const [passwordStrong, setPasswordStrong] = useState({
    strong: null,
    color: null,
  });

  
  const [, setValueUser] = useLocalStorage("user", "");
  const [, setValue] = useLocalStorage("token", "");

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const validateForm = () => {
    const emailRegexp = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
    if (
      form.email === "" ||
      form.password === "" ||
      form.name === "" ||
      form.last_name === ""
    ) {
      return { message: "Diligencie los campos requeridos *", type: "error" };
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

  const strongPassword = (event) => {
    const { value } = event.target;
    if (!value) {
      setPasswordStrong({ strong: null, color: null });
      return;
    }
    if (value.match(/[A-Z]/) && value.match(/[a-z]/) && value.match(/\d/)) {
      setPasswordStrong({
        strong: "Fuerte",
        color: "Green",
      });
    } else if (
      (value.match(/[A-Z]/) && value.match(/[a-z]/)) ||
      (value.match(/[A-Z]/) && value.match(/\d/)) ||
      (value.match(/[a-z]/) && value.match(/\d/))
    ) {
      setPasswordStrong({
        strong: "Media",
        color: "#e5be01",
      });
    } else {
      setPasswordStrong({
        strong: "Debil",
        color: "Red",
      });
    }
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setForm({ ...form, [name]: value });
  };

  const countryUtil = country.map((country) => (
    <option key={country.id} value={country.id}>
      {country.name}
    </option>
  ));

  const handleErrorLogin = (error) => {
    Swal.fire({
      title: "Error!",
      text: `${error}`,
      icon: "error",
      confirmButtonText: "Ok",
    });
  };

  const handleLogin = async () => {
    const validate = validateForm();

    if (validate.type === "success") {
      let formUtil = form;
      for (const propertye in formUtil) {
        if (!form[propertye]) {
          delete formUtil[propertye];
        }
      }

      const { error, errors = [], token, user } = await postAxios("/users", formUtil);
        console.log(token);
        
      if (!token) {
        let messageErrors = error || errors[0]?.msg
        handleErrorLogin(messageErrors);
        return;
      }
      Swal.fire({
        title: "Exitoso!",
        text: `Se ha creado usuario ${form.email} correctamente `,
        icon: "success",
        confirmButtonText: "Ok",
      })
      .then(() => {
        dispatch(setLogin(`${user?.name} ${user?.last_name}`));
        dispatch(setToken(token));
        setValueUser(`${user?.name} ${user?.last_name}`);
        setValue(token);
        navigate("/admin");
      });
    } else {
      Swal.fire({
        title: "Error!",
        text: validate.message,
        icon: "error",
        confirmButtonText: "Ok",
      });
    }
  };

  return (
    <>
      <div class="d-flex justify-content-center  mt-lg--7 container-fluid">
        <Col lg="6" md="8">
          <Card className="bg-default shadow border-0">
            <CardBody className="px-lg-5 py-lg-5">
              <div className="text-center text-white mb-4">
                <small>
                  Ingrese informacion por favor, campos con * son requeridos
                </small>
              </div>
              <Form>
                <FormGroup>
                  <InputGroup className="input-group-alternative mb-3">
                    <Input
                      onChange={handleInputChange}
                      value={form.name}
                      name="name"
                      type="text"
                      placeholder="Nombre *"
                    />
                  </InputGroup>
                </FormGroup>
                <FormGroup>
                  <InputGroup className="input-group-alternative mb-3">
                    <Input
                      onChange={handleInputChange}
                      value={form.last_name}
                      name="last_name"
                      type="text"
                      placeholder="Apellido(s) *"
                    />
                  </InputGroup>
                </FormGroup>
                <FormGroup>
                  <InputGroup className="input-group-alternative mb-3">
                    <InputGroupAddon addonType="prepend">
                      <InputGroupText>
                        <i className="ni ni-email-83" />
                      </InputGroupText>
                    </InputGroupAddon>
                    <Input
                      onChange={handleInputChange}
                      value={form.email}
                      name="email"
                      type="email"
                      placeholder="Correo *"
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
                      onChange={(event) => {
                        handleInputChange(event);
                        strongPassword(event);
                      }}
                      value={form.password}
                      name="password"
                      type="password"
                      placeholder="Contraseña *"
                      autoComplete="new-password"
                    />
                  </InputGroup>
                </FormGroup>
                <FormGroup>
                  <Input
                    type="select"
                    name="select"
                    id="exampleSelect"
                    placeholder={"Pais"}
                    onChange={(item) => {
                      let country = item.target.value;
                      setForm({
                        ...form,
                        ["country"]: country,
                      });
                    }}
                  >
                    {form.country ? (
                      <option value="" hidden>
                        Pais
                      </option>
                    ) : (
                      <option value="" hidden selected>
                        Pais
                      </option>
                    )}
                    {country.length && countryUtil}
                  </Input>
                </FormGroup>
                <FormGroup>
                  <InputGroup className="input-group-alternative">
                    <Input
                      onChange={(event) => {
                        handleInputChange(event);
                        strongPassword(event);
                      }}
                      value={form.cell_phone}
                      name="cell_phone"
                      type="number"
                      placeholder="Celular"
                      autoComplete="new-cell-phone"
                    />
                  </InputGroup>
                </FormGroup>
                <FormGroup>
                  <InputGroup className="input-group-alternative">
                    <Input
                      onChange={(event) => {
                        handleInputChange(event);
                        strongPassword(event);
                      }}
                      value={form.address}
                      name="address"
                      type="text"
                      placeholder="Direccion"
                      autoComplete="new-address"
                    />
                  </InputGroup>
                </FormGroup>

                <div className="text-muted font-italic">
                  <small>
                    seguridad de la contraseña:{" "}
                    <span
                      className="font-weight-700"
                      style={{ color: passwordStrong.color }}
                    >
                      {passwordStrong.strong}
                    </span>
                  </small>
                </div>
                <div className="text-center">
                  <Button
                    className="mt-4"
                    color="primary"
                    type="button"
                    onClick={handleLogin}
                  >
                    Crear Usuario
                  </Button>
                </div>
              </Form>
            </CardBody>
          </Card>
          <Row className="mt-3">
          <Col className="text-right pointer" xs="12">
              <a className="text-light" onClick={() => navigate('/auth/login')}>
                <small>Volver Inicio</small>
              </a>
          </Col>
        </Row>
        </Col>
      </div>
    </>
  );
};

export default Register;
