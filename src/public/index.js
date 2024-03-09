const socket = io();
let click = false;
let moving_mouse = false;
let x_position = 0;
let y_position = 0;
let previus_position = null;
let color = 'black';

const canvas = document.getElementById('canvas');
const context = canvas.getContext('2d');

const width  = window.innerWidth;
const height = window.innerHeight;
console.log(window.innerHeight);
console.log(window.innerWidth);

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



function create_drawing() {
    if (click && moving_mouse && previus_position != null) {
        let drawing = {
            x_position,
            y_position,
            color,
            previus_position
        };
        show_drawing(drawing);
    }
    previus_position = {x_position, y_position};
    setTimeout(create_drawing,25);
}

function show_drawing(drawing) {
    context.beginPath();
    context.lineWidth = 3;
    context.strokeStyle = drawing.color;
    context.moveTo(drawing.x_position, drawing.y_position);
    context.lineTo (
        drawing.previus_position.x_position,
        drawing.previus_position.y_position
    );
    context.stroke();
}

create_drawing();