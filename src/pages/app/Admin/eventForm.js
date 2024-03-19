import React, { useState } from 'react';
import FetchProfessionals from "../Calendar/modal/hooks/fetchProfessionals";



const EventForm = (props ) => {

    const [title, setTitle] = useState('');
    const [professional,setProfessional] = useState('');
    const [comentarios, setComentarios] = useState('');
    const [startDate, setStartDate] = useState(props.event?.start ? props.event.start.toISOString().slice(0,16) : '');
    const [endDate, setEndDate] = useState(props.event?.end ? props.event.end.toISOString().slice(0,16) : '');
    const professionalsList = FetchProfessionals();

    const reservas =[];


    const hableSubmit = (e) => {
        e.preventDefault();
        const reservation = {title, startDate, endDate, professional, comentarios};
        reservas.push(reservation);

        console.log(reservas);
        props.handleClose();
    }


    return (<>
            <h2>Completa tu reserva</h2>
            <div className="forms">
                <form onSubmit={hableSubmit}>
                    <label>Title</label>
                    <input
                        type="text"
                        required
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />
                    <label>Start date</label>
                    <div className="form-group">
                        <input type="datetime-local" value={startDate} onChange={(e) => setStartDate(e.target.value)}
                               required
                               className="form-control"/>
                    </div>
                    <label>End date</label>
                    <div className="form-group">
                        <input type="datetime-local" value={endDate} onChange={(e) => setEndDate(e.target.value)}
                               required
                               className="form-control"/>
                    </div>
                    <label>Professional</label>
                    <select
                        value={professional}
                        onChange={(e) => setProfessional(e.target.value)}
                    >
                        <option value="">Select a Professional</option>
                        {professionalsList.map(professional => (
                            <option key={professional.id} value={professional.name}>{professional.name}</option>
                        ))}
                    </select>
                    <label>Comments</label>
                    <textarea
                        required
                        value={comentarios}
                        onChange={(e) => setComentarios(e.target.value)}
                    >
            </textarea>
                    <button>Add event</button>

                </form>
            </div>
        </>
    );
}
export default EventForm;