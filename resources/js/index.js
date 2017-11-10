const remote = require('electron').remote
const main = require('../main.js')

let button = document.createElement('button')
button.textContent = "Ventana"
document.body.appendChild(button)

button.addEventListener('click', () => {
    main.createWindow(100, 100, "index.html");
})