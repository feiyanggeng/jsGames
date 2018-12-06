const canvas = document.getElementById('canvas')
let ctx = canvas.getContext('2d')
let canvas_width = canvas.width = document.documentElement.clientWidth || document.body.clientWidth || window.innerWidth
let canvas_height = canvas.height = document.documentElement.clientHeight || document.body.clientHeight || window.innerHeight
const image = new Image()
image.src = '/image/geng.gif'
ctx.drawImage(image, 10, 10)