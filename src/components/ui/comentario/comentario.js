import React from 'react';
import { ProgressBar, Col } from 'react-bootstrap';

const Comentario = ({ rating, name, comment, place, location, userPhoto }) => {
  return (
    <div className="comment-card">
      <Col xs={1} className="comment-progress">
        <div className="rating">
          <h5>Rating: {rating}</h5>
          <ProgressBar now={(rating / 5) * 100} height="10px" />
        </div>
      </Col>
      <Col xs={9} className="comment-details">
        <p className="name">{name}</p>
        <p className="comment">{comment}</p>
        <p className="place">{place}</p>
        <p className="location">{location}</p>
      </Col>
      <Col xs={2} className="comment-right">
        <img src="https://picsum.photos/200" alt="User" className="user-photo" />
      </Col>
    </div>
  );
};

export default Comentario;
