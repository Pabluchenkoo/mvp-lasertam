import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { formatDateToInputDateTimeLocal, modalStyle } from './auxiliaryFunc';
import FetchProfessionals from './hooks/fetchProfessionals';
import { FormattedMessage, useIntl } from 'react-intl';
import { useEvents } from '../context/eventsContext'; // Import the useEvents hook
import moment from 'moment';

const EventModal = ({ isOpen, onClose, event }) => {
    const intl = useIntl();
    const location = useLocation(); // Get the current location
    const { addEvent, updateEvent } = useEvents(); // Access the context API
    const [title, setTitle] = useState('');
    const [startDate, setStartDate] = useState(event?.start ? event.start.toISOString().slice(0, 16) : '');
    const [endDate, setEndDate] = useState(event?.end ? event.end.toISOString().slice(0, 16) : '');
    const [professional, setProfessional] = useState('');
    const [service, setService] = useState(''); // New state for service
    const [comentarios, setComentarios] = useState('');
    const [name, setName] = useState(''); // New state for name
    const [phone, setPhone] = useState(''); // New state for phone
    const [email, setEmail] = useState(''); // New state for email

    const professionalsList = FetchProfessionals();
    const servicesList = [
        { id: 1, name: 'Depilación brazos' },
        { id: 2, name: 'Depilación piernas' },
        { id: 3, name: 'Depilación espalda' },
        { id: 4, name: 'Depilación facial' },
        { id: 5, name: 'Depilación cejas' },
        { id: 6, name: 'Depilación axilas' },
        { id: 7, name: 'Depilación bikini' },
        { id: 8, name: 'Depilación piernas completas' },
        { id: 9, name: 'Depilación ingles' },
        { id: 10, name: 'Depilación labio superior' },
        { id: 11, name: 'Depilación pecho' },
        { id: 12, name: 'Depilación abdomen' },
    ];

    useEffect(() => {
        if (event) {
            setTitle(event.title || '');
            const startStr = event.start ? formatDateToInputDateTimeLocal(new Date(event.start)) : '';
            const endStr = event.end ? formatDateToInputDateTimeLocal(new Date(event.end)) : '';
            setStartDate(startStr);
            setEndDate(endStr);
            setComentarios(event.comments || '');

            const assignedProfessional = professionalsList.find(p => p.id === event.professional);
            if (assignedProfessional) {
                setProfessional(assignedProfessional.name);
            }
        }
    }, [event, professionalsList]);

    const handleSubmit = (e) => {
        e.preventDefault();
        const newEvent = {
            ...event,
            title: servicesList.find(p => p.name === service).name,
            start: new Date(startDate),
            end: new Date(endDate),
            professional: professionalsList.find(p => p.name === professional).name,
            comments: comentarios,
            client: {
                name,
                phone,
                email,
            }
        };

        if (event && event.id) {
            updateEvent(newEvent); // Update existing event
        } else {
            addEvent(newEvent); // Add new event
        }
        setTitle('');
        setStartDate('');
        setEndDate('');
        setProfessional('');
        setService('');
        setComentarios('');
        setName('');
        setPhone('');
        setEmail('');

        onClose(); // Close the modal after saving
    };

    if (!isOpen) return null;
    return (
        <div style={modalStyle} className="bg-white rounded-2xl border-4 border-black">
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <select
                        id="ServicesSelect"
                        value={service}
                        onChange={(e) => setService(e.target.value)}
                        className="form-control"
                        required
                    >
                        <option value="">Select a service</option>
                        {servicesList.map(service => (
                            <option key={service.id} value={service.name}>{service.name}</option>
                        ))}
                    </select>
                </div>
                <hr />
                <div className="form-group">
                    <input
                        type="datetime-local"
                        value={startDate}
                        onChange={(e) => setStartDate(e.target.value)}
                        required
                        className="form-control"
                    />
                </div>
                <hr />
                <div className="form-group">
                    <input
                        type="datetime-local"
                        value={endDate}
                        onChange={(e) => setEndDate(e.target.value)}
                        required
                        className="form-control"
                    />
                </div>
                <hr />
                <div className="form-group">
                    <label htmlFor="professionalSelect"><FormattedMessage id="calendarModal.professional" />:</label>
                    <select
                        id="professionalSelect"
                        value={professional}
                        onChange={(e) => setProfessional(e.target.value)}
                        className="form-control"
                        required
                    >
                        <option value=""><FormattedMessage id="calendarModal.professionals" /></option>
                        {professionalsList.map(professional => (
                            <option key={professional.id} value={professional.name}>{professional.name}</option>
                        ))}
                    </select>
                </div>
                <hr />
                <div className="form-group">
                    <label htmlFor="commentsTextarea"><FormattedMessage id={"calendarModal.comentario"} />:</label>
                    <textarea
                        id="commentsTextarea"
                        className="form-control"
                        rows="3"
                        placeholder={intl.formatMessage({ id: 'calendarModal.placeComentario' })}
                        value={comentarios}
                        onChange={(e) => setComentarios(e.target.value)}
                    />
                </div>
                <hr />
                {location.pathname === '/cliente/calendario' && (
                    <>
                        <div className="form-group">
                            <input
                                type="text"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                placeholder="Name"
                                required
                                className="form-control"
                            />
                        </div>
                        <hr />
                        <div className="form-group">
                            <input
                                type="text"
                                value={phone}
                                onChange={(e) => setPhone(e.target.value)}
                                placeholder="Phone"
                                required
                                className="form-control"
                            />
                        </div>
                        <hr />
                        <div className="form-group">
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="Email"
                                required
                                className="form-control"
                            />
                        </div>
                        <hr />
                    </>
                )}
                <div className="justify-content-center flex space-x-4 mt-4">
                    <button type="submit" className="btn btn-primary"><FormattedMessage id={"calendarModal.save"} /></button>
                    <button type="button" onClick={onClose} className="btn btn-secondary"><FormattedMessage id={"calendarModal.cancel"} /></button>
                </div>
            </form>
        </div>
    );
};

export default EventModal;
