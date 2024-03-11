import React, { useState } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import EventModal from "./eventModal"; // Make sure the import is correct based on your file structure

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
        },
    ]);

    const handleSelectSlot = ({ start, end, action }) => {
        setCurrentEvent({ start, end, title: '' });
        setIsModalOpen(true);
        setModalMode('add');
    };

    const handleSelectEvent = (event, e) => {
        const clickPosition = { x: e.clientX, y: e.clientY };
        setCurrentEvent(event);
        setClickPosition(clickPosition);
        setIsModalOpen(true);
        setModalMode('edit');
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
