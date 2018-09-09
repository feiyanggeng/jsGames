/* 游戏主控制类 */
var Game = {
        //游戏是否结束
        isOver : false,
        //分数
        score: 0,
        //分数的dom
        scoreDom : null,
        //战场的dom
        battleGround : null,
        //游戏结束的dom
        overDom : null,
        //我军飞机
        ownFly : null,
        //敌军飞机列表
        enemyFly : [],
        //分数检查定时器
        scoreTimer : null,
        //初始化战场
        init : function(){

                let _this = this
                this.battleGround = document.getElementById('battleground')
                this.overDom = document.getElementById('over')
                this.scoreDom = document.getElementById('score')
                this.battleGround.focus() 
                this.startFly()
                let timer = setInterval(function(){
                        _this.startEnemy()
                },1000)
                document.onkeydown = e => {
                        _this.onkeydown(e)
                }
                let scoreTimer = setInterval(()=>{
                        _this.checkScore()
                },10)
               _this.checkOver(timer,scoreTimer)
        },
        //启动自己飞机 
        startFly : function(){
                let _this = this
                this.ownFly = new ownFly()
                //设置飞机位置
                this.ownFly.setPosition(this.battleGround)
        },
        //启动敌军飞机
        startEnemy : function(){
                let index =Math.floor(Math.random()*3)
                let position = Math.ceil(Math.random()*25)*18 
                let enemy = new Enemy()
                enemy.setPosition(this.battleGround,position,index)
                this.enemyFly.push(enemy)
        },
        //鼠标按下的一系列
        onkeydown : function(e){
                let _this = this
                e = e || window.event
                _this.ownFly.move(e.keyCode)
        },
        //判断游戏是否结束
        checkOver : function(timer,scoreTimer){
                let _this = this
                let overTimer = setInterval(()=>{
                        if(_this.enemyFly.length>0 && _this.enemyFly[0].gameOver){
                                _this.ownFly.bullets.forEach(item=>{
                                        clearTimeout(item.timer)
                                }) 
                                _this.enemyFly.forEach((item)=>{
                                        clearTimeout(item.timer)
                                        _this.onkeydown = null
                                        _this.overDom.style.display = 'block'
                                })
                                clearTimeout(timer)
                                clearTimeout(overTimer)
                                clearTimeout(scoreTimer)
                        }
                },300)
        },
        //判断子弹是否击中飞机即得分系统------一架飞机十分
        checkScore : function(){
                let _this = this
                for(let i=0; i<_this.ownFly.bullets.length; i++){
                        let bulletDom = _this.ownFly.bullets[i].dom
                        if(bulletDom.offsetTop <= bulletDom.clientHeight){
                                _this.ownFly.bullets[i] = null
                                _this.ownFly.bullets.splice(i,1)
                        }
                        for(let j=0; j<_this.enemyFly.length; j++){
                                let enemyflyDOm = _this.enemyFly[j].dom
                                let shotTop = bulletDom.offsetTop-enemyflyDOm.offsetTop
                                let shotleft =bulletDom.offsetLeft-enemyflyDOm.offsetLeft-6.5
                                shotleft = shotleft>0 ? Math.floor(shotleft) : Math.ceil(shotleft)
                                let isshot = shotTop<=enemyflyDOm.clientHeight && shotTop>0 && shotleft == 0
                                if( isshot){
                                        _this.score += 10
                                        _this.scoreDom.innerHTML = _this.score
                                        _this.battleGround.removeChild(bulletDom)
                                        clearInterval(_this.enemyFly[j].timer)
                                        clearInterval(_this.ownFly.bullets[i].timer)
                                        enemyflyDOm.style.background = 'url("./img/bingo.png")'
                                        let timer = setTimeout(()=>{
                                                _this.battleGround.removeChild(enemyflyDOm)
                                                _this.enemyFly[j] = null
                                                _this.enemyFly.splice(j,1)
                                                clearTimeout(timer)
                                        },100)
                                        _this.ownFly.bullets[i] = null
                                        _this.ownFly.bullets.splice(i,1)
                                }
                        }
                }
        }

}