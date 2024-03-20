import React, { useState } from 'react';
import FetchProfessionals from "../Calendar/modal/hooks/fetchProfessionals";
import { FormattedMessage, useIntl } from 'react-intl';


const EventForm = (props ) => {

    const intl = useIntl();
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
            <h2><FormattedMessage id={"eventForm.head"}/>:</h2>
            <div className="forms">
                <form onSubmit={hableSubmit}>
                    <label><FormattedMessage id={"eventForm.title"}/></label>
                    <input
                        type="text"
                        required
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder={intl.formatMessage({ id: 'eventForm.placeTitle' })}
                    />
                    <label><FormattedMessage id={'eventForm.startDate'}/></label>
                    <div className="form-group">
                        <input type="datetime-local" value={startDate} onChange={(e) => setStartDate(e.target.value)}
                               required
                               className="form-control"/>
                    </div>
                    <label><FormattedMessage id={'eventForm.endDate'}/></label>
                    <div className="form-group">
                        <input type="datetime-local" value={endDate} onChange={(e) => setEndDate(e.target.value)}
                               required
                               className="form-control"/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="professionalSelect"><FormattedMessage id="calendarModal.professional"/>:</label>
                        <select
                            id="professionalSelect"
                            value={professional}
                            onChange={(e) => setProfessional(e.target.value)}
                            className="form-control"
                            required
                        >
                            <option value=""><FormattedMessage id="calendarModal.professionals"/></option>
                            {professionalsList.map(professional => (
                                <option key={professional.id} value={professional.name}>{professional.name}</option>
                            ))}
                        </select>
                    </div>
                    <div className="form-group">
                        <label htmlFor="commentsTextarea"><FormattedMessage id={"calendarModal.comentario"}/>:</label>
                        <textarea
                            id="commentsTextarea"
                            className="form-control"
                            rows="3"
                            placeholder={intl.formatMessage({ id: 'calendarModal.placeComentario' })}
                            value={comentarios}
                            onChange={(e) => setComentarios(e.target.value)}
                        />
                    </div>
                    <button type="submit" ><FormattedMessage id={'eventForm.addEvent'}/></button>

                </form>
            </div>
        </>
    );
}
export default EventForm;