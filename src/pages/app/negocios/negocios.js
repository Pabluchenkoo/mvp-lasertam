import { useEffect, useState } from "react";
import { Card, Col, Container, Row } from "react-bootstrap";
import Modal from "react-bootstrap/Modal";
import { FormattedMessage } from "react-intl";
import StarRatings from "react-star-ratings";
import EventForm from "../Admin/eventForm";
import "./negocios.css";

function Negocios() {
  const [negocios, setNegocios] = useState([]);
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const idiomaNavegador = navigator.language.slice(0, 2);
  let categorias = {
    Inicio: {
      imagenUrl:
        "https://cdn.icon-icons.com/icons2/619/PNG/512/home-black-shape_icon-icons.com_56724.png",
    },
    Belleza: {
      imagenUrl:
        "https://static.vecteezy.com/system/resources/previews/017/431/889/non_2x/lips-black-and-white-icon-minimal-modern-beauty-logo-clean-isolated-taste-of-love-vector.jpg",
    },
    Cerrajeria: {
      imagenUrl:
        "https://icones.pro/wp-content/uploads/2022/01/symbole-de-cle-noire.png",
    },
    Plomeria: {
      imagenUrl:
        "https://icones.pro/wp-content/uploads/2021/03/icone-de-configuration-et-d-outils-noire.png",
    },
    Autos: {
      imagenUrl: "https://cdn-icons-png.flaticon.com/512/16/16301.png",
    },
  };
  const traducciones = {
    en: {
      Inicio: "Home",
      Belleza: "Beauty",
      Cerrajeria: "Locksmithing",
      Plomeria: "Plumbing",
      Autos: "Cars",
    },
    es: {
      Inicio: "Inicio",
      Belleza: "Belleza",
      Cerrajeria: "Cerrajería",
      Plomeria: "Plomería",
      Autos: "Autos",
    },
  };

  function handleClick() {
    setShowForm(true);
    console.log("click");
  }
  function handleClose() {
    setShowForm(false);
  }
  function handleFilter(categoria) {
    if (categoria === "Inicio") {
      setCategoriaSeleccionada(null);
      return;
    }
    setCategoriaSeleccionada(categoria);
  }
  useEffect(() => {
    fetch(
      "https://raw.githubusercontent.com/jmontenegroc/datos/main/negocios.json"
    )
      .then((response) => response.json())
      .then((data) => setNegocios(data))
      .catch((error) => console.error("Error fetching comments:", error));
  }, []);
  function getDistanceFromLatLonInKm(lat1, lon1, lat2, lon2) {
    var R = 6371;
    var dLat = deg2rad(lat2 - lat1);
    var dLon = deg2rad(lon2 - lon1);
    var a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(deg2rad(lat1)) *
        Math.cos(deg2rad(lat2)) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    var d = R * c;
    return d.toFixed(2);
  }

  function deg2rad(deg) {
    return deg * (Math.PI / 180);
  }

  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition((position) => {
      const userLat = position.coords.latitude;
      const userLon = position.coords.longitude;

      const negociosConDistancia = negocios.map((negocio) => {
        const distancia = getDistanceFromLatLonInKm(
          userLat,
          userLon,
          negocio.latitud,
          negocio.longitud
        );
        return { ...negocio, distancia };
      });

      setNegocios(negociosConDistancia);
    });
  }

  return (
    <Container>
      <Row style={{ margin: "20px", textAlign: "left" }}>
        <p id="titulo">
          <FormattedMessage id="negocios.titulo" />
        </p>
      </Row>
      <Row
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "flex-start",
          marginBottom: "20px",
          overflowX: "auto",
        }}
      >
        {Object.keys(categorias).map((categoria) => (
          <Col xs={2}>
            <button
              key={categoria}
              className={`filtros ${
                categoriaSeleccionada === categoria ? "elegida" : ""
              }`}
              onClick={() => handleFilter(categoria)}
            >
              <Row>
                <Col>
                  <img
                    src={categorias[categoria].imagenUrl}
                    alt="icono"
                    style={{ width: "20px", height: "20px" }}
                  />
                </Col>
                <Col>{traducciones[idiomaNavegador][categoria] || categoria}</Col>
              </Row>
            </button>
          </Col>
        ))}
      </Row>
      <Row>
        {negocios
          .filter((negocio) =>
            categoriaSeleccionada
              ? negocio.categoria === categoriaSeleccionada
              : true
          )
          .sort((a, b) => a.distancia - b.distancia)
          .map((negocio) => (
            <Col xs={12} sm={6} md={4} lg={3} key={negocio.id}>
              <Card
                className="mb-4"
                onClick={handleClick}
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  padding: "20px",
                  cursor: "pointer",
                }}
              >
                <Card.Img
                  variant="top"
                  src={negocio.logo}
                  alt={negocio.name}
                  style={{ height: "200px", width: "200px" }}
                />
                <Card.Body>
                  <Card.Title>{negocio.nombre}</Card.Title>
                  <StarRatings
                    rating={negocio.calificacion}
                    numberOfStars={5}
                    starDimension="20px"
                    starSpacing="2px"
                    starRatedColor="gold"
                  />
                  <Card.Text>a {negocio.distancia} km</Card.Text>
                </Card.Body>
              </Card>
            </Col>
          ))}
      </Row>

      <Modal show={showForm} onHide={handleClose}>
        <Modal.Body>
          <EventForm handleClose={handleClose} />
        </Modal.Body>
      </Modal>
    </Container>
  );
}
export default Negocios;
