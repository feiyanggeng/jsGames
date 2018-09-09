/* 子弹类 */
var Bullet = function(){
        //是否存在
        this.isShow = true
        //子弹的dom
        this.dom = null
        //战场的dom
        this.ground = null
        //所在飞机的dom
        this.fly = null
        //子弹移动的定时器
        this.timer = null

        this.init()
}
Bullet.prototype = {
        constructor: Bullet,
        //子弹的起始位置
        startX : 0,
        startY : 0,

        init : function(){
                this.dom = document.createElement('div')
                this.dom.className = 'bullet'
        },
        //设置子弹位置
        setPosition : function (ground,fly) {

                ground.appendChild(this.dom)

                this.startX = fly.offsetLeft + fly.clientWidth/2 - this.dom.clientWidth/2
                this.startY = fly.offsetTop-this.dom.clientHeight

                this.dom.style.left = this.startX + 'px'
                this.dom.style.top = this.startY + 'px'
                //子弹一开始出现就是移动的
                this.animation(ground)

        },
        //子弹移动
        animation : function(ground){
                let cur = this.dom.clientHeight
                let speed = cur/2
                this.timer = setInterval(()=>{
                        let nowPosition = this.dom.offsetTop;
                        if(nowPosition <= cur){
                                this.isShow = false
                                ground.removeChild(this.dom)
                        }
                        this.dom.style.top = nowPosition - speed +'px'
                        if(!this.isShow){
                                clearInterval(this.timer)
                        }
                },50)
        },
        //子弹消失----击中敌机或飞到地图边缘
        isDown : function(){} 

}