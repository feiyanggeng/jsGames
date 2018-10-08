/**
 * 创建游戏类用于 保存游戏的各种操作
 */

class Game {
        constructor() {
                this.game = "",
                this.gameDoms           //游戏页面的dom元素
                this.curType            //当前方块的类型
                this.curModel           //当前方块的模型
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
                              if (this.check(this.cur.origin, i, j)) {  
                                      this.gameData[this.cur.origin.x + i][this.cur.origin.y + j] = this.cur.data[i][j]
                              }
                      }
                }
        }
        /**
         * 清除数组中原来为 2 的值
         */
        clearData () {
                for (let i = 0; i< this.cur.data.length; i++) {
                        for (let j = 0; j < this.cur.data[i].length; j++) {
                                if (this.check(this.cur.origin, i, j)) {
                                        this.gameData[this.cur.origin.x + i][this.cur.origin.y + j] = 0
                                }
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
         * 检验将要赋值的点游戏面板的相应位置是否可以进行赋值操作
         * @param {*} pos 要赋值的点
         * @param {*} i   游戏面板的x
         * @param {*} j  游戏面板的y
         */
        check (pos, i, j) {
                if (pos.x + i < 0) {
                        return false
                } else if (pos.x + i >= this.gameData.length) {
                        return false
                } else if (pos.y + j < 0) {
                        return false
                } else if (pos.y + j >= this.gameData[0].length) {
                        return false
                } else if (this.gameData[pos.x + i][pos.y + j] === 1) {
                        return false
                } else {
                        return true
                }
        }
        /**
         * 检验非0 data的下一个点pos是否合法
         * @param {*} pos 
         * @param {*} data 
         */
        isValid (pos, data) {
                for (let i = 0; i < data.length; i++) {
                        for (let j = 0; j < data[0].length; j++) {
                                if (data[i][j] != 0) {
                                        if (!this.check(pos, i, j)) {
                                                return false
                                        }
                                }
                        }
                }
                return true
        }
        /**
         * 方块旋转
         */
        rotate () {
                let dir = (this.cur.dir + 1) % 4
                let test = [
                        [0, 0, 0, 0],
                        [0, 0, 0, 0],
                        [0, 0, 0, 0],
                        [0, 0, 0, 0]
                ]
                for (let i = 0; i < this.cur.rotates[dir].length; i++) {
                        for (let j = 0; j < this.cur.rotates[dir][i].length; j++) {
                                test[i][j] = this.cur.rotates[dir][i][j]
                        }
                }
                if(this.isValid(this.cur.origin, test)) {
                        this.clearData()
                        this.cur.rotate()
                        this.setData()
                        this.refreshDivs(this.gamedivs, this.gameData)
                }
        } 
        /**
         * 方块下落
         */
        down () {
                let test = {...this.cur.origin}               //存储当前点的下面一个点的位置信息
                test.x += 1
                if(this.isValid(test, this.cur.data)) {
                        this.clearData()
                        this.cur.down()
                        this.setData()
                        this.refreshDivs(this.gamedivs, this.gameData)
                        return false
                } else {
                        return true
                }
        }
        /**
         * 方块右移
         */
        right () {
                let test = {...this.cur.origin}         //存储当前点的右边一个点的位置信息
                test.y += 1
                if(this.isValid(test, this.cur.data)) {
                        this.clearData()
                        this.cur.right()
                        this.setData()
                        this.refreshDivs(this.gamedivs, this.gameData)
                }
        }
        /**
         * 方块左移
         */
        left () {
                let test = {...this.cur.origin}         //存储当前点的左边一个点的位置信息
                test.y -= 1
                if(this.isValid(test, this.cur.data)) {
                        this.clearData()
                        this.cur.left()
                        this.setData()
                        this.refreshDivs(this.gamedivs, this.gameData)
                }
        }
        /**
         * 固定方块
         */
        fixed () {
                for (let i = 0; i< this.cur.data.length; i++) {
                        for (let j = 0; j < this.cur.data[i].length; j++) {
                                if (this.check(this.cur.origin, i, j)) {
                                        if (this.cur.data[i][j] === 2) {
                                                this.gameData[this.cur.origin.x + i][this.cur.origin.y + j] = 1
                                        }
                                }
                        }
                  }
        }
        /**
         * 清除行
         */
        clearLine () {
                let line = 0
                for (let i = 0; i < this.gameData.length; i++) {
                        let istrue = true
                        for (let j = 0; j < this.gameData[i].length; j++) {
                                if (this.gameData[i][j] != 1) {
                                        istrue = false
                                }
                        }
                        if (istrue) {
                                for (let m = i; m > 0; m--) {
                                        for (let k = 0; k < this.gameData[i].length; k++) {
                                                this.gameData[m][k] = this.gameData[m-1][k]     
                                        }
                                }
                               i--
                               line++
                        }
                }
                return line
        }
        /**
         * 设置分数
         * @param {*} line 消的行数 
         */
        setSore (line) {
                let sore = parseInt(this.gameDoms.soredom.innerHTML)
                let linenum = parseInt(this.gameDoms.linedom.innerHTML)
                let goal = 0
                switch (line) {
                        case 1 : 
                                goal = 5
                                break
                        case 2 :
                                goal = 15
                                break
                        case 3 : 
                                goal = 50
                                break
                        case 4 : 
                                goal = 100
                                break
                        default:
                                break
                }
                sore += goal
                linenum += line
                this.gameDoms.soredom.innerHTML = sore
                this.gameDoms.linedom.innerHTML = linenum
        }
        /**
         * 游戏结束
         */
        gameOver () {
                let over = false
                for (let i = 0; i < this.gameData[0].length; i++) {
                        if (this.gameData[0][i] == 1) {
                                over = true
                        }
                }
                return over
        }
        /**
         * 初始化游戏界面
         * @param doms dom对象的集合
         * @param squareType 方块的类型
         * @param typeModel  方块四种模式中的一种
         */
        init(doms, squareType, typeModel) {
                this.gameDoms = doms
                this.factory = new SquareFactory()
                this.next = this.factory.make(squareType, typeModel)
                this.initDiv(doms.gamediv, this.gameData, this.gamedivs)
                this.initDiv(doms.nextdiv, this.next.data, this.nextdivs)
                this.refreshDivs(this.nextdivs,this.next.data)
        }
}