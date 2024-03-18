import React, { useState, useEffect } from 'react';
import { Button, Container, Row, Col, Form } from 'react-bootstrap';
import Comentario from "../../../components/ui/comentario/comentario";

function PQRsPage() {
  const [comments, setComments] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [newComment, setNewComment] = useState({
    name: '',
    comment: '',
    rating: 0,
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
      [name]: name === 'rating' ? parseFloat(value) : value
    });
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();
    setComments([...comments, newComment]);
    setShowForm(false);
    setNewComment({
      name: '',
      comment: '',
      rating: 0,
      place: '',
      location: ''
    });
  };

  const handleSearchInputChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredComments = comments.filter(comment =>
    comment.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    comment.place.toLowerCase().includes(searchTerm.toLowerCase()) ||
    comment.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
    comment.comment.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Container>
      <Row className="align-items-center">
        <Col xs="6">
          <h1 style={{ textAlign: 'left' }}>PQRs</h1>
        </Col>
        <Col xs="6" className="text-right">
          <Button
            onClick={() => setShowForm(true)}
            style={{ backgroundColor: '#ffcccc', border: 'none', cursor: 'pointer', fontSize: '0.8rem' }}
          >
            Crear
          </Button>
        </Col>
      </Row>
      {showForm && (
        <div className="form-container" style={{ backgroundColor: '#ffcccc', padding: '20px', borderRadius: '10px', marginTop: '20px' }}>
          <h2 style={{ textAlign: 'left' }}>Crear nuevo comentario</h2>
          <Form onSubmit={handleFormSubmit}>
            <Form.Group controlId="name">
              <Form.Label>Nombre:</Form.Label>
              <Form.Control
                type="text"
                name="name"
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
                name="comment"
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
                name="place"
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
                name="location"
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
                name="rating"
                min="0"
                max="5"
                step="0.1"
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
      <div className="search-container" style={{ margin: '20px 0' }}>
        <Form.Control
          type="text"
          placeholder="Buscar comentarios..."
          value={searchTerm}
          onChange={handleSearchInputChange}
        />
      </div>
      <div className="comments-container">
        {filteredComments.map((comment, index) => (
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
    </Container>
  );
}

export default PQRsPage;
