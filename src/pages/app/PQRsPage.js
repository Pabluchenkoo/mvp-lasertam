import React, { useState, useEffect } from 'react';
import { Button, Container, Row, Form } from 'react-bootstrap';
import Comentario from "../../components/ui/comentario/comentario";

function PQRsPage() {
  const [comments, setComments] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [newComment, setNewComment] = useState({
    name: '',
    comment: '',
    rating: '',
    place: '',
    location: ''
  });

  useEffect(() => {
    fetch('https://my.api.mockaroo.com/test_schema.json?key=16ada500')
      .then(response => response.json())
      .then(data => setComments(data))
      .catch(error => console.error('Error fetching comments:', error));
  }, []);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setNewComment({
      ...newComment,
      [name]: value
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Aquí puedes enviar el nuevo comentario a tu backend o actualizar el estado según necesites
    console.log('Nuevo comentario:', newComment);
    // Limpiar el formulario
    setNewComment({
      name: '',
      comment: '',
      rating: '',
      place: '',
      location: ''
    });
    // Ocultar el formulario después de enviar
    setShowForm(false);
  };

  return (
    <Container>
      <Row className="justify-content-between">
          <h1 style={{ textAlign: 'left' }}>PQRs</h1>
          <Button
            onClick={() => setShowForm(true)}
            style={{ backgroundColor: '#ffcccc', border: 'none', cursor: 'pointer' }}
          >
            Crear
          </Button>
      </Row>
      {showForm && (
        <div className="form-container" style={{ backgroundColor: '#ffcccc', padding: '20px', borderRadius: '10px', marginTop: '20px' }}>
          <h2 style={{ textAlign: 'left' }}>Crear nuevo comentario</h2>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="name">
              <Form.Label>Nombre:</Form.Label>
              <Form.Control
                type="text"
                placeholder="Ingrese su nombre"
                value={newComment.name}
                onChange={handleInputChange}
                required
              />
            </Form.Group>
            <Form.Group controlId="comment">
              <Form.Label>Comentario:</Form.Label>
              <Form.Control
                as="textarea"
                placeholder="Ingrese su comentario"
                value={newComment.comment}
                onChange={handleInputChange}
                required
              />
            </Form.Group>
            <Form.Group controlId="place">
              <Form.Label>Negocio:</Form.Label>
              <Form.Control
                type="text"
                placeholder="Ingrese el negocio"
                value={newComment.place}
                onChange={handleInputChange}
                required
              />
            </Form.Group>
            <Form.Group controlId="location">
              <Form.Label>Ubicacion:</Form.Label>
              <Form.Control
                type="text"
                placeholder="Ingrese la ubicacion"
                value={newComment.location}
                onChange={handleInputChange}
                required
              />
            </Form.Group>
            <Form.Group controlId="rating">
              <Form.Label>Rating (0-5):</Form.Label>
              <Form.Control
                type="number"
                min="0"
                max="5"
                placeholder="Ingrese el rating"
                value={newComment.rating}
                onChange={handleInputChange}
                required
              />
            </Form.Group>
            <Button type="submit">Enviar</Button>
          </Form>
        </div>
      )}
      <div className="comments-container">
        {comments.map((comment, index) => (
          <Comentario
            key={index}
            rating={Math.floor(Math.random() * 5) + 1}
            name={comment.name}
            comment={comment.comment}
            place={comment.place}
            location={comment.location}
            userPhoto="../../../assets/hombre.jpeg"
          />
        ))}
      </div>
    </Container>
  );
}

export default PQRsPage;
