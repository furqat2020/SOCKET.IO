const socket = io('http://localhost:3000')

const messageContainer = document.getElementById('message-container')
const messageForm = document.getElementById('send-container')
const messageInput = document.getElementById('message-input')

const name = prompt('Ismingiz?')
appendMessage(`${name} Online`)
socket.emit('new-user', name)

socket.on('chat-message', data => {
    appendMessage(`${data.name}: ${data.message}`)
})

socket.on('user-connected', name => {
    appendMessage(`${name} ulandi. `)
})

socket.on('disconnected', name => {
    appendMessage(`${name} chiqdi.`)
})

messageForm.addEventListener('submit', e => {
    e.preventDefault()
    const message = messageInput.value
    if(message != ''){
        appendMessage(`You: ${message}`)
        socket.emit('send-chat-message', message)
        messageInput.value = ''        
    }
})

function appendMessage(message){
    const messageElement = document.createElement('li')

    messageElement.innerText = message
    messageContainer.append(messageElement)
}

var my_ul = document.getElementById('message-container')
var my_li = my_ul.firstChild
my_li.setAttribute('class', 'first_li')
