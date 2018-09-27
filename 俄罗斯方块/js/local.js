/**
 * 创建Local类用于 连接用户的一些操作与game之间的联系
 * 监听整个游戏的状态  开始或结束
 */
class Local {
        constructor(){
                this.game = new Game()          //实例化game对象
                this.doms = {}                  //保存交互要用到的dom
        }
        makeSquareType () {
                return Math.ceil(Math.random()*7)
        }
        makeTypeModel () {
                return Math.floor(Math.random()*4)
        }
        start(){
                this.doms.gamediv = document.getElementById('game')
                this.doms.nextdiv = document.getElementById('next')
                this.game.init(this.doms, this.makeSquareType(), this.makeTypeModel())
                this.game.forwardNext(this.makeSquareType(), this.makeTypeModel())
        }
 }