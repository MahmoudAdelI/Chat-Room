// DOM Query
const chatList = document.querySelector('.chat-list');
const newMessage = document.querySelector('.new-chat');
const updateName = document.querySelector('.new-name');
const updateMsg = document.querySelector('.update-message');
const rooms = document.querySelector('.chat-rooms');
const loader = document.querySelector('.loader');

// add a new message
newMessage.addEventListener('submit', e => {
    e.preventDefault();
    const message = newMessage.message.value.trim();
    chat.addChat(message)
        .then(() => newMessage.reset())
        .catch(error => console.log(error));
    newMessage.reset();
});

// update username
updateName.addEventListener('submit', e => {
    e.preventDefault();
    const newName = updateName.name.value.trim();
    chat.updateUsername(newName);
    updateName.reset();
    //show success msg
    updateMsg.innerHTML = `Your name was updated to <span class="newName">"${newName}"</span>`;
    setTimeout(() => updateMsg.textContent = '', 3000)
});

// update chat room
rooms.addEventListener('click', e => {
    if (e.target.tagName === 'BUTTON') {
        chatUI.clear();
        chat.updateRoom(e.target.getAttribute('id'))
        // you must call getChat here to set the listener on again while switching rooms
        chat.getChat('room', chat.room, data => {
            chatUI.render(data);
            loader.classList.add('d-none');
        });
    }
});

//check the localStorage if it has a stored name
const user = localStorage.user ? localStorage.user : 'Anonymous';


// class instances
const chatUI = new ChatUI(chatList);

import { Chatroom } from './chat.js'
const chat = new Chatroom('general', user);

// Get chat and render
// this getChat is to fetch data on page loading
chat.getChat('room', chat.room, data => {
    chatUI.render(data)
    console.log(data)
    loader.classList.add('d-none'); // hiding the loader again before updating the UI
});
