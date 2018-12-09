const canvas = document.getElementById('canvas')
let ctx = canvas.getContext('2d')
ctx.strokeStyle = '#BFBFBF'
const image = new Image()
image.src = 'image/geng.png'
image.onload = function() {
        ctx.drawImage(image, 0, 0, 450, 450)
        drawChess()
}

let isme = true                // 判断是自己还是电脑
let chess = []                  // 记录棋盘上面的点

// 初始化棋盘数组
for (let i=0; i < 15; i++) {
        chess[i] = []
        for (let j = 0; j < 15; j++) {
                chess[i][j] = 0
        }
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

// 绘制棋子
function drawChessPieces(i, j, me) {
        ctx.beginPath()
        ctx.arc(15 + i * 30,15 + j * 30, 13, 0, 2*Math.PI)
        ctx.closePath()
        let color = ctx.createRadialGradient(15 + i * 30, 15 + j * 30, 13, 17 + i * 30, 13 + j * 30, 2)
        if (me) {
                color.addColorStop(0, "#0A0A0A")
                color.addColorStop(1, "#636766")
                chess[i][j] = 1
        } else {
                color.addColorStop(0, "#D1D1D1")
                color.addColorStop(1, "#F9F9F9")
                chess[i][j] = 2
        }
        ctx.fillStyle = color
        ctx.fill()
        isme = !isme
}

// 玩家绘制
canvas.onclick = function(e) {
        if(!isme) {
                return
        }
        let i = Math.ceil(e.offsetX/30) - 1
        let j = Math.ceil(e.offsetY/30) - 1
        if (chess[i][j] !== 0) {
                return
        }
        drawChessPieces(i, j, isme)
        computerAI()
}

// 电脑绘制
computerAI = function () {
        drawChessPieces(i, j, isme)
}