import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';

const CrearComentarioForm = ({ onFormSubmit }) => {
  const [newComment, setNewComment] = useState({
    name: '',
    comment: '',
    rating: '',
    place: '',
    location: ''
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setNewComment({
      ...newComment,
      [name]: value
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    onFormSubmit(newComment);
    setNewComment({
      name: '',
      comment: '',
      rating: '',
      place: '',
      location: ''
    });
  };

  return (
    <div className="form-container" style={{ backgroundColor: '#ffcccc', padding: '20px', borderRadius: '10px', marginTop: '20px' }}>
      <h2 style={{ textAlign: 'left' }}>Crear nuevo comentario</h2>
      <Form onSubmit={handleSubmit}>
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
            placeholder="Ingrese el rating"
            value={newComment.rating}
            onChange={handleInputChange}
            required
          />
        </Form.Group>
        <Button type="submit">Enviar</Button>
      </Form>
    </div>
  );
};

export default CrearComentarioForm;
