import { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Image from "react-bootstrap/Image";
import Modal from "react-bootstrap/Modal";
import Row from "react-bootstrap/Row";
import { FormattedMessage } from "react-intl";
// import "./empleados.css";


function Empleados() {
  const [empleados, setEmpleados] = useState([]);
  const [showDelete, setshowDelete] = useState(false);
  const [showEdit, setshowEdit] = useState(false);
  const [selectedEmpleado, setselectedEmpleado] = useState({nombre: "", apellido: "", email: "", foto: ""});
  const [editEmployeeNombre, setEditEmployeeNombre] = useState("");
  const [editEmployeeApellido, setEditEmployeeApellido] = useState("");
  const [editEmployeeEmail, setEditEmployeeEmail] = useState("");
  const [editEmployeeFoto, setEditEmployeeFoto] = useState("");
  const handleCloseEdit = () => setshowEdit(false);
  const handleEditEmployee = () => {
    const existingEmployee = empleados.find(
        (employee) => employee.id === selectedEmpleado.id
    );

    if (existingEmployee) {
      const newEmployees = empleados.map((employee) => {
        if (employee.id === selectedEmpleado.id) {
          return {
            ...employee,
            nombre: editEmployeeNombre,
            apellido: editEmployeeApellido,
            email: editEmployeeEmail,
            foto: editEmployeeFoto,
          };
        }
        return employee;
      });
      setEmpleados(newEmployees);
    } else {
      setEmpleados([
        ...empleados,
        {
          id: selectedEmpleado.id,
          nombre: editEmployeeNombre,
          apellido: editEmployeeApellido,
          email: editEmployeeEmail,
          foto: editEmployeeFoto,
        },
      ]);
    }

    handleCloseEdit();
  };
  const handleShowEdit = (empleado) => {
    setselectedEmpleado(empleado);
    setEditEmployeeNombre(empleado.nombre);
    setEditEmployeeApellido(empleado.apellido);
    setEditEmployeeEmail(empleado.email);
    setEditEmployeeFoto(empleado.foto);
    setshowEdit(true);
  };
  const handleClose = () => setshowDelete(false);
  const handleShow = (empleado) => {
    setshowDelete(true);
    setselectedEmpleado(empleado);
  };
  const borrarEmpleado = (empleado) => {
    setselectedEmpleado(empleado);
    const newServices = empleados.filter(
        (empleado) => empleado.id !== selectedEmpleado.id
    );
    setEmpleados(newServices);
    handleClose();
  };

  useEffect(() => {
    fetch(
        "https://raw.githubusercontent.com/jmontenegroc/datos/main/empleados.json"
    )
        .then((response) => response.json())
        .then((data) => setEmpleados(data))
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
                    <FormattedMessage id="admin.ae"/>
                  </Col>
                  <Col xs={1}>
                    <Image
                        src="https://cdn.icon-icons.com/icons2/1993/PNG/512/add_circle_create_expand_new_plus_icon_123218.png"
                        alt="Agregar"
                        onClick={() =>
                            handleShowEdit({
                              id: empleados.length + 1,
                              service: "Nuevo servicio",
                            })
                        }
                        style={{ cursor: "pointer", height: "30px", width: "30px" }}
                    />
                  </Col>
                </Row>
              </li>
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
                        <Row>
                          <Col><img src={empleado.foto} alt="foto del empleado" style={{borderRadius:'50%', height: '30px', width:'30px'}}/></Col>
                          <Col>{empleado.nombre}</Col>
                        </Row>
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
                                onClick={() => handleShow(empleado)}
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
              <Modal.Title><FormattedMessage id="admin.tde" /></Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <FormattedMessage id="admin.se" />
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleClose}>
                <FormattedMessage id="admin.cancelar" />
              </Button>
              <Button variant="secondary" onClick={borrarEmpleado}>
                <FormattedMessage id="admin.aceptar" />
              </Button>
            </Modal.Footer>
          </Modal>
          <Modal show={showEdit} onHide={handleCloseEdit}>
            <Modal.Header closeButton>
              <Modal.Title><FormattedMessage id="admin.tee" /></Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Form>
                <Form.Group controlId="formBasicNombre">
                  <Form.Label><FormattedMessage id="admin.nombre" /></Form.Label>
                  <Form.Control
                      type="text"
                      value={editEmployeeNombre}
                      onChange={(e) => setEditEmployeeNombre(e.target.value)}
                      placeholder={selectedEmpleado.nombre}
                  />
                </Form.Group>

                <Form.Group controlId="formBasicApellido">
                  <Form.Label><FormattedMessage id="admin.apellido" /></Form.Label>
                  <Form.Control
                      type="text"
                      value={editEmployeeApellido}
                      onChange={(e) => setEditEmployeeApellido(e.target.value)}
                      placeholder={selectedEmpleado.apellido}
                  />
                </Form.Group>

                <Form.Group controlId="formBasicEmail">
                  <Form.Label><FormattedMessage id="admin.email" /></Form.Label>
                  <Form.Control
                      type="email"
                      value={editEmployeeEmail}
                      onChange={(e) => setEditEmployeeEmail(e.target.value)}
                      placeholder={selectedEmpleado.email}
                  />
                </Form.Group>

                <Form.Group controlId="formBasicFoto">
                  <Form.Label><FormattedMessage id="admin.foto" /></Form.Label>
                  <Form.Control
                      type="text"
                      value={editEmployeeFoto}
                      onChange={(e) => setEditEmployeeFoto(e.target.value)}
                      placeholder={selectedEmpleado.foto}
                  />
                </Form.Group>
              </Form>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleCloseEdit}>
                <FormattedMessage id="admin.cancelar" />
              </Button>
              <Button variant="primary" onClick={handleEditEmployee}>
                <FormattedMessage id="admin.aceptar" />
              </Button>
            </Modal.Footer>
          </Modal>
        </Row>
      </Container>
  );
}

export default Empleados;