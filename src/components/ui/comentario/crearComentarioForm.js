import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import { FormattedMessage } from 'react-intl';

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
      <h2 style={{ textAlign: 'left' }}><FormattedMessage id="form.create"/></h2>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="name">
          <Form.Label><FormattedMessage id="form.name"/>:</Form.Label>
          <Form.Control
            type="text"
            name="name"
            placeholder="form.name2"
            value={newComment.name}
            onChange={handleInputChange}
            required
          />
        </Form.Group>
        <Form.Group controlId="comment">
          <Form.Label><FormattedMessage id="form.comment"/>:</Form.Label>
          <Form.Control
            as="textarea"
            name="comment"
            placeholder="form.comment2"
            value={newComment.comment}
            onChange={handleInputChange}
            required
          />
        </Form.Group>
        <Form.Group controlId="place">
          <Form.Label><FormattedMessage id="form.business"/></Form.Label>
          <Form.Control
            type="text"
            name="place"
            placeholder="form.business2"
            value={newComment.place}
            onChange={handleInputChange}
            required
          />
        </Form.Group>
        <Form.Group controlId="location">
          <Form.Label><FormattedMessage id="form.location"/>:</Form.Label>
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
          <Form.Label><FormattedMessage id="form.rating"/> (0-5):</Form.Label>
          <Form.Control
            type="number"
            name="rating"
            min="0"
            max="5"
            placeholder="form.rating2"
            value={newComment.rating}
            onChange={handleInputChange}
            required
          />
        </Form.Group>
        <Button type="submit"><FormattedMessage id="form.send"/></Button>
      </Form>
    </div>
  );
};

export default CrearComentarioForm;
