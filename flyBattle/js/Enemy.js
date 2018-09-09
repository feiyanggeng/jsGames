/* 敌军飞机类 */
var Enemy = function(){
        //敌军飞机的dom
        this.dom = null
        //战场的dom
        this.ground = null
        this.timer = null
        //判断游戏是否结束
        this.gameOver = false
        //飞机飞行方向
        this.flyDriction = {
                1 : 'left',
                2 : 'right',
                3 : 'center'
        }

        this.init()
}
Enemy.prototype = {
        constructor : Enemy,
        //战场宽度
        groundWidth : 0,
        //战场高度
        groundHeight : 0,

        init : function(){
                this.dom = document.createElement('div')
                this.dom.className = 'enemy'
        },
        //设置飞机的起始位置
        setPosition : function(ground,position,index){
                this.ground = ground
                this.groundHeight = this.ground.clientHeight
                this.groundWidth = this.ground.clientWidth
                this.ground.appendChild(this.dom)

                this.dom.style.top = this.dom.clientHeight+'px'
                this.dom.style.left = position+'px'
                this.animation(this.ground)
        },
        animation : function(ground){
                let cur = this.dom.clientHeight
                this.timer = setInterval(()=>{
                        let nowPosition = this.dom.offsetTop;
                        this.dom.style.top = nowPosition + cur +'px'
                        if(nowPosition >= ground.clientHeight-this.dom.clientHeight*2){
                                clearInterval(this.timer)
                                this.gameOver = true
                        }
                },600)
        }

}


