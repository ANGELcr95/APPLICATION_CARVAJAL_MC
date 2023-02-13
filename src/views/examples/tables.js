import { Card, CardHeader, Table, Container, Row } from "reactstrap";

import UserHeader from "components/headers/userHeader";
import { useSelector } from "react-redux";
import getAxios from "services/getAxios";
import { useEffect, useState } from "react";
import { ContacTable } from "components/tables/contactTable";
import { CreatedTable } from "components/tables/createdTable";

import useLocalStorage from "hooks/useLocalStorage";

const Tables = () => {
  const [contacts, setContacts] = useState([]);
  const [flag, setFlag] = useState(false);

  let { token } = useSelector((state) => state.login);

  const [localtoken] = useLocalStorage("token", "");
  if (!token) {
    token = localtoken;
  }

  const getContacts = async () => {
    const { contacts } = await getAxios(`/contacts`, token);
    if (!contacts) return;
    const contactUtil = contacts.map((contact) => {
      const objectContact = { ...contact };
      return objectContact;
    });
    contactUtil.reverse();
    setContacts(contactUtil);
  };

  useEffect(() => {
    getContacts();
  }, [flag]);

  const rowContacts = contacts.map((contact) => (
    <ContacTable contact={contact} setFlag={setFlag} flag={flag} />
  ));

  return (
    <>
      <UserHeader />
      <Container className="mt--7" fluid>
        <Row>
          <CreatedTable setFlag={setFlag} flag={flag} />
        </Row>
      </Container>
      <Container fluid>
        <Row>
          <div className="col mt-6 mb-5">
            <Card className="shadow">
              <CardHeader className="border-0">
                <h3 className="mb-0">Mis Contactos</h3>
              </CardHeader>
              <Table className="align-items-center table-flush" responsive>
                <thead className="thead-light">
                  <tr>
                    <th scope="col">Nombre</th>
                    <th scope="col">Apellidos</th>
                    <th scope="col">Correo</th>
                    <th scope="col">Pais</th>
                    <th scope="col">Tipo Contacto</th>
                    <th scope="col">Celular</th>
                    <th scope="col">Direccion</th>
                    <th scope="col">Acciones</th>
                    <th scope="col">Acciones</th>
                  </tr>
                </thead>
                <tbody>{rowContacts}</tbody>
              </Table>
            </Card>
          </div>
        </Row>
      </Container>
    </>
  );
};

export default Tables;
