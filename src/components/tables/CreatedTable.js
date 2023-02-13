import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Button,
  Card,
  CardHeader,
  Input,
  Table,
} from "reactstrap";

import Swal from "sweetalert2";
import putAxios from "services/putAxios";
import useLocalStorage from "hooks/useLocalStorage";
import postAxios from "services/postAxios";
import { setContact } from "redux/contactSlice";

export const CreatedTable = ({setFlag, flag }) => {
  const [form, setForm] = useState({
    name: "",
    last_name: "",
    email: "",
    country: "",
    type_id: 1,
    cell_phone: "",
    address: ""
  });

  let { contact } = useSelector((state) => state.contact);

  const[ disable, setDisable] = useState(true)

  const [type_id] = useState([
    { id: 1, name: "FAMILIAR" },
    { id: 2, name: "AMIGOS" },
    { id: 3, name: "TRABAJADORES" },
  ]);
  
  const [country] = useState([
    { id: "Colombia", name: "Colombia" },
    { id: "Ecuador", name: "Ecuador" },
    { id: "Brazil", name: "Brazil" },
  ]);

  useEffect(() => {
    if (contact) {
      setForm(contact)
      setDisable(true)
    } else {
      setForm({
        name: "",
        last_name: "",
        email: "",
        country: "",
        type_id: 1,
        cell_phone: "",
        address: ""
      })
    }
  }, [contact])
  


  let { token } = useSelector((state) => state.login);
  const dispatch = useDispatch();

  const [localtoken] = useLocalStorage("token", "");
  if (!token) {
    token = localtoken;
  }

  const validateForm = () => {
    const emailRegexp = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
    if (
      form.name === "" ||
      form.last_name === ""
    ) {
      return { message: "Diligencie los campos requeridos *", type: "error" };
    }
  
    if (form.email && !emailRegexp.test(form.email)) {
      return { message: "El email no es válido", type: "error" };
    }
    return { message: "Formulario válido", type: "success" };
  };

  
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setForm({ ...form, [name]: value });
    setDisable(false)
  };

  const countryUtil = country.map((country) => (
    <option key={country.id} value={country.id}>
      {country.name}
    </option>
  ));

  const typeIdUtil = type_id.map((type) => (
    <option key={type.id} value={type.id}>
      {type.name}
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

  
  const handleContact = async (id) => {
    const validate = validateForm();
    if (validate.type === "success") {
      let formUtil = form;
      for (const propertye in formUtil) {
        if (!form[propertye]) {
          delete formUtil[propertye];
        }
      }
      
      if (id) formUtil.type_id = 1
      
      const { error, errors = [], contact } = 
       id ? await putAxios(`/contacts/${id}`, formUtil, token) : 
       await postAxios("/contacts", formUtil, token)
      
      if (!contact) {
        let messageErrors = error || errors[0]?.message
        handleErrorLogin(messageErrors);
        return;
      }
      setFlag(!flag);
      setDisable(true)
      Swal.fire({
        title: "Exitoso!",
        text: `Se ha ${ id ? 'actuzalizado': 'creado'} su contacto ${form.name} correctamente `,
        icon: "success",
        confirmButtonText: "Ok",
      })
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
    <div className="col mt-6">
      <Card className="shadow">
        <CardHeader className="border-0">
          <h3 className="mb-0">Crear Contacto (*) requeridos</h3>
        </CardHeader>
        <Table className="align-items-center table-flush" responsive>
          <thead className="thead-light">
            <tr>
              <th scope="col">Nombre*</th>
              <th scope="col">Apellidos*</th>
              <th scope="col">Correo</th>
              <th scope="col">Pais</th>
              <th scope="col">Tipo Contacto</th>
              <th scope="col">Celular</th>
              <th scope="col">Direccion</th>
              <th scope="col">Acciones</th>
            </tr>
          </thead>
          <tbody>
            <tr className="row-custom">
              <th>
                <Input
                  value={form.name}
                  onChange={handleInputChange}
                  name="name"
                  placeholder="Nombre"
                  type="text"
                />
              </th>
              <th>
                <Input
                  value={form.last_name}
                  onChange={handleInputChange}
                  name="last_name"
                  placeholder="Apellidos"
                  type="text"
                />
              </th>
              <td>
                <Input
                  value={form.email}
                  onChange={handleInputChange}
                  name="email"
                  placeholder="Correo"
                  type="text"
                />
              </td>
              <td>
              <Input
                    type="select"
                    name="select"
                    id="exampleSelect"
                    placeholder={"País"}
                    onChange={(item) => {
                      let country = item.target.value;
                      setForm({
                        ...form,
                        ["country"]: country,
                      });
                      setDisable(false)
                    }}
                  >
                    {form.country ? (
                      <option value="" hidden>
                        {form.country}
                      </option>
                    ) : (
                      <option value="" hidden selected>
                        País
                      </option>
                    )}
                    {country.length && countryUtil}
                  </Input>
              </td>
              <td>
              <Input
                    type="select"
                    name="select"
                    id="exampleSelect"
                    placeholder={"País"}
                    onChange={(item) => {
                      let type_id = item.target.value;
                      setForm({
                        ...form,
                        ["type_id"]: type_id,
                      });
                       setDisable(false)
                    }}
                  >
                    {form.type_id ? (
                      <option value={1} hidden>
                          {form.type_id != 1 ? form.type_id : 'Tipo de Contacto'}
                      </option>
                    ) : (
                      <option value='' hidden selected>
                        Tipo de Contacto
                      </option>
                    )}
                    {type_id.length && typeIdUtil}
                  </Input>
              </td>
              <td>
                <Input
                  value={form.cell_phone? form.cell_phone: '' }
                  onChange={handleInputChange}
                  name="cell_phone"
                  placeholder="Celular"
                  type="text"
                  autoComplete="new-password"
                />
              </td>
              <td>
                <Input
                  value={form.address}
                  onChange={handleInputChange}
                  name="address"
                  placeholder="Dirección"
                  type="text"
                  autoComplete="new-password"
                />
              </td>
             
              <td>
                { !contact ?
                <Button
                  className="d-flex align-items-center"
                  color="success"
                  onClick={() => handleContact()}
                >
                  <i class="fas fa-user-circle"></i>
                  <span>Agregar</span>
                </Button>: <>
                 <Button
                 disabled = { disable}
                 className="d-flex align-items-center"
                 color="primary"
                 onClick={() => {
                  handleContact(form.id)
                }}
               >
                 <i class="fas fa-user-circle"></i>
                 <span>Actualizar</span>
               </Button>
                 <Button
                 className="d-flex align-items-center mt-2"
                 color="info"
                 onClick={() => {
                  dispatch(setContact())
                  setDisable(true)
                }}
               >
                 <i class="fas fa-user-circle"></i>
                 <span>Cancelar</span>
               </Button></>
                }
              </td>
            </tr>
          </tbody>
        </Table>
      </Card>
    </div>
  );
};
