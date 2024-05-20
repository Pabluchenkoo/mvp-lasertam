// src/components/Calendario.js
import React, { useState } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import EventModal from "./modal/eventModal";
import { useLocation, useNavigate } from 'react-router-dom';
import { useIntl } from 'react-intl';
import { useEvents } from './context/eventsContext';

const localizer = momentLocalizer(moment);

const Calendario = () => {
    const intl = useIntl();
    const { events, addEvent, updateEvent, deleteEvent } = useEvents();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalMode, setModalMode] = useState('add');
    const [currentEvent, setCurrentEvent] = useState(null);
    const [clickPosition, setClickPosition] = useState({ x: 0, y: 0 });
    const [filterText, setFilterText] = useState('');
    const [sortOrder, setSortOrder] = useState('asc'); // 'asc' or 'desc'
    const location = useLocation();
    const navigate = useNavigate();

    const handleRowClick = (eventId) => {
        if (location.pathname !== '/cliente/calendario') {
            const newPath = `${location.pathname}/cita/${eventId}`;
            navigate(newPath);
        }
    };

    const handleSelectSlot = ({ start, end }) => {
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
            addEvent(editedEvent);
        } else {
            updateEvent(editedEvent);
        }
        setIsModalOpen(false);
        setCurrentEvent(null);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setCurrentEvent(null);
    };

    const handleDeleteEvent = (eventId) => {
        deleteEvent(eventId);
    };

    const filteredEvents = events.filter(event =>
        event.title.toLowerCase().includes(filterText.toLowerCase())
    );

    const sortedEvents = filteredEvents.sort((a, b) => {
        if (sortOrder === 'asc') {
            return new Date(a.start) - new Date(b.start);
        } else {
            return new Date(b.start) - new Date(a.start);
        }
    });

    return (
        <>
            <div className="p-4">
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

                <div className="mt-4">
                    <h2 className="text-xl font-semibold mb-2">Citas</h2>
                    <div className="mb-4 flex justify-between items-center">
                        <input
                            type="text"
                            placeholder="Filter by service"
                            value={filterText}
                            onChange={(e) => setFilterText(e.target.value)}
                            className="p-2 border rounded"
                        />
                        <div>
                            <button
                                onClick={() => setSortOrder('asc')}
                                className={`p-2 ml-2 ${sortOrder === 'asc' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
                            >
                                Sort Asc
                            </button>
                            <button
                                onClick={() => setSortOrder('desc')}
                                className={`p-2 ml-2 ${sortOrder === 'desc' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
                            >
                                Sort Desc
                            </button>
                        </div>
                    </div>
                    <table className="min-w-full leading-normal shadow-md rounded-lg overflow-hidden">
                        <thead>
                        <tr className="text-left text-gray-700 bg-gray-100">
                            <th className="px-5 py-3 border-b-2 border-gray-200">ID</th>
                            <th className="px-5 py-3 border-b-2 border-gray-200">Service</th>
                            <th className="px-5 py-3 border-b-2 border-gray-200">Client</th>
                            <th className="px-5 py-3 border-b-2 border-gray-200">Professional</th>
                            <th className="px-5 py-3 border-b-2 border-gray-200">Start Time</th>
                            <th className="px-5 py-3 border-b-2 border-gray-200">End Time</th>
                            <th className="px-5 py-3 border-b-2 border-gray-200">Comments</th>
                            <th className="px-5 py-3 border-b-2 border-gray-200">Actions</th>
                        </tr>
                        </thead>
                        <tbody>
                        {sortedEvents.map(event => (
                            <tr key={event.id}  onClick={() => handleRowClick(event.id)}  className="cursor-pointer hover:bg-gray-100">
                                <td className="px-5 py-3 border-b border-gray-200">{event.id}</td>
                                <td className="px-5 py-3 border-b border-gray-200">{event.title}</td>
                                <td className="px-5 py-3 border-b border-gray-200">{event.client?.name || 'N/A'}</td>
                                <td className="px-5 py-3 border-b border-gray-200">{event.professional}</td>
                                <td className="px-5 py-3 border-b border-gray-200">{moment(event.start).format('LLL')}</td>
                                <td className="px-5 py-3 border-b border-gray-200">{moment(event.end).format('LLL')}</td>
                                <td className="px-5 py-3 border-b border-gray-200">{event.comments}</td>
                                <td className="px-5 py-3 border-b border-gray-200">
                                    <button
                                        onClick={() => handleDeleteEvent(event.id)}
                                        className="bg-red-500 text-white p-1 rounded"
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    );
};

export default Calendario;
