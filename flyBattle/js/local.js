var local = function(){
        let start = document.getElementById('startBtn')
        start.addEventListener('click',event=>{
               start.style.display = 'none'
               Game.init()
        })
}()