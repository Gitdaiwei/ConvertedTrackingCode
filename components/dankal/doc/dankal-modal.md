# Dankal-Modal(蒙层组件)
## 示例

```html 

<dankal-modal v-model="isShowModal" 
 :cornerCloseAble="false">
   <template>
      <!--   蒙层内容       -->

    </template> 
</dankal-modal>

```

## Props配置

|  参数 |  说明 |  类型	 |  是否必传	 |  默认值 |
|---|---|---|---|---|
|  value | 控制是否显示  |  Boolean |  是 |  false |
|  cornerCloseAble | 控制是否点击边缘部分会使蒙层消失(默认消失)  |  Boolean |  否 |  true |
|  buttonCloseAble | 控制是否点击关闭按钮会使蒙层消失(默认消失)  |  Boolean |  否 |  false |
|  direction | 控制对话框位置  |  String |  否 |  center |
|  background | 控制对话框背景颜色  |  String |  否 |  #ffffff |
|  borderRadius | 控制对话框边框圆角  |  String |  否 |  0 |

## 事件

|事件名|说明|参数| 
|---|---|---|
|   |   |   | 
