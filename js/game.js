; (function (window, undefined) {
    var that;
    function Game(map) {
        this.food = new Food();
        this.snake = new Snake();
        this.map = map;
        that = this;
    }

    Game.prototype.start = function () {
        // 1. 把蛇和食物对象， 渲染到地图上来
        this.food.render(this.map);
        this.snake.render(this.map);
        // this.snake.move();
        // this.snake.render(this.map);
        // 2. 游戏开始逻辑
        // 2.1 让蛇移动起来
        runSnake();
        // 2.2 蛇遇到边界游戏结束
        bindKey();
        // 2.3 通过键盘控制蛇移动的方向


    }
    // 私有函数   

    //  2.3 通过键盘控制蛇移动的方向
    function bindKey() {
        document.addEventListener('keydown', function (e) {

            // console.log(e.keyCode);
            // 37-left 38-top 39-right 40-bottom 
            switch (e.keyCode) {
                case 37:
                    this.snake.direction = 'left';
                    break;
                case 38:
                    this.snake.direction = 'top';
                    break;
                case 39:
                    this.snake.direction = 'right';
                    break;
                case 40:
                    this.snake.direction = 'bottom';
                    break;
            }



        }.bind(that), false)

    }

    // 2.1 让蛇移动起来
    function runSnake() {
        var timerId = setInterval(function () {
            this.snake.move(this.food, this.map);
            // render 渲染到 map 地图上
            this.snake.render(this.map);
            // 2.2 蛇遇到边界游戏结束
            // 获取蛇头坐标 
            var maxX = this.map.offsetWidth / this.snake.width;
            var maxY = this.map.offsetHeight / this.snake.height;
            var headX = this.snake.body[0].x;
            var headY = this.snake.body[0].y;
            if (headX < 0 || headX >= maxX) {
                alert('滚');
                clearInterval(timerId);

            }
            if (headY < 0 || headY >= maxY) {
                alert('滚');
                clearInterval(timerId);

            }

        }.bind(that), 150)



    }




    window.Game = Game;


})(window, undefined)
