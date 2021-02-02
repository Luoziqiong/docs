### 1. 正向代理与反向代理的特点和实例

    代理对客户端可见，是正向代理

    代理对服务端可见，是反向代理

    平时我们用的vpn是正向代理

    nginx代理属于反向代理

### 2. 可手动搭建一个简单的 `nginx` 服务器

    [https://www.jianshu.com/p/d96a561199e6](https://www.jianshu.com/p/d96a561199e6)
    [https://www.cnblogs.com/taiyonghai/p/6728707.html](https://www.cnblogs.com/taiyonghai/p/6728707.html)

### 3. 熟练应用常用的 `nginx` 内置变量，掌握常用的匹配规则写法

    ```
    server {
      listen 80; // 端口
      server_name www.lala.com; // 域名
      root html/lala; // 网站的根目录
      index index.html; // 网站的默认首页
      autoindex on;
      add_header Cache-Control "no-cache, must-revalidate";
      location / { // 请求的url过滤，正则匹配，~为区分大小写，~*为不区分大小写。
        add_header Access-Control-Allow-Origin *; // 设置跨域
        root $doc_root_dir; #静态资源根目录
        proxy_pass http://mysvr1; #请求转向“mysvr1”定义的服务器列表
        #deny 127.0.0.1; #拒绝的ip
        #allow 172.18.5.54; #允许的ip
        expires 30d; #静态资源过时间30天
      }

    }
    ```

    ```
    upstream xxx{};upstream模块是命名一个后端服务器组，组名必须为后端服务器站点域名，内部可以写多台服务器ip和port，还可以设置跳转规则及权重等等

    ip_hash;代表使用ip地址方式分配跳转后端服务器，同一ip请求每次都会访问同一台后端服务器

    server;代表后端服务器地址

    server{};server模块依然是接收外部请求的部分

    server_name;代表外网访问域名

    location / {};同样代表过滤器，用于制定不同请求的不同操作

    proxy_pass;代表后端服务器组名，此组名必须为后端服务器站点域名

    server_name和upstream{}的组名可以不一致，server_name是外网访问接收请求的域名，upstream{}的组名是跳转后端服务器时站点访问的域名
    ```

### 4. 可以用 `nginx` 实现请求过滤、配置 `gzip`、负载均衡等，并能解释其内部原理

    [https://zhuanlan.zhihu.com/p/31202053](https://zhuanlan.zhihu.com/p/31202053)
