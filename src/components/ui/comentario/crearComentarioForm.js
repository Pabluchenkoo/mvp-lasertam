import React, { useState, useEffect } from 'react';
import { Button, Container, Row } from 'react-bootstrap';
import Comentario from "../../components/ui/comentario/comentario";
import CrearComentarioForm from '../../components/ui/comentario/CrearComentarioForm'; // Importamos el componente del formulario

function PQRsPage() {
  const [comments, setComments] = useState([]);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    fetch('https://my.api.mockaroo.com/test_schema.json?key=16ada500')
      .then(response => response.json())
      .then(data => setComments(data))
      .catch(error => console.error('Error fetching comments:', error));
  }, []);

  const handleCreateComment = (newComment) => {
    setComments([...comments, newComment]); // Agregar el nuevo comentario al estado de los comentarios
    setShowForm(false); // Ocultar el formulario después de crear el comentario
  };

  return (
    <Container>
      <Row className="justify-content-between">
        <h1 style={{ textAlign: 'left' }}>PQRs</h1>
        <Button
          onClick={() => setShowForm(true)}
          style={{ backgroundColor: '#e6ccff', border: 'none', cursor: 'pointer' }}
        >
          Crear
        </Button>
      </Row>
      {showForm && (
        <CrearComentarioForm onCreateComment={handleCreateComment} /> // Mostrar el formulario si showForm es verdadero
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
