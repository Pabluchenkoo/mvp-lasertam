import React, {useEffect, useState} from 'react';

const EventModal = ({ isOpen, onClose, onSave, event, clickPosition }) => {
    const [title, setTitle] = useState('');
    const [startDate, setStartDate] = useState(event?.start ? event.start.toISOString().slice(0,16) : '');
    const [endDate, setEndDate] = useState(event?.end ? event.end.toISOString().slice(0,16) : '');

    useEffect(() => {
        if (event) {
            setTitle(event.title || '');
            const startStr = event.start ? formatDateToInputDateTimeLocal(event.start) : '';
            const endStr = event.end ? formatDateToInputDateTimeLocal(event.end) : '';
            setStartDate(startStr);
            setEndDate(endStr);
        }
    }, [event]);
    const formatDateToInputDateTimeLocal = (date) => {
        const newDate = new Date(date);
        const offset = newDate.getTimezoneOffset();
        const adjustedDate = new Date(newDate.getTime() - (offset * 60 * 1000));
        return adjustedDate.toISOString().slice(0, 16);
    };

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

    const modalStyle = {
        position: 'fixed', 
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        zIndex: 1050,
        width: '400px',
        padding: '20px',
        background: 'white',
        borderRadius: '8px',
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
    };

    return (
        <div style={modalStyle} className="bg-white rounded-2xl border-4 border-black">
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Event Title" required className="form-control" />
                </div>
                <hr/>
                <div className="form-group">
                    <input type="datetime-local" value={startDate} onChange={(e) => setStartDate(e.target.value)} required className="form-control" />
                </div>
                <hr/>
                <div className="form-group">
                    <input type="datetime-local" value={endDate} onChange={(e) => setEndDate(e.target.value)} required className="form-control" />
                </div>
                <hr/>
                <div className="justify-content-center flex space-x-4 mt-4">
                    <button type="submit" className="btn btn-primary">Save</button>
                    <button type="button" onClick={onClose} className="btn btn-secondary">Cancel</button>
                </div>
            </form>
        </div>
    );
};

export default EventModal;