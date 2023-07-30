## 图片压缩工具
  **支持压缩：png、jpeg、jpg、webp、gif**
  **转换格式：png、jpeg、jpg、webp、gif**

### 使用方式？

#### 一、本地使用
  **use git clone this project**

##### 1、安装
  + 安装前提：`node > 18`，镜像源可切换成淘宝镜像
  + 安装服务端：根目录下 `npm i` 
  + 安装前端： `cd app && npm i`

##### 2、、启动服务端
  + node 
  + `npm run start:dev`
##### 3、、启动前端
  `npm run start`


#### 二、构建成docker
  **1、请确保你已经安装dcoker：**
    安装可参考：https://www.docker.com/
  **2、安装docker后在项目根目录下：**
  + 一、`docker-compose build`
    - 该命令会根据docker-compose.yml 配置文件分别构建前后端镜像
  + 二、`docker-compose up`
    - 该命令会将构建好的前后端镜像统一启动起来