import React, { useState } from "react";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Empleados from "../empleados/empleados";
import Services from "../services/services";

function Administracion() {
  const [selectedButton, setSelectedButton] = useState("servicios");
  return (
    <Container>
      <Row style={{ marginTop: "30px", marginBottom: "30px" }}>
        <Col xs={1}>
          <button
            className={`botones_admin ${
              selectedButton === "servicios" ? "selected" : ""
            }`}
            onClick={() => setSelectedButton("servicios")}
          >
            Servicios
          </button>
        </Col>
        <Col xs={1}>
          <button
            className={`botones_admin ${
              selectedButton === "empleados" ? "selected" : ""
            }`}
            onClick={() => setSelectedButton("empleados")}
          >
            Empleados
          </button>
        </Col>
        <Col xs={10}></Col>
      </Row>
      <Row>
      <Col md={8}>
        {selectedButton === "servicios" ? <Services /> : <Empleados />}
      </Col>
      <Col md={4}>
        <img
          src="https://img.freepik.com/vector-premium/peluqueria-logo-diseno-corona-salon_290562-205.jpg"
          alt="Your description"
          style={{ width: "100%", height: "auto" }}
        />
        <h1>Hair Saloon</h1>
      </Col>
    </Row>
    </Container>
  );
}
export default Administracion;
