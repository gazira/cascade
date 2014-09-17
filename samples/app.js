var $ = require('component/jquery@1.0.0');
var Cascade = require('../index');

var data = require('./data');

$(function () {
    // 静态数据
    new Cascade({
        parentNode: '#box1',
        data: data
    }).render();

    //----------------------------------------

    // 自定义模板
    var P = Cascade.extend({
        view: function () {
            var arr = this._view(); // select列表
            var html = ['<span>省</span>' + arr[0], '<span>市</span>' + arr[1], '<span>县</span>' + arr[2]];
            this.element.html(html.join(''));
            this.build();
            return this;
        }
    });
    new P({
        parentNode: '#box2',
        data: data
    }).render();

    //----------------------------------------

    // ajax，自定义字段
    var xdata = [
        {name: 'province', data: './data.php?type=province'},
        {name: 'city', data: './data.php?type=city'},
        {name: 'county', data: function (prev) {
            console.log(prev.val());
            return './data.php?type=county';
        }}
    ];
    new Cascade({
        parentNode: '#box3',
        data: xdata,
        field: 'id', // 附加参数 id=select选中的值
        model: {
            val: 'id',
            text: 'name'
        }
    }).render();

    //----------------------------------------

    // ajax，自定义模板，字段
    new P({
        parentNode: '#box4',
        data: xdata,
        field: 'id',
        model: {
            val: 'id',
            text: 'name'
        }
    }).render();

    //----------------------------------------

    // ajax，自定义模板，字段
    new Cascade({
        parentNode: '#box5',
        data: xdata,
        extData: function (select, data, index) { // 附加发送参数
            return {
                ext: '前一个select的值' + select.val()
            };
        },
        field: 'id',
        resultField: function (data, index) { // ajax结果处理
            data.data[data.data.length - 1].selected = true;
            return data.data;
        },
        model: {
            val: 'id',
            text: 'name'
        }
    }).render();
});
