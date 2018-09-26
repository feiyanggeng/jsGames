class Square{
        constructor(){
                /**定义方块 的面板 */
                this.data = [
                        [0, 0, 0, 0],
                        [0, 0, 0, 0],
                        [0, 0, 0, 0],
                        [0, 0, 0, 0]
                ],
                /**定义方块的位置 */
                this.origin = {
                        x: 0,
                        y: 0
                }
        }
        /**
         * 将工程里产生的方块赋值到data面板中
         * @param {*} dir 方块样式的索引
         */
        rotate (dir) {}
}