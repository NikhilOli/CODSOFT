const socket = io();

let currentUser = null;
let currentRoom = null;

function register() {
    const username = document.getElementById('reg-username').value;
    const email = document.getElementById('reg-email').value;
    const password = document.getElementById('reg-password').value;

    fetch('/register', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, email, password }),
    })
    .then(response => response.text())
    .then(result => {
        alert(result);
    })
    .catch((error) => {
        console.error('Error:', error);
    });
}

function login() {
    const username = document.getElementById('login-username').value;
    const password = document.getElementById('login-password').value;

    fetch('/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
    })
    .then(response => {
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
    })
    .then(data => {
        if (data.accessToken) {
            localStorage.setItem('token', data.accessToken);
            currentUser = username;
            showChatInterface();
            loadUsers();
            loadGroups();
        } else {
            throw new Error('Login failed: No access token received');
        }
    })
    .catch((error) => {
        console.error('Login error:', error);
        alert('Login failed: ' + error.message);
    });
}

function showChatInterface() {
    document.getElementById('auth-container').style.display = 'none';
    document.getElementById('chat-container').style.display = 'flex';
}

function loadUsers() {
    // Fetch users from server and populate users-list
    // This is a placeholder - you need to implement the server-side route
    fetch('/users', {
        headers: {
            'Authorization': 'Bearer ' + localStorage.getItem('token')
        }
    })
    .then(response => response.json())
    .then(users => {
        const usersList = document.getElementById('users-list');
        usersList.innerHTML = '';
        users.forEach(user => {
            if (user !== currentUser) {
                const li = document.createElement('li');
                li.textContent = user;
                li.onclick = () => startChat(user);
                usersList.appendChild(li);
            }
        });
    });
}

function loadGroups() {
    // Fetch groups from server and populate groups-list
    // This is a placeholder - you need to implement the server-side route
    fetch('/groups', {
        headers: {
            'Authorization': 'Bearer ' + localStorage.getItem('token')
        }
    })
    .then(response => response.json())
    .then(groups => {
        const groupsList = document.getElementById('groups-list');
        groupsList.innerHTML = '';
        groups.forEach(group => {
            const li = document.createElement('li');
            li.textContent = group.name;
            li.onclick = () => joinGroup(group.name);
            groupsList.appendChild(li);
        });
    });
}

function startChat(recipient) {
    currentRoom = recipient;
    document.getElementById('chat-header').textContent = `Chat with ${recipient}`;
    socket.emit('join', { room: currentRoom });
    loadMessages();
}

function joinGroup(groupName) {
    currentRoom = groupName;
    document.getElementById('chat-header').textContent = `Group: ${groupName}`;
    socket.emit('join', { room: currentRoom });
    loadMessages();
}

function loadMessages() {
    // Fetch messages for the current room from server
    // This is a placeholder - you need to implement the server-side route
    fetch(`/messages/${currentRoom}`, {
        headers: {
            'Authorization': 'Bearer ' + localStorage.getItem('token')
        }
    })
    .then(response => response.json())
    .then(messages => {
        const messagesContainer = document.getElementById('messages');
        messagesContainer.innerHTML = '';
        messages.forEach(message => {
            displayMessage(message);
        });
    });
}

function sendMessage() {
    const messageInput = document.getElementById('message-input');
    const content = messageInput.value;
    if (content) {
        socket.emit('sendMessage', {
            sender: currentUser,
            recipient: currentRoom,
            content: content,
            room: currentRoom
        });
        messageInput.value = '';
    }
}

function displayMessage(message) {
    const messagesContainer = document.getElementById('messages');
    const messageElement = document.createElement('div');
    messageElement.className = 'message';
    messageElement.textContent = `${message.sender}: ${message.content}`;
    messagesContainer.appendChild(messageElement);
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
}

socket.on('message', (message) => {
    displayMessage(message);
});

function createGroup() {
    const groupName = document.getElementById('new-group').value;
    if (groupName) {
        // Send request to create a new group
        fetch('/create-group', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            },
            body: JSON.stringify({ name: groupName })
        })
        .then(response => response.json())
        .then(result => {
            alert('Group created successfully');
            loadGroups();
        })
        .catch((error) => {
            console.error('Error:', error);
        });
    }
}