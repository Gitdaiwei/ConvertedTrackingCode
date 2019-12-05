# Dankal-Stepper(步进器)
## 示例

```html 

    <dankal-stepper
                v-model="buyNumber"
                :max="max"
              />

```
## Props配置

|  参数 |  说明 |  类型	 |  是否必传	 |  默认值 |
|---|---|---|---|---|
|  v-model |  步进器数量 |  Number |  是 |  无 |
| max | 最大数值 |Number |否 | 99 
| min | 最小数值| Number| 否| 1
## 事件

|事件名|说明|参数| 
|---|---|---|
| plus  |  点击增加时事件 | 无  | 
| minus  |  点击减少时事件 | 无  | 

