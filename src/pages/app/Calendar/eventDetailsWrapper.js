// EventDetailsWrapper.js
import React, { useState, useEffect } from 'react';
import EventDetails from './eventDetails';

const EventDetailsWrapper = () => {
    const [events, setEvents] = useState([
        // Your events data here
    ]);

    // Optionally, fetch your events data here if it comes from an API
    useEffect(() => {
        // Fetch data and setEvents
    }, []);

    return <EventDetails events={events} />;
};

export default EventDetailsWrapper;
