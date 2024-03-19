import { useEffect, useState } from "react";
import { Card, Col, Container, Row } from "react-bootstrap";
import StarRatings from "react-star-ratings";
import "./negocios.css";

function Negocios() {
  const [negocios, setNegocios] = useState([]);
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState(null);
  const categorias = {
    Inicio: {
      imagenUrl: "https://w7.pngwing.com/pngs/170/535/png-transparent-computer-icons-home-house-login-home-angle-rectangle-black.png",
    },
    Belleza: {
      imagenUrl: "https://w7.pngwing.com/pngs/165/915/png-transparent-black-lips-illustration-lip-kiss-drawing-smile-lips-miscellaneous-leaf-people.png",
    },
    Cerrajeria: {
      imagenUrl: "https://w7.pngwing.com/pngs/131/200/png-transparent-black-key-icon-key-key-angle-text-grey-thumbnail.png",
    },
    Plomeria: {
      imagenUrl: "https://w7.pngwing.com/pngs/205/200/png-transparent-tool-computer-icons-tools-hand-technic-black.png",
    },
    Autos: {
      imagenUrl: "https://cdn-icons-png.flaticon.com/512/26/26352.png",
    },
  };
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
        <p id="titulo">Escoge un negocio:</p>
      </Row>
      <Row
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "flex-start",
          marginBottom: "20px",
        }}
      >
        {Object.keys(categorias).map((categoria) => (
          <Col xs={2}>
            <button key={categoria} 
            className={`filtros ${categoriaSeleccionada === categoria ? "elegida" : ""}`}
            onClick={() => handleFilter(categoria)}
            >
              <Row>
                <Col>
                  <img
                    src={categorias[categoria].imagenUrl}
                    alt="icono"
                    style={{ width: "30px", height: "20px" }}
                  />
                </Col>
                <Col>{categoria}</Col>
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
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  padding: "20px",
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
    </Container>
  );
}
export default Negocios;
