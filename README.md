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
  - **1、请确保你已经安装dcoker：**
    安装可参考：https://www.docker.com/
  - **2、安装docker后在项目根目录下：**
    + 一、`docker-compose build`
      - 该命令会根据docker-compose.yml 配置文件分别构建前后端镜像
    + 二、`docker-compose up`
      - 该命令会将构建好的前后端镜像统一启动起来

#### 三、使用构建好的docker
  + 前端镜像地址：https://hub.docker.com/repository/docker/copymanager/compress-media-front
    **使用方式：**
    - `docker pull copymanager/compress-media-front:latest`
    - `docker tag copymanager/compress-media-front:latest my_new_image_name:latest`（my_new_image_name可以按照自己的方式来命名）
    - `docker run -d -p 8080:3000 --name compress-media-sever-front  my_new_image_name:latest`
  + 后端镜像地址：https://hub.docker.com/repository/docker/copymanager/compress-media-backend/general
    - `docker pull copymanager/compress-media-backend:latest`
    - `docker tag copymanager/compress-media-backend:latest my_new_image_name:latest`（my_new_image_name可以按照自己的方式来命名）
    - `docker run -d -p 30005:3005 --name compress-media-server-backend  my_new_image_name:latest`

  