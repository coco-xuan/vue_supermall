//----------------------------Tools--------------------------
; (function (window, undefined) {
    var Tools = {
        getRandom: function (min, max) {
            return Math.floor(Math.random() * (max - min + 1)) + min;


        }
    }

    window.Tools = Tools;


})(window, undefined)

    //----------------------------Food--------------------------




    ; (function (window, undefined) {

        var position = 'absolute';
        // 记录上一次创建的食物 为删除做准备
        var elements = [];



        function Food(options) {
            options = options || {};

            this.x = options.x || 0;
            this.y = options.y || 0;

            this.width = options.width || 20;
            this.height = options.height || 20;
            this.color = options.color || 'green';

        }



        //渲染 render方法 动态产生一个div

        Food.prototype.render = function (map) {
            // 删除原来食物的位置 
            remove();

            // 随机设置 x 和 y 的值
            this.x = Tools.getRandom(0, map.offsetWidth / this.width - 1) * this.width;
            this.y = Tools.getRandom(0, map.offsetHeight / this.height - 1) * this.height;

            var div = document.createElement('div');
            map.appendChild(div);
            elements.push(div);
            // 设置div的样式
            div.style.position = position;
            div.style.left = this.x + 'px';
            div.style.top = this.y + 'px';
            div.style.width = this.width + 'px';
            div.style.height = this.height + 'px';
            // 设置颜色
            div.style.backgroundColor = this.color;
        }

        // 删除食物和elements数组中记录的元素
        function remove() {
            for (var i = elements.length - 1; i >= 0; i--) {
                // 删除div   
                elements[i].parentNode.removeChild(elements[i]);

                //删除数组中的元素
                elements.splice(i, 1);

            }

        }
        // 为 window 添加Food函数，使外部能访到
        window.Food = Food;
    })(window, undefined)

    // 此时 food访问不到局部变量
    // var food = new Food();
    // var map = document.querySelector('#map');
    // food.render(map);
    // 定义的全局变量各个js文件都以访问的到，所以有可能发生命名冲突问题

    // 此时定义一个自调用函数，开启一个新的空间，避免命名冲突


    //---------------------------------Snake-----------------------------
    ; (function (window, undefined) {
        var position = 'absolute';
        var elements = [];
        function Snake(options) {
            options = options || {};
            this.width = options.width || 20;
            this.height = options.height || 20;
            // 蛇移动的方向
            this.direction = options.direction || 'right';
            // 蛇的身体（蛇节） 第一个元素是蛇头
            this.body = [
                { x: 3, y: 2, color: 'red' },
                { x: 2, y: 2, color: 'blue' },
                { x: 1, y: 2, color: 'blue' }
            ];

        }

        Snake.prototype.render = function (map) {

            // 删除蛇节
            remove();
            // 把每一个蛇节 渲染到地图上
            for (var i = 0, len = this.body.length; i < len; i++) {

                var object = this.body[i];
                var div = document.createElement('div');
                map.appendChild(div);
                elements.push(div);
                // 设置样式
                div.style.position = position;
                div.style.width = this.width + 'px';
                div.style.height = this.height + 'px';
                div.style.left = object.x * this.width + 'px';
                div.style.top = object.y * this.height + 'px';
                div.style.backgroundColor = object.color;

            }
        }
        // 私有
        function remove() {
            for (var i = elements.length - 1; i >= 0; i--) {

                elements[i].parentNode.removeChild(elements[i]);
                elements.splice(i, 1);
            }

        }


        Snake.prototype.move = function (food, map) {
            // 控制蛇节的移动
            for (var i = this.body.length - 1; i > 0; i--) {
                this.body[i].x = this.body[i - 1].x;
                this.body[i].y = this.body[i - 1].y;


            }
            // 控制蛇头移动
            var head = this.body[0];
            switch (this.direction) {
                case 'right':
                    head.x += 1;
                    break;
                case 'left':
                    head.x -= 1;
                    break;
                case 'top':
                    head.y -= 1;
                    break;
                case 'bottom':
                    head.y += 1;
                    break;

            }

            // 2.4 判断蛇头是否和食物的坐标重合
            var headX = head.x * this.width;
            var headY = head.y * this.height;
            if (headX === food.x && headY === food.y) {
                // 让蛇增加一节
                // 获取蛇的最后一节
                var last = this.body[this.body.length - 1];
                this.body.push({
                    x: last.x,
                    y: last.y,
                    color: last.color
                });


                // 再次随机生成食物
                food.render(map);
            }



        }



        // 暴露构造函数给外部
        window.Snake = Snake;
    })(window, undefined)

    // var map = document.getElementById('map')
    // var snake = new Snake();
    // snake.render(map);


    //--------------------------------------Game--------------------------------------

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

    //-----------------------------调用-------------------------------
    ; (function (window, undefined) {
        var map = document.getElementById('map');
        var game = new Game(map);
        game.start();

    })(window, undefined)
