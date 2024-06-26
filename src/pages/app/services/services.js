import { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Image from "react-bootstrap/Image";
import Modal from "react-bootstrap/Modal";
import Row from "react-bootstrap/Row";
import { FormattedMessage } from "react-intl";
import "./services.css";

function Services() {
  const [services, setServices] = useState([]);
  const [showDelete, setshowDelete] = useState(false);
  const [showEdit, setshowEdit] = useState(false);
  const [serviceId, setServiceId] = useState(null);
  const [selectedService, setSelectedService] = useState("");
  const [editServiceValue, setEditServiceValue] = useState("");

  const editarServicio = () => {
    const existingService = services.find(
        (service) => service.id === selectedService.id
    );

    if (existingService) {
      const newServices = services.map((service) => {
        if (service.id === selectedService.id) {
          return { ...service, service: editServiceValue };
        }
        return service;
      });
      setServices(newServices);
    } else {
      setServices([
        ...services,
        { id: selectedService.id, service: editServiceValue },
      ]);
    }
    setEditServiceValue("");
    handleCloseEdit();
  };
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
    const newServices = services.filter((service) => service.id !== serviceId);
    setServices(newServices);
    handleClose();
  };

  useEffect(() => {
    fetch(
        "https://raw.githubusercontent.com/jmontenegroc/datos/main/services.json"
    )
        .then((response) => response.json())
        .then((data) => setServices(data))
        .catch((error) => console.error("Error fetching comments:", error));
  }, []);
  return (
      <Container>
        <Row>
          <Col style={{ height: "100vh" }}>
            <ul>
              <li>
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
                    <FormattedMessage id="admin.as" />
                  </Col>
                  <Col xs={1}>
                    <Image
                        src="https://cdn.icon-icons.com/icons2/1993/PNG/512/add_circle_create_expand_new_plus_icon_123218.png"
                        alt="Agregar"
                        onClick={() =>
                            handleShowEdit({
                              id: services.length + 1,
                              service: "Nuevo servicio",
                            })
                        }
                        style={{ cursor: "pointer", height: "30px", width: "30px" }}
                    />
                  </Col>
                </Row>
              </li>
              {services.map((service) => (
                  <li key={service.id}>
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
                        {service.service}
                      </Col>
                      <Col style={{ height: "20px" }} xs={2}>
                        <Row>
                          <Col>
                            <Image
                                src="https://cdn-icons-png.flaticon.com/512/1077/1077687.png"
                                alt="Lapiz"
                                onClick={() => handleShowEdit(service)}
                                style={{ cursor: "pointer", height: "30px" }}
                            />
                          </Col>
                          <Col>
                            <Image
                                src="https://cdn-icons-png.flaticon.com/512/1017/1017530.png"
                                alt="Basura"
                                onClick={() => handleShow(service.id)}
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
              <Modal.Title><FormattedMessage id="admin.tds" /></Modal.Title>
            </Modal.Header>
            <Modal.Body><FormattedMessage id="admin.ss" /></Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleClose}>
                <FormattedMessage id="admin.cancelar" />
              </Button>
              <Button variant="secondary" onClick={borrarServicio}>
                <FormattedMessage id="admin.aceptar" />
              </Button>
            </Modal.Footer>
          </Modal>

          <Modal show={showEdit} onHide={handleCloseEdit}>
            <Modal.Header closeButton>
              <Modal.Title><FormattedMessage id="admin.tes" /></Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Form>
                <Form.Group controlId="formBasicEmail">
                  <Form.Label><FormattedMessage id="admin.nombre" /></Form.Label>
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
                <FormattedMessage id="admin.cancelar" />
              </Button>
              <Button variant="secondary" onClick={editarServicio}>
                <FormattedMessage id="admin.aceptar" />
              </Button>
            </Modal.Footer>
          </Modal>
        </Row>
      </Container>
  );
}

export default Services;