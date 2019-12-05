# Dankal-Image-Upload(图片上传)
## 示例

```html 

<dankal-image-uploadv v-model="imgLit" domain="https://cdn.dankal.cn/"
:token="uploadToken">


</dankal-image-upload>

```

## Props配置

|  参数 |  说明 |  类型	 |  是否必传	 |  默认值 |
|---|---|---|---|---|
|  value | 展示的图片数组  |  Array |  是 |  无 |
|  limit | 最多上传的图片张数(默认消失)  |  Number |  否 |  3 |
| domain| cdn域名,需要以“/”结尾| String| 是| 无
| token| 上传到七牛的用户凭证| String| 是| 无
| quatity | 上传的图片质量系数（0-1.0）| Number|否 | 0.6

## 事件

|事件名|说明|参数| 
|---|---|---|
|   |   |   | 
