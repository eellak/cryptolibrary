import React from 'react';

const errorPageStyles = {
    textAlign: 'center',
    padding: '20px',
    backgroundColor: '#f8f8f8',
};

const headingStyles = {
    fontSize: '36px',
    color: '#ff0000',
};

const messageStyles = {
    fontSize: '18px',
    color: '#333',
};

const closeButtonStyles = {
    backgroundColor: 'red',
    color: 'white',
    padding: '10px 20px',
    border: 'none',
    cursor: 'pointer',
};

const closeWindow = () => {
    window.close(); // Close the browser tab or window
};

const ErrorPage = () => {
    return (
        <div style={errorPageStyles}>
            <h1 style={headingStyles}>Error 404</h1>
            <p style={messageStyles}>
                You didn't take all the necessary steps!
            </p>
            <button style={closeButtonStyles} onClick={closeWindow}>
                Close
            </button>
        </div>
    );
};

export default ErrorPage;
