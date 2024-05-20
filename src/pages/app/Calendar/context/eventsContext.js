// src/context/EventsContext.js
import React, {createContext, useContext, useEffect, useState} from 'react';
import moment from "moment";

const EventsContext = createContext();

export const useEvents = () => {
    return useContext(EventsContext);
};

export const EventsProvider = ({ children }) => {
    const [events, setEvents] = useState(() => {
        // Load events from local storage if available
        const storedEvents = localStorage.getItem('events');
        return storedEvents ? JSON.parse(storedEvents).map(event => ({
            ...event,
            start: new Date(event.start),
            end: new Date(event.end),
            reviews: event.reviews ? event.reviews.map(review => ({
                ...review,
                date: new Date(review.date)
            })) : [],
            client: event.client || { name: '', phone: '', email: '' }
        })) : [{
                id: 1,
                start: moment().toDate(),
                end: moment().add(1, 'hours').toDate(),
                title: 'Servicio1',
                professional: 'Juan Perez',
                comments: 'Comentario de prueba',
                client: {
                    name: 'Cliente1',
                    phone: '+57 1 123456789',
                    email: 'asd@asd.com.co'
                },
                reviews: [{
                    text: 'Great session!',
                    date: moment().subtract(2, 'days').toDate(),
                    professional: 'Juan Perez'
                },
                    {
                        text: 'Very informative.',
                        date: moment().subtract(1, 'days').toDate(),
                        professional: 'Aldo Cardenas'
                    }
                ]


            },
        ];
    });

    useEffect(() => {
        // Save events to local storage whenever they change
        localStorage.setItem('events', JSON.stringify(events));
    }, [events]);

    const addEvent = (newEvent) => {
        setEvents((prevEvents) => {
            const updatedEvents = [...prevEvents, { ...newEvent, id: prevEvents.length + 1 }];
            localStorage.setItem('events', JSON.stringify(updatedEvents)); // Update local storage
            return updatedEvents;
        });
    };

    const updateEvent = (updatedEvent) => {
        setEvents((prevEvents) => {
            const updatedEvents = prevEvents.map((event) => (event.id === updatedEvent.id ? updatedEvent : event));
            localStorage.setItem('events', JSON.stringify(updatedEvents)); // Update local storage
            return updatedEvents;
        });
    };

    const deleteEvent = (eventId) => {
        setEvents((prevEvents) => {
            const updatedEvents = prevEvents.filter(event => event.id !== eventId);
            localStorage.setItem('events', JSON.stringify(updatedEvents)); // Update local storage
            return updatedEvents;
        });
    };

    const addReview = (eventId, review) => {
        setEvents((prevEvents) => {
            const updatedEvents = prevEvents.map((event) =>
                event.id === eventId ? { ...event, reviews: [...event.reviews, review] } : event
            );
            localStorage.setItem('events', JSON.stringify(updatedEvents)); // Update local storage
            return updatedEvents;
        });
    };

    const deleteReview = (eventId, reviewIndex) => {
        setEvents((prevEvents) => {
            const updatedEvents = prevEvents.map((event) =>
                event.id === eventId
                    ? { ...event, reviews: event.reviews.filter((_, index) => index !== reviewIndex) }
                    : event
            );
            localStorage.setItem('events', JSON.stringify(updatedEvents)); // Update local storage
            return updatedEvents;
        });
    };

    const value = {
        events,
        addEvent,
        updateEvent,
        deleteEvent,
        addReview,
        deleteReview
    };

    return <EventsContext.Provider value={value}>{children}</EventsContext.Provider>;
};