let input = document.querySelector('#name')
let params = (new URL(document.location)).searchParams
let name = params.get("character")
let textInputBox = document.querySelector('#msg')
const serverMessage = document.querySelector('#serverMessage')

const API_URL = 'https://quiet-bayou-99554.herokuapp.com/api/v1/contacts'
input.setAttribute('value', name)

const form = document.querySelector('form')
const loadingMessage = document.querySelector('#loadingMessage')
loadingMessage.style.display = 'none'
form.addEventListener('submit', postNewMessage)
function postNewMessage(event) {
    event.preventDefault()
    form.style.display = 'none'
    loadingMessage.style.display = ''
    const formData = new FormData(form)
    const message = formData.get('user_message')
    const name = formData.get('user_name')
    const data = {
        "data": {
            "character": name,
            "message": message
        }
    }
    sendMessage(data)
        // .then(showResponse)
}

function sendMessage (data) {
    const body = JSON.stringify(data)
    return fetch(API_URL, {
            method: 'POST',
            body,
            headers: {
                'content-type': 'application/json'
            }
    }).then(response => {
        if (response.ok) {
            return response.json()
        }
        else {
            return response.json().then(response => {
                const err = new Error(response.error.message)
                throw err
            })
            
        }
    })
    .then(showResponse)
    .catch(err => {  
        serverMessage.textContent = err.message
        loadingMessage.style.display = 'none'
        form.style.display = ''
        textInputBox.value = ''
    })
}

function showResponse(response) {
    serverMessage.textContent = response.data.message
    loadingMessage.style.display = 'none'
    form.style.display = ''
    textInputBox.value = ''
}