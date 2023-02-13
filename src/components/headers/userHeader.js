import useLocalStorage from "hooks/useLocalStorage";
import { useSelector } from "react-redux";
import { Container, Row, Col } from "reactstrap";

const UserHeader = () => {
  let { user } = useSelector((state) => state.login);
  const [localuser] = useLocalStorage("user", "");

  if (!user) {
    user = localuser;
  }

  return (
    <>
      <div className="header pb-3 pt-5 pt-xl-4  d-flex align-items-center">
        <span className="mask bg-gradient-default opacity-8" />
        <Container className="d-flex align-items-center">
          <Row>
            <Col lg="7" md="10">
              <h1 className="display-2 text-white">Hola {`${user}  :)`}</h1>
              <p className="text-white mt-0 mb-5">
                Aqui puedes ver tu listar a tus contactos !!!
              </p>
            </Col>
          </Row>
        </Container>
      </div>
    </>
  );
};

export default UserHeader;
