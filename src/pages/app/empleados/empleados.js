import { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Image from "react-bootstrap/Image";
import Modal from "react-bootstrap/Modal"; // Importa el componente Modal de react-bootstrap
import Row from "react-bootstrap/Row";
import "./empleados.css";

function Empleados() {
  const [empleados, setEmpleados] = useState([]);
  const [showDelete, setshowDelete] = useState(false);
  const [showEdit, setshowEdit] = useState(false);
  const [empleadoId, setServiceId] = useState(null);
  const [selectedService, setSelectedService] = useState("");
  const [editServiceValue, setEditServiceValue] = useState(""); // Nuevo estado para el valor del campo de texto

  const handleCloseEdit = () => setshowEdit(false);
  const handleShowEdit = (service) => {
    setshowEdit(true);
    setSelectedService(service);
  };
  const handleClose = () => setshowDelete(false);
  const handleShow = (id) => {
    setshowDelete(true);
    setServiceId(id);
  };
  const borrarServicio = () => {
    const newServices = empleados.filter((empleado) => empleado.id !== empleadoId);
    setEmpleados(newServices);
    handleClose();
  };

  useEffect(() => {
    fetch("https://my.api.mockaroo.com/empleados.json?key=be2e9200")
      .then((response) => response.json())
      .then((data) => setEmpleados(data))
      .catch((error) => console.error("Error fetching comments:", error));
  }, []);
  return (
    <Container>
      <Row>
        <Col style={{ height: "100vh" }}>
          <ul>
            {empleados.map((empleado) => (
              <li key={empleado.id}>
                <Row
                  id="item"
                  className="justify-content-between"
                  style={{
                    padding: "40px",
                  }}
                >
                  <Col
                    style={{
                      fontSize: "20px",
                      fontWeight: "bold",
                      textAlign: "left",
                    }}
                  >
                    {empleado.nombre}
                  </Col>
                  <Col style={{ height: "20px" }} xs={2}>
                    <Row>
                      <Col>
                        <Image
                          src="https://cdn-icons-png.flaticon.com/512/1077/1077687.png"
                          alt="Lapiz"
                          onClick={() => handleShowEdit(empleado)}
                          style={{ cursor: "pointer", height: "30px" }}
                        />
                      </Col>
                      <Col>
                        <Image
                          src="https://cdn-icons-png.flaticon.com/512/1017/1017530.png"
                          alt="Basura"
                          onClick={() => handleShow(empleado.id)}
                          style={{ cursor: "pointer", height: "30px" }}
                        />
                      </Col>
                    </Row>
                  </Col>
                </Row>
              </li>
            ))}
          </ul>
        </Col>

      <Modal show={showDelete} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Eliminar Servicio</Modal.Title>
        </Modal.Header>
        <Modal.Body>¿Está seguro que desea eliminar este servicio</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancelar
          </Button>
          <Button variant="secondary" onClick={borrarServicio}>
            Aceptar
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal show={showEdit} onHide={handleCloseEdit}>
        <Modal.Header closeButton>
          <Modal.Title>Editar Servicio</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="formBasicEmail">
              <Form.Label>Nombre del Servicio:</Form.Label>
              <Form.Control
                type="text"
                value={editServiceValue}
                onChange={(e) => setEditServiceValue(e.target.value)}
                placeholder={selectedService.service}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseEdit}>
            Cancelar
          </Button>
          <Button variant="secondary" onClick={handleCloseEdit}>
            Aceptar
          </Button>
        </Modal.Footer>
      </Modal>
    </Row>
    </Container>
  );
}

export default Empleados;
