const canvas = document.getElementById('canvas')
let ctx = canvas.getContext('2d')
ctx.strokeStyle = '#BFBFBF'
const image = new Image()
image.src = 'image/geng.png'
image.onload = function() {
        ctx.drawImage(image, 0, 0, 450, 450)
        drawChess()
}

let isme = true                // 判断是自己还是代码
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

// 绘制棋子
function drawChessPieces(x, y, me) {
        ctx.beginPath()
        ctx.arc(x, y, 13, 0, 2*Math.PI)
        ctx.closePath();
        let color = ctx.createRadialGradient(x, y, 13, x + 2, y - 2, 2)
        if (me) {
                color.addColorStop(0, "#0A0A0A")
                color.addColorStop(1, "#636766")
        } else {
                color.addColorStop(0, "#D1D1D1")
                color.addColorStop(1, "#F9F9F9")
        }
        ctx.fillStyle = color
        ctx.fill()
}

// 玩家绘制
canvas.onclick = function(e) {
        if(!isme) {
                return
        }
        let point_x = 15 + (Math.ceil(e.offsetX/30) - 1) * 30
        let point_y = 15 + (Math.ceil(e.offsetY/30) - 1) * 30
        drawChessPieces(point_x, point_y, isme)
        isme = !isme
}

// 电脑绘制
computerAI = function () {
        
}