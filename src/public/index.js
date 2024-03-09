const socket = io();
let click = false;
let moving_mouse = false;
let x_position = 0;
let y_position = 0;
let previus_position = null;
let color = 'black';

const canvas = document.getElementById('canvas');
const btn_delete = document.getElementById('btn_delete');
const colors = document.querySelector('.colors');
const users = document.querySelector('.users');
const context = canvas.getContext('2d');

const width  = window.innerWidth;
const height = window.innerHeight;

canvas.width = width;
canvas.height = height;

//eventos

canvas.addEventListener('mousedown', () => {
    click  = true;
});
canvas.addEventListener('mouseup', () => {
    click  = false;
});
canvas.addEventListener('mousemove', event => {
    moving_mouse = true;
    x_position = event.clientX;
    y_position = event.clientY;
});

btn_delete.addEventListener('click', event => {
    event.preventDefault();
    socket.emit('delete');
});

colors.addEventListener('click', event => {
    event.preventDefault();
    if (event.target.tagName == 'BUTTON') {
        let element = event.target;
        let estilos = element.computedStyleMap();
        let color = estilos.get("background-color").toString();
        chage_color(color);
    }
});
function chage_color(p_color) {
    color = p_color;
    context.strokeStyle = color;
    context.stroke();
}
function create_drawing() {
    if (click && moving_mouse && previus_position != null) {
        let drawing = {
            x_position,
            y_position,
            color,
            previus_position
        };
        socket.emit('drawing',drawing);
    }
    previus_position = {x_position, y_position};
    setTimeout(create_drawing,25);
}

socket.on('show_drawing', drawing => {
    if (drawing == null) {
        context.clearRect(0, 0, canvas.width, canvas.height);
        return;
    }
    context.beginPath();
    context.lineWidth = 3;
    context.strokeStyle = drawing.color;
    context.moveTo(drawing.x_position, drawing.y_position);
    context.lineTo (
        drawing.previus_position.x_position,
        drawing.previus_position.y_position
    );
    context.stroke();
});

socket.on('users',  (number) => {
    users.innerHTML = `Numero de usuarios conectados: ${number}`;
});

create_drawing();