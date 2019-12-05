# Dankal-Comment(评论组件)
## 示例

```html 

 <dankal-comment
        v-for="(item,index) in commentList"
        :key="index"
        :preview-index="index"
        :comment="item"
       />

```

```js
 //comment对象示例,具体对象属性命名可根据实际情况修改该组件
comment: {
        userName: 'ivancai',
        userAvatar: 'https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=3377302992,3361149372&fm=27&gp=0.jpg',
        star: 5,
        commentTime: '2018-12-10 12:00:00',
        content: '很不错',
        images: [
          'http://img.hb.aicdn.com/6af04574cdaa0ad06afc611fabbfde782b281f2e5539e-bkptqh',
          'http://img.hb.aicdn.com/2988863e2ea2579d1899aea4df846229f49f0d4c6bb1a-77e5tR',
          'http://img.hb.aicdn.com/4fec0a55c23b749641f457a2d4400abd9959af5663b6-vkNKEp',
          'http://img.hb.aicdn.com/4fec0a55c23b749641f457a2d4400abd9959af5663b6-vkNKEp',

        ],
      },
```

## Props配置

|  参数 |  说明 |  类型	 |  是否必传	 |  默认值 |
|---|---|---|---|---|
|  comment | 评论  |  Object |  是 |  无 |
| previewIndex | 评论组索引值，用于区分是哪条评论| Number|否 | 0


## 事件

|事件名|说明|参数| 
|---|---|---|
|   |   |   | 
