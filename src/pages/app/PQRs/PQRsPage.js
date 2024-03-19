import React, { useState, useEffect } from 'react';
import { Button, Container, Row, Col, Form, Toast } from 'react-bootstrap';
import Comentario from "../../../components/ui/comentario/comentario";
import { FormattedMessage, useIntl } from 'react-intl';

function PQRsPage() {
  const intl = useIntl();
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
  const [showNotification, setShowNotification] = useState(false);

  useEffect(() => {
    fetchComments();
  }, []);

  const fetchComments = async () => {
    try {
      const response = await fetch('https://api.github.com/repos/Programacion-con-Tecnologias-Web/Datos/contents/comments.json');
      if (!response.ok) {
        throw new Error('Error fetching comments: Network response was not ok');
      }
      const data = await response.json();
      const commentsContent = JSON.parse(atob(data.content));
      setComments(commentsContent);
    } catch (error) {
      console.error('Error fetching comments:', error);
    }
  };

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
    setShowNotification(true);
    setTimeout(() => setShowNotification(false), 5000);
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
          <h1 style={{ textAlign: 'left' }}><FormattedMessage id="pqr.titulo"/></h1>
        </Col>
        <Col xs="6" className="text-right">
          <Button
            onClick={() => setShowForm(true)}
            style={{ backgroundColor: '#ffcccc', border: 'none', cursor: 'pointer', fontSize: '0.8rem', color: 'black' }}
          >
            <FormattedMessage id="pqr.crear"/>
          </Button>
        </Col>
      </Row>
      {showForm && (
        <div className="form-container" style={{ backgroundColor: '#ffcccc', padding: '20px', borderRadius: '10px', marginTop: '20px' }}>
          <h2 style={{ textAlign: 'left' }}><FormattedMessage id="pqr.create"/></h2>
          <Form onSubmit={handleFormSubmit}>
            <Form.Group controlId="name">
              <Form.Label><FormattedMessage id="pqr.name"/>:</Form.Label>
              <Form.Control
                type="text"
                name="name"
                placeholder={intl.formatMessage({ id: 'pqr.name2' })}
                value={newComment.name}
                onChange={handleInputChange}
                required
              />
            </Form.Group>
            <Form.Group controlId="comment">
              <Form.Label><FormattedMessage id="pqr.comment"/>:</Form.Label>
              <Form.Control
                as="textarea"
                name="comment"
                placeholder={intl.formatMessage({ id: 'pqr.comment2' })}
                value={newComment.comment}
                onChange={handleInputChange}
                required
              />
            </Form.Group>
            <Form.Group controlId="place">
              <Form.Label><FormattedMessage id="pqr.business"/>:</Form.Label>
              <Form.Control
                type="text"
                name="place"
                placeholder={intl.formatMessage({ id: 'pqr.business2' })}
                value={newComment.place}
                onChange={handleInputChange}
                required
              />
            </Form.Group>
            <Form.Group controlId="location">
              <Form.Label><FormattedMessage id="pqr.location"/>:</Form.Label>
              <Form.Control
                type="text"
                name="location"
                placeholder={intl.formatMessage({ id: 'pqr.location2' })}
                value={newComment.location}
                onChange={handleInputChange}
                required
              />
            </Form.Group>
            <Form.Group controlId="rating">
              <Form.Label><FormattedMessage id="pqr.rating"/>(0-5):</Form.Label>
              <Form.Control
                type="number"
                name="rating"
                min="0"
                max="5"
                step="0.1"
                placeholder={intl.formatMessage({ id: 'pqr.rating2' })}
                value={newComment.rating}
                onChange={handleInputChange}
                required
              />
            </Form.Group>
            <Button type="submit"><FormattedMessage id="pqr.send"/></Button>
          </Form>
        </div>
      )}
      <Toast show={showNotification} onClose={() => setShowNotification(false)} delay={5000} autohide>
        <Toast.Header>
          <strong className="mr-auto"><FormattedMessage id="pqr.not"/></strong>
        </Toast.Header>
        <Toast.Body><FormattedMessage id="pqr.notificacion"/></Toast.Body>
      </Toast>
      <div className="search-container" style={{ margin: '20px 0' }}>
        <Form.Control
          type="text"
          placeholder={intl.formatMessage({ id: 'pqr.search' })}
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
