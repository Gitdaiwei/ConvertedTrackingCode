# Dankal-Sku(规格选择)
## 示例

```html 

  <dankal-sku
      v-model="isShowSku"
      :commodity="commodity"/>

```
## Props配置

|  参数 |  说明 |  类型	 |  是否必传	 |  默认值 |
|---|---|---|---|---|
|  v-model | 控制是否显示sku选择器  |  Boolean |  是 |  false |
|  specification |  规格数组 |  Array |  是 |  [] |

```javascript 
//规格数组结构示例
specificationList: [
        {
          name: '100克',
          img_src: 'https://cdn.idalhome.com/FtndNKAgTOrRHBhgrciFSIYaPkzR',
          originPrice: '2.00',
          price: '1.00',
          stock: 5,
          uuid: '0d55672f3a1c2e8b731cba5027956ccc',
        },
        {
          name: '200克',
          img_src: 'https://cdn.idalhome.com/FiRgP7G5wid_s26CIfWUqXYtz9gJ',
          originPrice: '4.00',
          price: '2.00',
          stock: 4,
          uuid: '0d55672f3a1c2e8b731cba5027956ddd',
        },
      ],

```
## 事件

|事件名|说明|参数| 
|---|---|---|
| buy-clicked  | 点击立即购买  | {buyNumber:1,selectedItem:Object}  | 
| add-cart | 点击加入购物车 | {buyNumber:1,selectedItem:Object}