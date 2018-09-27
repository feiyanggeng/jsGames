class SquareFactory {
        constructor () {}
        /**
         * 创造出某个方块
         * @param {*} index 七种方块中的一种的索引
         * @param {*} dir 该种方块的那种形态
         */
        make (index, dir) {
                let s
                switch(index) {
                        case 1 :
                                s = new Square1()
                                break
                        case 2 :
                                s = new Square2()
                                break
                        case 3 :
                                s = new Square3()
                                break
                        case 4 :
                                s = new Square4()
                                break
                        case 5 :
                                s = new Square5()
                                break
                        case 6 :
                                s = new Square6()
                                break
                        case 7 :
                                s = new Square7()
                                break 
                }
                s.origin.x = 0
                s.origin.y = 3
                s.rotate(dir)
                return s
        }
}