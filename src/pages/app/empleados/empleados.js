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
  const [empleadoId, setEmpleadoId] = useState(null);
  const [editEmployeeNombre, setEditEmployeeNombre] = useState("");
  const [editEmployeeApellido, setEditEmployeeApellido] = useState("");
  const [editEmployeeEmail, setEditEmployeeEmail] = useState("");
  const [editEmployeeFoto, setEditEmployeeFoto] = useState("");
  const handleCloseEdit = () => setshowEdit(false);
  const handleEditEmployee = () => {
    // Verifica si el empleado ya existe en la lista
    const existingEmployee = empleados.find(
      (employee) => employee.id === empleadoId
    );

    if (existingEmployee) {
      // Si el empleado ya existe, actualiza sus valores
      const newEmployees = empleados.map((employee) => {
        if (employee.id === empleadoId) {
          return {
            ...employee,
            nombre: editEmployeeNombre,
            apellido: editEmployeeApellido,
            email: editEmployeeEmail,
            foto: editEmployeeFoto,
          }; // Actualiza el empleado con los nuevos valores
        }
        return employee;
      });
      setEmpleados(newEmployees);
    } else {
      setEmpleados([
        ...empleados,
        {
          id: empleadoId,
          nombre: editEmployeeNombre,
          apellido: editEmployeeApellido,
          email: editEmployeeEmail,
          foto: editEmployeeFoto,
        },
      ]);
    }

    handleCloseEdit();
  };
  const handleShowEdit = (id) => {
    setshowEdit(true);
    setEmpleadoId(id);
  };
  const handleClose = () => setshowDelete(false);
  const handleShow = (id) => {
    setshowDelete(true);
    setEmpleadoId(id);
  };
  const borrarEmpleado = () => {
    const newServices = empleados.filter(
      (empleado) => empleado.id !== empleadoId
    );
    setEmpleados(newServices);
    handleClose();
  };

  useEffect(() => {
    fetch(
      "https://raw.githubusercontent.com/isis3710-uniandes/ISIS3710_202410_S2_E06_Front/j.montenegro/src/pages/data/empleados.json?token=GHSAT0AAAAAACOPJUOFSCUXGSTQZU4P7BOWZPYV2QQ"
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
                  Agregar nuevo empleado
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
                          onClick={() => handleShowEdit(empleado.id)}
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
          <Modal.Body>
            ¿Está seguro que desea eliminar a este empleado?
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Cancelar
            </Button>
            <Button variant="secondary" onClick={borrarEmpleado}>
              Aceptar
            </Button>
          </Modal.Footer>
        </Modal>
        <Modal show={showEdit} onHide={handleCloseEdit}>
          <Modal.Header closeButton>
            <Modal.Title>Editar Empleado</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group controlId="formBasicNombre">
                <Form.Label>Nombre del Empleado:</Form.Label>
                <Form.Control
                  type="text"
                  value={editEmployeeNombre}
                  onChange={(e) => setEditEmployeeNombre(e.target.value)}
                />
              </Form.Group>

              <Form.Group controlId="formBasicApellido">
                <Form.Label>Apellido del Empleado:</Form.Label>
                <Form.Control
                  type="text"
                  value={editEmployeeApellido}
                  onChange={(e) => setEditEmployeeApellido(e.target.value)}
                />
              </Form.Group>

              <Form.Group controlId="formBasicEmail">
                <Form.Label>Email del Empleado:</Form.Label>
                <Form.Control
                  type="email"
                  value={editEmployeeEmail}
                  onChange={(e) => setEditEmployeeEmail(e.target.value)}
                />
              </Form.Group>

              <Form.Group controlId="formBasicFoto">
                <Form.Label>Foto del Empleado:</Form.Label>
                <Form.Control
                  type="text"
                  value={editEmployeeFoto}
                  onChange={(e) => setEditEmployeeFoto(e.target.value)}
                />
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleCloseEdit}>
              Cancelar
            </Button>
            <Button variant="primary" onClick={handleEditEmployee}>
              Guardar Cambios
            </Button>
          </Modal.Footer>
        </Modal>
      </Row>
    </Container>
  );
}

export default Empleados;
