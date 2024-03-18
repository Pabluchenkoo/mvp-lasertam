import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, ProgressBar, Button, Form, Toast } from 'react-bootstrap';
import Comentario from "../../../components/ui/comentario/comentario";

function MiNegocioPage() {
  const [negocioInfo, setNegocioInfo] = useState({});
  const [comments, setComments] = useState({});
  const [averageRating, setAverageRating] = useState(0);
  const [showReplyForm, setShowReplyForm] = useState({});
  const [replies, setReplies] = useState({});
  const [showNotification, setShowNotification] = useState(false);

  useEffect(() => {
    fetch('https://my.api.mockaroo.com/negocios.json?key=16ada500')
      .then(response => response.json())
      .then(data => {
        setNegocioInfo(data[0]);
      })
      .catch(error => console.error('Error fetching business info:', error));
  }, []);

  useEffect(() => {
    if (!negocioInfo || !negocioInfo.business) return;

    fetch('https://my.api.mockaroo.com/test_schema.json?key=16ada500')
      .then(response => response.json())
      .then(data => {
        if (!data || data.error) {
          console.error('Error fetching comments:', data && data.error ? data.error : 'Unknown error');
          return;
        }

        const filteredComments = {};
        let totalRating = 0;
        let numberOfComments = 0;

        for (const key in data) {
          const comment = data[key];
          if (comment.place === negocioInfo.business) {
            filteredComments[key] = {
              id: key,
              rating: comment.rating,
              name: comment.name,
              comment: comment.comment,
              place: comment.place,
              location: comment.location,
              reply: ''
            };
            totalRating += comment.rating;
            numberOfComments++;
          }
        }

        const average = numberOfComments > 0 ? totalRating / numberOfComments : 0;
        setComments(filteredComments);
        setAverageRating(average);
      })
      .catch(error => console.error('Error fetching comments:', error));
  }, [negocioInfo]);

  const handleReply = (commentId) => {
    setShowReplyForm({ ...showReplyForm, [commentId]: true });
  };

  const handleReplySubmit = (event, commentId) => {
    event.preventDefault();
    const replyText = event.target.elements.replyText.value;
    const updatedComments = { ...comments };
    updatedComments[commentId].reply = replyText;
    setComments(updatedComments);
    setShowNotification(true);
    setTimeout(() => setShowNotification(false), 3000);
    setShowReplyForm({ ...showReplyForm, [commentId]: false });
  };

  return (
    <Container>
      <Row className="mb-4">
        <Col md={12}>
          <hr />
        </Col>
      </Row>

      <Row className="mb-4 align-items-center">
        <Col md={6} className="text-center">
          <img src="https://picsum.photos/200" alt="Imagen del negocio" className="img-fluid" />
        </Col>
        <Col md={6}>
          <Card bg="lightpink" text="black" style={{ width: '18rem' }}>
            <Card.Body>
              <Card.Title>{negocioInfo.business}</Card.Title>
              <Card.Text>{negocioInfo.description}</Card.Text>
              <Card.Text>Ubicación: {negocioInfo.location}</Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      
      <Row className="mb-4">
        <Col>
          <h3>Comentarios del Negocio</h3>
          <div className="comments-container">
            {Object.keys(comments).map((key) => (
              <div key={key}>
                <Comentario
                  rating={comments[key].rating}
                  name={comments[key].name}
                  comment={comments[key].comment}
                  place={comments[key].place}
                  location={comments[key].location}
                  userPhoto="../../../assets/hombre.jpeg"
                />
                <Button variant="secondary" size="sm" onClick={() => handleReply(comments[key].id)}>Responder</Button>
                {showReplyForm[comments[key].id] && (
                  <Form onSubmit={(event) => handleReplySubmit(event, comments[key].id)}>
                    <Form.Group controlId={`replyText-${comments[key].id}`}>
                      <Form.Control type="text" placeholder="Escribe tu respuesta..." name="replyText" />
                    </Form.Group>
                    <Button variant="light" type="submit">Enviar</Button>
                  </Form>
                )}
                {comments[key].reply && <p><strong>Tu respuesta:</strong> {comments[key].reply}</p>}
              </div>
            ))}
          </div>
        </Col>
      </Row>
      
      <Row className="mb-4">
        <Col>
          <h3>Promedio de Ratings</h3>
          <h1>{averageRating.toFixed(1)}</h1>
          <ProgressBar now={averageRating * 20} />
        </Col>
      </Row>

      <Toast show={showNotification} onClose={() => setShowNotification(false)} delay={3000} autohide>
        <Toast.Body>¡Has respondido al comentario!</Toast.Body>
      </Toast>
    </Container>
  );
}

export default MiNegocioPage;