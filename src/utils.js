export const showAlert = (message) => {
    // Create a div element
    const alertDiv = document.createElement('div');

    // Apply class and message
    alertDiv.className = 'alert-message';
    alertDiv.innerText = message;

    // Append to body
    document.body.appendChild(alertDiv);

    // Remove after 3 seconds
    setTimeout(() => {
        document.body.removeChild(alertDiv);
    }, 2000);
};