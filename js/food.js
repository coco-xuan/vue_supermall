


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

