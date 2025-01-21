
const serverURL = 'http://localhost:8000/api';
const form = document.getElementById('urlForm');
form.addEventListener('submit', handleSubmit);

function handleSubmit(event) {
    event.preventDefault();

    const formText = document.getElementById('name').value;
    if (!isValidURL(formText)) {
        alert('Please enter a valid URL.');
        return;
    }

    sendDataToServer({ url: formText })
        .then((response) => {
            console.log('Server Response:', response);
            document.getElementById('results').innerHTML = `Analysis: ${response.analysis}`;
        })
        .catch((error) => {
            console.error('Error communicating with the server:', error.message);
            alert('An error occurred while processing your request.');
        });
}

function isValidURL(url) {
    const regex = /^(https?:\/\/)?([a-zA-Z0-9-_]+\.)+[a-zA-Z]{2,}(\/[^\s]*)?$/;
    return regex.test(url);
}

async function sendDataToServer(data) {
    console.log(serverURL)
    const response = await fetch(serverURL, {
        method: 'POST',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    });
        console.log(response.error)
    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }

    return response.json();
}

export { handleSubmit };
