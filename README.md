# dankal-mobile-template

## 1.介绍
该项目为目前移动端开发模板,基于nuxt.js(SPA模式)

## 2.项目架构目录说明

```cmd

├─assets 
│  ├─images   #存放图片资源
│  ├─jslibs   #存放个人或第三方类库资源
│  └─styles   #存放样式文件
├─api          #网络层
├─components  #存放可复用的组件
├─configs     #存放全局的配置文件
├─filters     #全局过滤器
├─layouts     #nuxt.js定义默认模板及错误页的文件夹 
├─pages       #存放Vue页面
│  └─sample   #存放常用模版组件、页面
├─plugins     #存放拓展插件文件夹
├─server      #服务端相关代码
│  └─middleware #中间件
├─static        #不需要参与打包的资源文件夹
└─store         #Vuex相关


```

## 3.集成第三方ui框架

* cude-ui(对于基本的常用组件，如toast、dialog等请使用cube-ui内置)

## n.项目路由

| 页面名称 | 对应路由文件 | 参数 | 备注 | tab页 | 静态完成度 | 渲染完成度 |
| -------- | ------------ | ---- | :---- | :----: | :----: | :----: |
| 首页 | index |  |  |  | 是 | 是 |   
| 条款1 | home/privacy-policy |  |  |  | 是 |  
| 条款2 | home/term-of-use |  |  |  | 是 |  
| 产品详情 | home/product |  | 商品图片样式 |  |  是  | 是  |  
| 选择登录 | login/index |  |  |  |  是 |   是 |  
| 邮箱登录 | login/email-login |  |  |  |  是 |  是 |  
| 邮箱邮箱验证 | login/email-verify | type=register/pass | 注册/忘记密码 |  |  是 |  是 |  
| 邮箱设置密码 | login/email-password | type=register/pass | 注册/忘记密码 |  |  是 |   是 |
| 邮箱登录协议 | login/email-agreement |  |  |  | 是 |  
| 个人中心 | user/index |  | |  |  是 |   是 |
| 个人信息 | user/info |  |  |  |   是 |  是 |  
| 砍价订单 | user/bargain/index  |  | 缺取消砍价订单，支付砍价订单 |  | 是  |   是 |  
| 砍价详情 | user/bargain/detail  |  | 缺取消砍价订单，支付砍价订单 |  | 是  |   是 | 
| 砍价分享 | user/bargain/share  |  |  |  | 是  | 是  | 
| 好友砍价列表 | user/help-bargain |  |  |  | 是  | 是  |    
| 我的订单 | user/order/index |  |  |  | 是  | 是  |   
| 订单详情 | user/order/detail |  | 缺取消砍价订单，支付砍价订单 |  | 是  |  是 | 
| 订单售后 | user/order/refund |  |  |  |  是 | 是  |
| 确认订单 | user/order/confirm |  |  |  | 是  | 是 |
| 支付成功 | user/order/succeed |  |  |  | 是  | 是  |
| 地址列表 | user/addr/index |  |  |  | 是 | 是 | 
| 编辑地址 | user/addr/edit |  |  |  | 是  | 是 |  
| 关于我们 | user/addr/about |  |  |  | 是  | 是  |  
| 我的钱包 | user/wallet/index |  |  |  |  是 | 是  |   
| 钱包提现 | user/wallet/withdraw |  |  |  | 是  | 是  | 
| 消息中心 | user/message/index  |  |  |  |  是  | 是  |   
| 消息详情 | user/message/detail  |  |  |  |  是  | 是  |   

