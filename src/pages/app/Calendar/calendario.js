import React, { useState } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import EventModal from "./modal/eventModal";
import {useLocation} from "react-router-dom"; // Make sure the import is correct based on your file structure

const localizer = momentLocalizer(moment);

const Calendario = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalMode, setModalMode] = useState('add'); // 'add' or 'edit'
    const [currentEvent, setCurrentEvent] = useState(null);
    const [clickPosition, setClickPosition] = useState({ x: 0, y: 0 });
    const [events, setEvents] = useState([
        {
            id: 1,
            start: moment().toDate(),
            end: moment().add(1, 'hours').toDate(),
            title: 'Sample Event',
            professional: 'Juan Perez',
            comentarios: 'Comentario de prueba'
        },
    ]);
    // console.log(events);
    const location = useLocation();

    const handleSelectSlot = ({ start, end }) => {
        if(location.pathname !== '/cliente/calendario'){
        setCurrentEvent({ start, end, title: '' });
        setIsModalOpen(true);
        setModalMode('add');
        }
        else
            return;
    };

    const handleSelectEvent = (event, e) => {
        const clickPosition = { x: e.clientX, y: e.clientY };

        if(location.pathname !== '/cliente/calendario'){
        setCurrentEvent(event);
        setClickPosition(clickPosition);
        setIsModalOpen(true);
        setModalMode('edit');
        }
        else
            return;
    };

    const saveEditedEvent = (editedEvent) => {
        if (modalMode === 'add') {
            setEvents(prevEvents => [...prevEvents, { ...editedEvent, id: prevEvents.length + 1 }]);
        } else {
            setEvents(events.map(event => event.id === editedEvent.id ? editedEvent : event));
        }
        setIsModalOpen(false);
        setCurrentEvent(null);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setCurrentEvent(null);
    };

    return (
        <>
            <div>
                <br/>

                <Calendar
                    selectable
                    onSelectSlot={handleSelectSlot}
                    onSelectEvent={handleSelectEvent}
                    localizer={localizer}
                    events={events}
                    startAccessor="start"
                    endAccessor="end"
                    views={['month', 'week', 'day', 'agenda']}
                    style={{ height: 500 }}
                />
                <EventModal
                    isOpen={isModalOpen}
                    onClose={closeModal}
                    onSave={saveEditedEvent}
                    event={currentEvent}
                    clickPosition={clickPosition}
                    modalMode={modalMode}
                />
            </div>
        </>
    );
}

export default Calendario;
