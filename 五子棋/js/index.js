const canvas = document.getElementById('canvas')
let ctx = canvas.getContext('2d')
const image = new Image()
image.src = 'image/geng.png'
image.onload = function() {
        ctx.drawImage(image, 0, 0, 450, 450)
}

function drawChess() {
        ctx.began
}