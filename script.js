// Function to open the username modal
function openUsernameModal() {
    document.getElementById('usernameModal').style.display = 'flex';
}

// Function to close the username modal
function closeUsernameModal() {
    document.getElementById('usernameModal').style.display = 'none';
}

// Event listener for Add Note button
document.getElementById('but1').addEventListener('click', async function() {
    const username = document.getElementById('usernameInput').value;
    const note = document.getElementById('area').value;

    if (!username || !note) {
        alert('Please enter both username and note.');
        return;
    }

    const response = await fetch('/addNote', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, note }),
    });

    const result = await response.json();
    document.getElementById('notescontainer').innerHTML = `<p>${result.message}</p>`;

    document.getElementById('area').value = ''; // Clear the textarea
});

// Event listener for Show Notes button
document.getElementById('but').addEventListener('click', async function() {
    const username = document.getElementById('usernameInput').value;

    if (!username) {
        alert('Please enter a username.');
        return;
    }

    const response = await fetch(`/notes?username=${encodeURIComponent(username)}`);
    const notes = await response.json();

    let notesHtml = '';
    notes.forEach(note => {
        notesHtml += `<p>${note}</p>`;
    });

    document.getElementById('notescontainer').innerHTML = notesHtml;
});

// Open the username modal on page load
window.onload = openUsernameModal;