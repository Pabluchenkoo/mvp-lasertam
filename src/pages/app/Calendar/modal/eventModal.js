import React, {useEffect, useState} from 'react';
import {formatDateToInputDateTimeLocal, modalStyle} from "./auxiliaryFunc";
import FetchProfessionals from "./hooks/fetchProfessionals";
import { FormattedMessage, useIntl } from 'react-intl';



const EventModal = ({ isOpen, onClose, onSave, event }) => {
    const intl = useIntl();
    const [title, setTitle] = useState('');
    const [startDate, setStartDate] = useState(event?.start ? event.start.toISOString().slice(0,16) : '');
    const [endDate, setEndDate] = useState(event?.end ? event.end.toISOString().slice(0,16) : '');
    const [professional,setProfessional] = useState('')
    const [comentarios, setComentarios] = useState('');


    const professionalsList = FetchProfessionals();
    // console.log(professionalsList)


    useEffect(() => {
        if (event) {
            setTitle(event.title || '');
            const startStr = event.start ? formatDateToInputDateTimeLocal(event.start) : '';
            const endStr = event.end ? formatDateToInputDateTimeLocal(event.end) : '';
            setStartDate(startStr);
            setEndDate(endStr);

            setComentarios(event.comentarios)

            const assignedProfessional = professionalsList.find(p => p.id === event.professional);
            if (assignedProfessional) {
                setProfessional(assignedProfessional.name);
            }
        }
    }, [event, professionalsList]);

    const handleSubmit = (e) => {
        e.preventDefault();
        onSave({
            ...event,
            title,
            start: new Date(startDate),
            end: new Date(endDate),
        });
    };

    if (!isOpen) return null;
    return (
        <div style={modalStyle} className="bg-white rounded-2xl border-4 border-black">
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <input type="text" value={title} onChange={(e) => setTitle(e.target.value)}
                           placeholder={intl.formatMessage({ id: 'calendarModal.title' })} required className="form-control"/>
                </div>
                <hr/>
                <div className="form-group">
                    <input type="datetime-local" value={startDate} onChange={(e) => setStartDate(e.target.value)}
                           required className="form-control"/>
                </div>
                <hr/>
                <div className="form-group">
                    <input type="datetime-local" value={endDate} onChange={(e) => setEndDate(e.target.value)} required
                           className="form-control"/>
                </div>
                <hr/>
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
                <hr/>
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
                <hr/>
                <div className="justify-content-center flex space-x-4 mt-4">
                    <button type="submit" className="btn btn-primary"><FormattedMessage id={"calendarModal.save"}/></button>
                    <button type="button" onClick={onClose} className="btn btn-secondary"><FormattedMessage id={"calendarModal.cancel"}/></button>
                </div>

            </form>
        </div>
    );
};

export default EventModal;