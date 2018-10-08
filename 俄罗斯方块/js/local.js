/**
 * 创建Local类用于 连接用户的一些操作与game之间的联系
 * 监听整个游戏的状态  开始或结束
 */
class Local {
        constructor(){
                this.INTERVAL = 250
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
        /**
         * 方块自己下落
         */
        move () {
                if (this.game.down()) {
                        this.game.fixed()
                        this.game.forwardNext(this.makeSquareType(), this.makeTypeModel())
                }
        }
        /**
         * 游戏开始 入口函数
         */
        start () {
                this.doms = {
                        gamediv: document.getElementById('game'),
                        nextdiv: document.getElementById('next')
                }
                this.game.init(this.doms, this.makeSquareType(), this.makeTypeModel())
                this.game.forwardNext(this.makeSquareType(), this.makeTypeModel())
                this.timer = setInterval(() => {
                        this.move()
                }, this.INTERVAL)
        }
 }