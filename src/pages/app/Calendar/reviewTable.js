import React, { useState } from 'react';
import { useEvents } from './context/eventsContext';
import moment from 'moment';

const ReviewTable = ({ eventId }) => {
    const { events, addReview, deleteReview, updateEvent } = useEvents();
    const event = events.find(e => e.id === parseInt(eventId, 10));
    const [newReview, setNewReview] = useState('');
    const [editingIndex, setEditingIndex] = useState(null);
    const [editingText, setEditingText] = useState('');

    const handleAddReview = () => {
        if (newReview.trim()) {
            const review = {
                text: newReview,
                date: new Date(),
                professional: 'Default Professional'
            };
            addReview(parseInt(eventId, 10), review);
            setNewReview('');
        }
    };

    const handleDeleteReview = (index) => {
        deleteReview(parseInt(eventId, 10), index);
    };

    const handleEditReview = (index) => {
        setEditingIndex(index);
        setEditingText(event.reviews[index].text);
    };

    const handleSaveEdit = () => {
        const updatedReviews = [...event.reviews];
        updatedReviews[editingIndex] = {
            ...updatedReviews[editingIndex],
            text: editingText,
            date: new Date() // Update the date to the current date
        };
        const updatedEvent = { ...event, reviews: updatedReviews };
        updateEvent(updatedEvent);
        setEditingIndex(null);
        setEditingText('');
    };

    if (!event) {
        return <div>Event not found</div>;
    }

    return (
        <div>
            <h2 className="text-xl font-semibold mb-2">Historia</h2>
            <table className="min-w-full leading-normal shadow-md rounded-lg overflow-hidden">
                <thead>
                <tr className="text-left text-gray-700 bg-gray-100">
                    <th className="px-5 py-3 border-b-2 border-gray-200">Date</th>
                    <th className={`px-5 py-3 border-b-2 border-gray-200`}>Profesional</th>
                    <th className="px-5 py-3 border-b-2 border-gray-200">Review</th>
                    <th className="px-5 py-3 border-b-2 border-gray-200">Actions</th>
                </tr>
                </thead>
                <tbody>
                {event.reviews.map((review, index) => (
                    <tr key={index} className="hover:bg-gray-100">
                        <td className="px-5 py-3 border-b border-gray-200">
                            {moment(review.date).format('LLL')}
                        </td>
                        <td className={`px-5 py-3 border-b border-gray-200`}>
                            {review.professional}
                        </td>
                        <td className="px-5 py-3 border-b border-gray-200">
                            {editingIndex === index ? (
                                <input
                                    type="text"
                                    value={editingText}
                                    onChange={(e) => setEditingText(e.target.value)}
                                    className="p-2 border rounded w-full"
                                />
                            ) : (
                                review.text
                            )}
                        </td>
                        <td className="px-5 py-3 border-b border-gray-200">
                            {editingIndex === index ? (
                                <button
                                    onClick={handleSaveEdit}
                                    className="text-green-600 hover:text-green-800 mr-2"
                                >
                                    Save
                                </button>
                            ) : (
                                <button
                                    onClick={() => handleEditReview(index)}
                                    className="text-blue-600 hover:text-blue-800 mr-2"
                                >
                                    Edit
                                </button>
                            )}
                            <button
                                onClick={() => handleDeleteReview(index)}
                                className="text-red-600 hover:text-red-800"
                            >
                                Delete
                            </button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
            <div className="mt-4">
                <input
                    type="text"
                    placeholder="Add a review"
                    value={newReview}
                    onChange={(e) => setNewReview(e.target.value)}
                    className="p-2 border rounded w-full"
                />
                <button
                    onClick={handleAddReview}
                    className="mt-2 p-2 bg-blue-500 text-white rounded"
                >
                    Add Review
                </button>
            </div>
        </div>
    );
};

export default ReviewTable;
