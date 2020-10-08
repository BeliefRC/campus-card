# 校园一卡通管理系统

一个完整的全栈项目，使用react+express+mongodb完成


## 一.项目运行
项目下载后：

启动MongoDB数据库
   ```markdown
 npm i	//安装依赖包
 npm run server	//启动后台服务
npm start	//启动前端项目
```
1. 项目将会启动在本地服务器3000端口
2. 后台服务将会启动在本地服务器3001端口


## 二.使用的工具
1.  使用了`create-react-app` 官方脚手架工具搭建了项目，
2.  使用了`react-router`处理路由
3.  使用`fetch`来获取api的数据
4.  使用`redux`来进行数据处理
5.  使用`express`搭建后端服务，
6. `express-session`和`cookie-parser`来处理session保存登录信息
7. `body-parser`和`connect-multipartyr`来处理前端提交的混合表单
8. `mongoose`来操作数据库


## 三.主要功能
###### 1.公共功能实现
1. 登录与登出
2. 一卡通信息查看与维护
3. 流水账单的查看
4. 校园卡充值和挂失
5. 浏览首页信息
6. 表格下载


###### 2.管理员功能实现
1. 新增和删除一卡通
2. 查看用户列表
3. 重置用户密码
4. 查看公告列表
5. 管理公告信息
6. 文件查看与删除
7. 新增文件
8. 编辑“使用说明”

###### 3.用户功能实现
1. 修改个人密码
2. 消费购物
3. 数据分析与日历


###### 4 .主要截图展示
[![首页](http://wx3.sinaimg.cn/mw690/85eda507gy1fsn4yntz7bj21hc0u07ss.jpg "首页")](http://wx3.sinaimg.cn/mw690/85eda507gy1fsn4yntz7bj21hc0u07ss.jpg "首页")

[![日历数据分析](http://wx2.sinaimg.cn/mw690/85eda507gy1fsn4yls0qjj21hc0u0gnx.jpg "日历数据分析")](http://wx2.sinaimg.cn/mw690/85eda507gy1fsn4yls0qjj21hc0u0gnx.jpg "日历数据分析")

[![表格下载](http://wx2.sinaimg.cn/mw690/85eda507gy1fsn4yon43ej21hc0tzjva.jpg "表格下载")](http://wx2.sinaimg.cn/mw690/85eda507gy1fsn4yon43ej21hc0tzjva.jpg "表格下载")

[![用户列表](http://wx1.sinaimg.cn/mw690/85eda507gy1fsn4yqa3lcj21hc0u0ady.jpg "用户列表")](http://wx1.sinaimg.cn/mw690/85eda507gy1fsn4yqa3lcj21hc0u0ady.jpg "用户列表")

