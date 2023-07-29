## 图片压缩工具

### 使用方式？

#### 一、本地使用
  **use git clone this project**
##### 1、启动服务端
  `npm run start:dev`
#### 2、启动前端
  `npm run start`


#### 二、构建成docker
  **只需要两部即可使用：**
  + docker-compose build
    - 该命令会根据docker-compose.yml 配置文件分别构建前后端镜像
  + docker-compose up
    - 该命令会将构建好的前后端镜像统一启动起来