# select级联工具

## 静态级联

```
    new Cascade({
        parentNode: '#box1',
        data: [{ // 第一级
            name: '生成的select标签的name',
            data: [{
                text: 'option的text',
                value: 'option的value',
                selected: true // 存在selected为true时该项将被默认选中
            }, ...]
        }, { // 第二级
        
        }, ...],
        model: { // 可选，对应option的字段，即配置中的 data.data中的一项
            val: 'value', 
            text: 'text'
        }
    }).render();
```

## AJAX级联

```
    new Cascade({
        parentNode: '#box3',
        data: [{ // 第一级
            name: '生成的select标签的name',
            data: '一个url'
        }, { // 第二级
            name: '生成的select标签的name',
            data: function(prev) { // 也可以是一个函数
                // 返回值作为请求的url
            }
        }, ...],
        field: 'id', // 请求url带上的参数名，值是select选中的值
        model: {
            val: 'id', // option的value，默认value，这里改为id，对应ajax返回值
            text: 'name' // option的text，默认text，这里改为name，对应ajax返回值
        }
    }).render();
```
