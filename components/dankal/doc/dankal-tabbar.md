# Dankal-TabBar(底部选项卡)
## 示例

```html 

<dankal-tab-bar
      class="tab-bar"
      :options="tabBarData"
      background-color="#0d1323"
      color="#ffffff"
      select-color="#dfc07e"
    />

```
``` javascript 

tabBarData: [
        {
          router: '/', // 路由
          text: '首页', // tab名
          iconPath: require('~/assets/images/tab-bar/home.png'),
          selectedIconPath: require('~/assets/images/tab-bar/home-active.png'),
        },
        {
          router: '/store',
          text: '商品',
        },
        {
          router: '/shop',
          text: '购物车',
        },
        {
          router: '/user',
          text: '我的',
        },
      ],
``` 

## Props配置

|  参数 |  说明 |  类型	 |  是否必传	 |  默认值 |
|---|---|---|---|---|
|  options | 选项卡数组  |  Array |  是 |  无 |
|  backgroundColor | 背景颜色  |  String |  否 |  #000000 |
| color|字体颜色 |String | 否| #ffffff
| selectColor| 选中时字体颜色| String|  否 | #ffffff

## 事件

|事件名|说明|参数| 
|---|---|---|
|   |   |   | 
