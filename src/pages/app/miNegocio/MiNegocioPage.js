import React, { useState, useEffect } from 'react';
import { Container, Row, Col, ProgressBar } from 'react-bootstrap';
import Comentario from "../../../components/ui/comentario/comentario";

function MiNegocioPage() {
  const [negocioInfo, setNegocioInfo] = useState({});
  const [comments, setComments] = useState([]);

  useEffect(() => {
    // Obtener información del negocio desde la API
    fetch('https://my.api.mockaroo.com/negocios.json?key=16ada500')
      .then(response => response.json())
      .then(data => setNegocioInfo(data[0])) // Suponiendo que solo hay un negocio
      .catch(error => console.error('Error fetching business info:', error));
  }, []);

  useEffect(() => {
    if (!negocioInfo || !negocioInfo.business) return; // Verificar si negocioInfo está definido y tiene la propiedad 'business'

    // Filtrar comentarios por lugar del negocio
    fetch(`https://my.api.mockaroo.com/comments.json?key=16ada500&business=${encodeURIComponent(negocioInfo.business)}`)
      .then(response => response.json())
      .then(data => {
        const filteredComments = data.filter(comment => comment.place === negocioInfo.business);
        setComments(filteredComments);
      })
      .catch(error => console.error('Error fetching comments:', error));
  }, [negocioInfo]);

  // Calcular el promedio de los ratings
  const calculateAverageRating = () => {
    if (comments.length === 0) return 0;
    const totalRating = comments.reduce((acc, comment) => acc + comment.rating, 0);
    return totalRating / comments.length;
  };

  return (
    <Container>
      {/* Descripción del negocio */}
      <Row className="mb-4">
        <Col md={6}>
          <img src="ruta_de_la_imagen" alt="Imagen del negocio" className="img-fluid" />
        </Col>
        <Col md={6}>
          {/* Información del negocio */}
          <h2>{negocioInfo.business}</h2>
          <p>Ubicación: {negocioInfo.location}</p>
        </Col>
      </Row>
      
      {/* Vista previa de comentarios del negocio */}
      <Row className="mb-4">
        <Col>
          <h3>Comentarios del Negocio</h3>
          <div className="comments-container">
            {/* Mostrar hasta 3 comentarios */}
            {comments.slice(0, 3).map((comment, index) => (
              <Comentario
                key={index}
                rating={comment.rating}
                name={comment.name}
                comment={comment.comment}
                place={comment.place}
                location={comment.location}
                userPhoto="../../../assets/hombre.jpeg"
              />
            ))}
          </div>
        </Col>
      </Row>
      
      {/* Promedio total de los ratings */}
      <Row className="mb-4">
        <Col>
          <h3>Promedio de Ratings</h3>
          <h1>{calculateAverageRating().toFixed(1)}</h1>
          <ProgressBar now={calculateAverageRating() * 20} label={`${calculateAverageRating().toFixed(1)}/5`} />
          <p>General</p>
        </Col>
      </Row>
    </Container>
  );
}

export default MiNegocioPage;
