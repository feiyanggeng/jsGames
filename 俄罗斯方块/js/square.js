class Square{
        constructor(){
                /**定义方块 的面板 */
                this.data = [
                        [0, 0, 0, 0],
                        [0, 0, 0, 0],
                        [0, 0, 0, 0],
                        [0, 0, 0, 0]
                ],
                //旋转方向
                this.dir = 0;
                /**定义方块的位置 */
                this.origin = {
                        x: 0,
                        y: 0
                }
        }
        /**
         * 方块下落
         */
        down () {
                this.origin.x = this.origin.x + 1
        }
        /**
         * 方块右移
         */
        right () {
                this.origin.y = this.origin.y + 1
        }
        /**
         * 方块左移
         */
        left () {
                this.origin.y = this.origin.y - 1
        }
        /**
         * 设置选择哪一种方块
         * @param {*} dir 方块样式的索引
         */
        rotate (dir) {
                if (!dir) dir = 1
                this.dir = (this.dir + dir) % 4
                for (let i = 0; i < this.data.length; i++) {
                        for (let j = 0; j<this.data[i].length; j++) {
                                this.data[i][j] = this.rotates[this.dir][i][j]
                        }
                }
        }
}