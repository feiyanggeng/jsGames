/**
 * 创建Local类用于 连接用户的一些操作与game之间的联系
 * 监听整个游戏的状态  开始或结束
 */
class Local {
        constructor(){
                this.INTERVAL = 500
                this.game = new Game()          //实例化game对象
                this.doms                  //保存交互要用到的dom
                this.timer                      //定时器
        }
        makeSquareType () {
                return Math.ceil(Math.random()*7)
        }
        makeTypeModel () {
                return Math.floor(Math.random()*4)
        }
        bindKeyEvent () {
                document.addEventListener('keydown', e => {
                        if (e.keyCode === 38){ //up
                                this.game.rotate();
                        }else if(e.keyCode===39){ //right
                                this.game.right();
                        }else if(e.keyCode===40){ //down
                                this.game.down();
                        }else if(e.keyCode===37){ //left
                                this.game.left();
                        }else if(e.keyCode===32){ //space
                                this.game.fall();
                        }
                })
        }
        /**
         * 方块自己下落
         */
        down () {
                if (this.game.down()) {
                        this.game.fixed()
                        let line = this.game.clearLine()
                        this.game.setSore(line)
                        if (this.game.gameOver()) {
                                clearInterval(this.timer)
                                this.timer = null
                        } else {
                                this.game.forwardNext(this.makeSquareType(), this.makeTypeModel())
                        }
                }
        }

        /**
         * 游戏开始 入口函数
         */
        start () {
                this.doms = {
                        gamediv: document.getElementById('game'),
                        nextdiv: document.getElementById('next'),
                        soredom: document.getElementById('sore'),
                        linedom: document.getElementById('line')
                }
                this.game.init(this.doms, this.makeSquareType(), this.makeTypeModel())
                this.bindKeyEvent()
                this.game.forwardNext(this.makeSquareType(), this.makeTypeModel())
                this.timer = setInterval(() => {
                        this.down()
                }, this.INTERVAL)
        }
 }