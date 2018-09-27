/**
 * 创建游戏类用于 保存游戏的各种操作
 */

class Game {
        constructor() {
                this.game = "",
                this.factory;           //方块工厂
                this.next;               //下一个方块的对象
                this.cur;               //当前方块的对象
                this.nextdivs = [];     //保存下一个模块中每一个 div的dom对象  用于以后对dom的操作
                this.gamedivs = [];     //游戏主模块的div对象
                //初始化定义  游戏版面的数组  是10*20的矩阵
                this.gameData = [
                        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
                ]
        }
        /**
         * 初始化dom
         * @param dom  需要绘制的dom根节点
         * @param data  绘制所依据的数据
         * @param divs  保存子元素对象的数组
         */
        initDiv (dom, data, divs) {
                for (let i = 0; i < data.length; i++) {
                        let div = []
                        for (let j = 0; j < data[i].length; j++) {
                                let newNode = document.createElement("div");
                                newNode.className = "none";
                                newNode.style.top = (i * 20) + "px";
                                newNode.style.left = (j * 20) + "px";
                                dom.appendChild(newNode);
                                div.push(newNode)
                        }
                        divs.push(div)
                }                                                                          
        }
        /**
         * 将nextData中的值赋值给gamedata中
         */
        setData () {
                for (let i = 0; i< this.cur.data.length; i++) {
                      for (let j = 0; j < this.cur.data[i].length; j++) {
                        this.gameData[this.cur.origin.x + i][this.cur.origin.y + j] = this.cur.data[i][j]
                      }
                }
        }
        /**
         * 将下一个方块赋值给当前的方块，并重新生成一个新的方块
         * @param {*} squareType 方块类型
         * @param {*} typeModel 方块的模式
         */
        forwardNext (squareType, typeModel) {
                this.cur = this.next
                this.setData()
                this.next = this.factory.make(squareType, typeModel)
                this.refreshDivs(this.gamedivs, this.gameData)
                this.refreshDivs(this.nextdivs, this.next.data)
        }
        /**
         * 刷新dom样式,根据dom数据对应的数据改变dom的样式 
         * @param divs 需要进行改变的dom数组 
         * @param data 与dom数组对应的数据 
         */
        refreshDivs (divs,data) {
                for (let i = 0; i < data.length; i++) {
                        for (let j = 0; j < data[i].length; j++) {
                                if(data[i][j] == 0){
                                        divs[i][j].className = "none";
                                }else if(data[i][j] == 1){
                                        divs[i][j].className = "done";
                                }else if(data[i][j] == 2){
                                        divs[i][j].className = "current";
                                }
                        }
                }
        }
        /**
         * 初始化游戏界面
         * @param doms dom对象的集合
         * @param squareType 方块的类型
         * @param typeModel  方块四种模式中的一种
         */
        init(doms, squareType, typeModel) {
                this.factory = new SquareFactory()
                this.next = this.factory.make(squareType, typeModel)
                this.initDiv(doms.gamediv, this.gameData, this.gamedivs)
                this.initDiv(doms.nextdiv, this.next.data, this.nextdivs)
                this.refreshDivs(this.nextdivs,this.next.data)
        }
}