# Dankal-Slider(滑动组件)
> 由于 Slider 组件为复合组件，由 dankal-slider-group 和 dankal-slider 组成，dankal-slider-group 组件作为 dankal-slider 组件的状态承载点，借由其实现兄弟组件之间的通讯和管理。用于解决某一兄弟组件打开之后，触发对应已打开的兄弟组件关闭。注意，dankal-slider 组件是可以单独使用的，dankal-slider-group 组件无法单独使用，该组件仅作为状态管理组件
# 示例
```html 

 <dankal-slider-group>
  <dankal-slider v-for="(item, i) in carts" :key="i">
    <template slot="content" slot-scope="scope">
      <div class="cart-item">
        <img
          src="@/assets/images/ic_unselected.png"
          alt=""
          @click="handlerSelected(i)"
        />
        <div class="cart-item_commodity">
          <img src="@/assets/images/sign_icon_gift_light.png" alt="" />
          <div class="cart-item_commodity_detail">
            <div class="cart-item_commodity_detail_title">
              <p>{{ item.name }}</p>
              <p>{{ item.spec }}</p>
            </div>
            <div class="cart-item_commodity_detail_price">
              <span>￥{{ item.price }}</span>
              <dankal-stepper v-model="item.number" :max="10" />
            </div>
          </div>
        </div>
      </div>
    </template>
    <template slot="actions" slot-scope="scope">
      <div class="cart-item_action">
        <span @click="handlerDeleted(i)">删除</span>
      </div>
    </template>
  </dankal-slider>
</dankal-slider-group>

```
# Props配置

|  参数 |  说明 |  类型	 |  是否必传	 |  默认值 |
|---|---|---|---|---|
|  direction | 侧滑方向  |  String |     否 |  left |


# 事件

|事件名|说明|参数| 
|---|---|---|
|   |   |   | 

# Slot 插槽

| 插槽名称 | 说明                                                 |
| :------- | :--------------------------------------------------- |
| content  | 显示的部分，通过此部分可以控制是否打开侧滑隐藏的部分 |
| actions  | 隐藏的部分，用于渲染相关的附加操作                   |