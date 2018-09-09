/* 自己飞机类 */
var ownFly = function(){
        //是否活着
        this.islive = true;
        //飞机的dom
        this.dom = null
        //子弹列表
        this.bullets = []

        this.init()
}
ownFly.prototype = {
        constructor : ownFly,
        //战场dom
        battleGroung : null,
        //战场宽度
        gameWidth : 0,
        //战场高度
        gameHeight : 0,
        //方向和开火键值对应
	keyCode : {
		37 : "left",
		38 : "up",
		39 : "right",
                40 : "down",
                32 : 'fire'
	},
        init : function(){
                this.dom = document.createElement('div')
                this.dom.className = 'ownfly'
        },
        setPosition : function(battleGroung){
                this.battleGroung = battleGroung
                this.battleGroung.appendChild(this.dom)
                this.dom.style.top = (this.battleGroung.clientHeight - this.dom.clientHeight)+'px'
                this.dom.style.left = this.battleGroung.clientWidth/2 - this.dom.clientWidth+'px'
                this.gameHeight = this.battleGroung.clientHeight
                this.gameWidth = this.battleGroung.clientWidth
        },
        move : function(keycode){
                if(!(keycode in this.keyCode))
                        return
                switch(this.keyCode[keycode]){
                        case 'left' :
                                this.moveLeft()
                                break
                        case 'right' :
                                this.moveRight()
                                break
                        case 'up' :
                                this.moveUp()
                                break
                        case 'down' :
                                this.moveDown()
                                break
                        case 'fire' :
                                this.fireBullet()
                                break
                        default :
                                break
                }
        },
        moveLeft : function(){
                let dir = this.dom.offsetLeft - this.dom.clientWidth
                if(dir >= 0){
                        this.dom.style.left = dir+'px'
                }
        }, 
        moveRight : function(){
                let dir = this.dom.offsetLeft + this.dom.clientWidth
                if(dir < this.battleGroung.clientWidth-this.dom.clientWidth/2){
                        this.dom.style.left = dir+'px'
                }
        },
        moveUp : function(){
                let dir = this.dom.offsetTop - this.dom.clientWidth
                if(dir>this.dom.clientHeight){
                        this.dom.style.top = dir+'px'
                }
        },
        moveDown : function(){
                let dir = this.dom.offsetTop + this.dom.clientWidth
                if(dir < this.battleGroung.clientHeight){
                        this.dom.style.top = dir+'px'
                }
        },
        animation : function(obj,json){
                let timer = null
                clearInterval(timer)
                let stop = false
                timer = setInterval(function(){
                        for(let attr in json){
                                let cur = 0
                                cur = parseInt(getComputedStyle(obj)[attr])
                                let speed = (json[attr] - cur)/6
                                speed = speed>0? Math.ceil(speed) : Math.floor(speed)
                                if(json[attr] == cur) stop = true
                                obj.style[attr] = cur + speed +'px'
                        }
                        if(stop){
                                clearInterval(timer)
                        }
                },30)
                
        },
        //发射子弹
        fireBullet : function(){
                let bullet = new Bullet()
                bullet.setPosition(this.battleGroung,this.dom)
                this.bullets.push(bullet)
        }
}