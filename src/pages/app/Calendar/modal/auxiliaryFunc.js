
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

const formatDateToInputDateTimeLocal = (date) => {
    const newDate = new Date(date);
    const offset = newDate.getTimezoneOffset();
    const adjustedDate = new Date(newDate.getTime() - (offset * 60 * 1000));
    return adjustedDate.toISOString().slice(0, 16);
};


export {modalStyle, formatDateToInputDateTimeLocal};