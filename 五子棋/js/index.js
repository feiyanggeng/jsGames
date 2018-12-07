const canvas = document.getElementById('canvas')
let ctx = canvas.getContext('2d')
ctx.strokeStyle = '#BFBFBF'
const image = new Image()
image.src = 'image/geng.png'
image.onload = function() {
        ctx.drawImage(image, 0, 0, 450, 450)
        drawChess()
}

// 绘制棋盘
function drawChess() {
       for (let i = 0; i < 15; i++) {
               ctx.moveTo(15+30*i, 15)
               ctx.lineTo(15+30*i, 435)
               ctx.stroke()
               ctx.moveTo(15, 15+30*i)
               ctx.lineTo(435, 30*i+15)
               ctx.stroke()
       } 
}