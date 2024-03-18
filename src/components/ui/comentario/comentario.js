import React from 'react';

const Comentario = ({ rating, name, comment, place, location, userPhoto }) => {
  return (
    <div className="comment-card">
      <div className="comment-left">
        <div className="rating-circle">
          {rating}
          <svg viewBox="0 0 36 36" className="circle-progress">
            {/* Código SVG para el círculo de progreso */}
          </svg>
        </div>
        <div className="comment-details">
          <p className="name">{name}</p>
          <p className="comment">{comment}</p>
          <p className="place">{place}</p>
          <p className="location">{location}</p>
        </div>
      </div>
      <div className="comment-right">
        <img src={userPhoto} alt="User" className="user-photo" />
      </div>
    </div>
  );
};

export default Comentario;

